---
name: outlook-email
description: Compose, repair paragraph spacing, and send user-authorized emails in Outlook on the web while preserving the saved signature and verifying rendered spacing through the DOM.
---

# Outlook Email

Use native text entry in Outlook's rich-text editor, then measure the result.
Plain text previews and the presence of all expected words do not establish
correct paragraph spacing. Do not use screenshots or visual models for this
workflow.

## Resolve the message and boundaries

- Use connected email tools to read the relevant thread when available. Use the
  authenticated web editor when composing with its saved signature and layout.
  Do not assume an API or plain-text sending tool applies that signature.
- Resolve recipients, subject, requested content, attachments, and whether the
  user authorized drafting or sending. Existing authorization is sufficient;
  this skill neither grants send permission nor requires redundant confirmation.
- Identify the newly authored region, its separator, the existing signature,
  and the quoted thread in the current editor. Keep the signature's text, link
  destinations, image identity, and the quoted content in memory for comparison.
  Discover these from the active account; no particular name, title, logo, or
  signature is required when the account/task has none.
- If those boundaries are ambiguous, stop the edit and report the problem.
  Never replace the whole editor body to work around uncertain boundaries.

## Writing style

Write newly drafted subjects and body text in plain, natural business language.
Avoid semicolons, em dashes, decorative Unicode punctuation, repeated ellipses,
and stacked exclamation marks. Prefer short sentences with periods and commas.
Avoid hyphens in newly authored prose unless essential for meaning or accuracy.
Rephrase compound terms or the sentence to avoid them where possible, rather
than simply deleting a required hyphen. Never substitute a hyphen for a dash.
Avoid canned openings, inflated language, and formulaic transitions.

Apply this guidance to newly authored prose. Preserve text the user requires
verbatim, technical syntax, URLs, saved signatures, and quoted thread content.

## Compose with native text entry

Represent each paragraph as a string. Join paragraphs with `\n\n`; a single
`\n` inside a paragraph means an intentional grouped line, not a visual wrap.
For example:

```js
const blocks = [
  "Hello,",
  "Please review the draft.",
  "1. Add your comments.\nInclude any questions.",
  "2. Confirm the next step.",
  "Thank you,"
];
const text = blocks.join("\n\n");
```

Select only the authored region and enter that text using the browser's native
text-entry capability. Browser-supported `insertText` into the selected editor
range is also suitable; verify it actually succeeded. Do not substitute raw
`innerHTML`, unstyled HTML `<p>` insertion, or whole-editor filling. Outlook can
render unstyled paragraphs with zero margins, collapsing their visible gaps.

Use one blank rendered line between paragraphs, including greeting and closing.
Use contiguous lines within a grouped block. For simple lists, use text markers
with one blank line between items and single breaks for continuations. Preserve
the user's wording; automatic line wrapping is not an authored line break.

At the signature boundary, count existing empty native lines before adding a
separator. Avoid accumulating a new blank line on top of one already present.
Change only the authored text and its separator; retain the signature subtree
and quoted thread. Keep account content in the active session, out of skill
files, fixtures, and diagnostic logs.

## Verify the draft

Use [scripts/check-spacing.js](scripts/check-spacing.js) in the message's actual
browser frame. Evaluate its source with the available browser tool, then call
`checkOutlookSpacing(region, blocks)` there. Resolve the region from the current
DOM; do not bake mailbox selectors, browser endpoints, or IDs into the skill.

The region is either:

- An `Element` containing only the authored blocks, excluding the signature,
  quoted thread, and the separator before the signature.
- A DOM `Range` selecting whole sibling nodes within one parent. For example,
  use `setStart(parent, firstIndex)` and `setEnd(parent, endIndex)` with indices
  resolved from the current message. It does not support partial text ranges.

The checker reads native `div`/`p` blocks and simple inline text or `br` markup.
It compares logical lines and measures actual line boxes and paragraph gaps,
including wrapped text. A measured native block supplies the local line height
when CSS says `normal`; a one-pixel tolerance allows rounding. The checker does
not modify the DOM. It returns `ok`, zero-based block indices, and numeric CSS
pixel measurements or a failure reason, without returning message text.

Keep its supported boundary explicit: mixed direct text and block children,
partial ranges, mixed line heights, complex rich content, hidden content, and
unmeasurable layouts fail. Do not rearrange a signature or clone content into a
different container to make the check pass. A clone would measure another
layout. Resolve a correct supported region when possible; otherwise report
that formatting could not be verified and leave the message unsent.

Before sending:

1. Require `ok: true`. Correct measurable spacing problems through native edits
   in the authored region, then run the check again. Inspect the separate
   signature boundary's empty-line geometry as well; the helper excludes it.
2. Compare the saved signature and quoted thread with their original values,
   including signature links and images. A correct body does not verify them.
3. Verify recipients, subject, complete wording, and requested attachments in
   the actual composed message. Review newly authored prose against the writing
   style above. Leave the verified draft when only drafting was requested.

If DOM inspection is unavailable, report that spacing remains unverified and
leave the draft unsent. Do not substitute a text preview or visual assessment.

## Send and verify

With send authorization and successful draft checks, use the existing mail
interface to send. Locate the matching Sent Items message using recipients,
subject, time, and content; a closed composer alone is not proof of delivery to
Sent Items. Re-resolve its authored region and run the same checker against the
same logical blocks. Outlook may rewrite wrappers and IDs. Compare the signature,
links, images, attachments, and quoted content again; do not assume a changed
image URL proves identity when a proxy rewrite makes the comparison uncertain.

If sending has an uncertain result, inspect Sent Items before considering a
retry. Report a post-send formatting or preservation failure; it does not
authorize sending a duplicate or replacement. State what was verified and what
remains uncertain. Sent-view checks establish Outlook's displayed result, not
identical rendering in every recipient's mail client.

## Validate changes to this skill

Open [tests/spacing.html](tests/spacing.html) in a real browser and read the JSON
in `#results`. Its top-level `passed` must be `true`. The fixtures exercise actual
geometry, native text insertion, good and bad gaps, grouped lines, wrapping,
sent-view boundaries, and unchanged input DOM. They use synthetic content and
send no mail. No screenshots, mailbox access, or package dependencies are needed.
