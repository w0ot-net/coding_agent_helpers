# Validation

## Authorization and Scope

- Inspect existing tests when needed to understand contracts and impact. Do
  not modify or run tests unless explicitly requested.
- When validation is authorized, use the narrowest check that proves the
  change. Disclose relevant validation that was not run.
- Run aggregate or release suites only when explicitly requested.
- Before validation expected to exceed ten minutes, tell the user what will
  run and provide an estimate.
- Report failures accurately. Do not hide them with retries or fallbacks; fix
  and retry failures caused by in-scope work.

## Evidence and Artifacts

- Add verification, persistent evidence, or recovery machinery only for a
  concrete failure model and identified consumer. Replace rather than
  duplicate an existing owner.
- Use operating-system temporary locations for disposable output and
  project-designated storage for retained raw artifacts.
- Do not commit large raw logs or traces by default. Publish compact
  conclusions and relevant artifact paths in the logical project location.
