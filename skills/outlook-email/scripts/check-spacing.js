/* Evaluate in the message's browser frame. Does not edit or log the DOM.
 * region: an Element, or a Range selecting whole siblings in one Element.
 * blocks: expected paragraphs; \n separates intentional lines inside a block.
 * Results use zero-based block indices and CSS pixels, never message text.
 */
function checkOutlookSpacing(region, blocks) {
  const tolerance = 1;
  const fail = (reason, detail = {}) => { throw { spacingFailure: true, reason, ...detail }; };
  const near = (a, b) => Math.abs(a - b) <= tolerance;
  const round = n => Math.round(n * 100) / 100;
  const normalize = text => text.replace(/\r\n?/g, "\n").replace(/\u00a0/g, " ");
  try {
    if (!Array.isArray(blocks) || !blocks.length || blocks.some(block =>
      typeof block !== "string" || block.split("\n").some(line => !line.trim()))) {
      fail("invalid-expected-blocks");
    }
    let roots;
    if (region?.nodeType === 1) {
      roots = [region];
    } else if (region?.startContainer?.nodeType === 1 &&
               region.startContainer === region.endContainer && !region.collapsed) {
      roots = Array.from(region.startContainer.childNodes)
        .slice(region.startOffset, region.endOffset);
    } else {
      fail("unsupported-region");
    }
    const doc = roots[0]?.ownerDocument;
    const view = doc?.defaultView;
    if (!view || !roots.length) fail("unmeasurable-region");
    const styles = new Map();
    function style(element) {
      if (!styles.has(element)) {
        if (!element.isConnected) fail("detached-content");
        const css = view.getComputedStyle(element);
        if (css.display === "none" || css.visibility !== "visible" ||
            Number(css.opacity) === 0 || css.contentVisibility === "hidden") fail("hidden-content");
        if (css.transform !== "none" || css.writingMode !== "horizontal-tb") {
          fail("unsupported-layout");
        }
        styles.set(element, css);
        if (element.parentElement) style(element.parentElement);
      }
      return styles.get(element);
    }
    function flow(element) {
      const css = style(element);
      if (css.position === "absolute" || css.position === "fixed" || css.float !== "none") fail("unsupported-layout");
      for (const pseudo of ["::before", "::after"]) {
        const content = view.getComputedStyle(element, pseudo).content;
        if (content && !["none", "normal", '""'].includes(content)) fail("generated-content");
      }
      return css;
    }
    const leaves = [];
    function collect(node) {
      if (node.nodeType === 3) {
        if (node.textContent.trim()) fail("mixed-block-and-text-content");
        return;
      }
      if (node.nodeType === 8) return;
      if (node.nodeType !== 1) fail("unsupported-node");
      const css = flow(node);
      if (!["DIV", "P", "SECTION", "ARTICLE"].includes(node.tagName) || css.display !== "block") {
        fail("unsupported-block");
      }
      const children = Array.from(node.children);
      if (children.some(child => style(child).display === "block")) {
        Array.from(node.childNodes).forEach(collect);
      } else {
        leaves.push(node);
      }
    }
    roots.forEach(collect);
    const expected = blocks.flatMap((text, block) => normalize(text).split("\n").map(line => ({ line, block })));
    const measurements = [];
    let cursor = 0;
    let previous;
    let blankCount = 0;
    let visualLines = 0;
    for (const leaf of leaves) {
      const css = style(leaf);
      const box = leaf.getBoundingClientRect();
      if (!(box.width > 0 && box.height > 0)) fail("unmeasurable-block", { block: expected[cursor]?.block });
      if (["paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth"]
        .some(key => parseFloat(css[key]) !== 0)) fail("unsupported-block-insets");
      const textNodes = [];
      function inline(node) {
        if (node.nodeType === 3) { textNodes.push(node); return; }
        if (node.nodeType === 8) return;
        if (node.nodeType !== 1) fail("unsupported-inline-node");
        const childCss = flow(node);
        if (!["SPAN", "A", "B", "STRONG", "I", "EM", "U", "S", "FONT", "BR"].includes(node.tagName) ||
            childCss.display !== "inline" || childCss.fontSize !== css.fontSize ||
            childCss.fontFamily !== css.fontFamily || childCss.lineHeight !== css.lineHeight ||
            childCss.verticalAlign !== "baseline") fail("unsupported-inline-layout");
        Array.from(node.childNodes).forEach(inline);
      }
      Array.from(leaf.childNodes).forEach(inline);
      // innerText preserves intentional breaks but does not insert wrap breaks.
      // One terminal BR is the native editor's line placeholder.
      const text = normalize(leaf.innerText).replace(/\n$/, "");
      if (!text.trim()) {
        if (!previous) fail("leading-blank-line");
        blankCount++;
        continue;
      }
      const lines = text.split("\n");
      const block = expected[cursor]?.block;
      for (const line of lines) {
        if (!line.trim()) fail("unsupported-internal-blank-line", { block });
        if (!expected[cursor] || expected[cursor].line !== line) fail("text-mismatch", { block: expected[cursor]?.block ?? blocks.length });
        // Multiple BR-separated lines in one native block must stay grouped.
        if (expected[cursor].block !== block) fail("paragraph-gap", { block: expected[cursor].block, actual: 0 });
        cursor++;
      }
      const rects = [];
      for (const node of textNodes) {
        const range = doc.createRange();
        range.selectNodeContents(node);
        rects.push(...Array.from(range.getClientRects()).filter(rect => rect.width > 0 && rect.height > 0));
      }
      rects.sort((a, b) => a.top - b.top || a.left - b.left);
      const rows = [];
      for (const rect of rects) {
        const row = rows.at(-1);
        if (!row || !near(rect.top, row.top)) rows.push({ top: rect.top, bottom: rect.bottom });
        else row.bottom = Math.max(row.bottom, rect.bottom);
      }
      if (!rows.length) fail("unmeasurable-text", { block });
      // A native block with no insets supplies a measured line box even when
      // computed line-height is "normal". Wrapped lines independently check it.
      const lineHeight = css.lineHeight === "normal"
        ? box.height / rows.length : parseFloat(css.lineHeight);
      if (!Number.isFinite(lineHeight) || lineHeight <= 0 ||
          !near(box.height, rows.length * lineHeight)) fail("unmeasurable-line-height", { block });
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].bottom - rows[i].top > lineHeight + tolerance ||
            rows[i].top < box.top - tolerance || rows[i].bottom > box.bottom + tolerance) {
          fail("text-overflow", { block });
        }
        if (i && !near(rows[i].top - rows[i - 1].top, lineHeight)) {
          fail("internal-line-gap", { block, actual: round(rows[i].top - rows[i - 1].top), expected: round(lineHeight) });
        }
      }
      if (previous) {
        if (!near(previous.lineHeight, lineHeight)) fail("mixed-line-heights", { block });
        const gap = box.top - previous.bottom;
        const expectedGap = block === previous.block ? 0 : lineHeight;
        const measurement = { block, actual: round(gap), expected: round(expectedGap), lineHeight: round(lineHeight) };
        measurements.push(measurement);
        if (!near(gap, expectedGap)) fail("paragraph-gap", measurement);
        if (blankCount > (expectedGap ? 1 : 0)) fail("extra-blank-blocks", { block });
      }
      previous = { block, bottom: box.bottom, lineHeight };
      blankCount = 0;
      visualLines += rows.length;
    }
    if (cursor !== expected.length) fail("missing-text", { block: expected[cursor].block });
    if (blankCount) fail("trailing-blank-line");
    return { ok: true, blocks: blocks.length, visualLines, measurements };
  } catch (error) {
    if (error.spacingFailure) {
      const { spacingFailure, ...result } = error;
      return { ok: false, ...result };
    }
    return { ok: false, reason: "dom-inspection-failed" };
  }
}
