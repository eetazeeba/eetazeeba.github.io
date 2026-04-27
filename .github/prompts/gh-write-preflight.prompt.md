# GitHub write preflight

Task: Execute a GitHub mutation task with deterministic preflight and minimal write scope.

Goal:
Prevent retry churn and partial runs by confirming write capability first, then executing only the required mutation delta.

Context:
- Target repository: [owner/repo]
- Mutation target: [labels | issues | pull request metadata]
- Required outcome: [smallest successful write]

Execution contract:
1. Use the active terminal for all GitHub write actions.
2. Do not delegate mutation steps to a subagent.
3. If write-capable execution is unavailable, stop write actions immediately.
4. Return exact manual non-interactive commands when blocked.
5. Keep commands single-line and deterministic.
6. For issue creation bodies, prefer `--body-file`; avoid heredoc and multiline quoted `--body "..."`.
7. Prefer `gh api` plus `jq` for structured GitHub verification and mutation checks when JSON output is involved.

Phase order:
1. Preflight
- Confirm command execution path in the active terminal.
- Confirm `jq` is available when the workflow depends on JSON parsing or parity checks.
- Confirm `gh` authentication and target repo access.
- Confirm current live state of the mutation target.
2. Read-only verification
- List existing resources.
- Compute minimal delta only.
3. Minimal write
- Apply only required changes.
- Avoid unrelated updates.
4. Read-back verification
- Re-list resources and confirm final state.
5. Report
- Summarize before state, changes made, and final state.
- If blocked, return exact manual commands and the verification command.

Output format:
1. Preflight result
2. Minimal delta plan
3. Commands executed
4. Verification result
5. Next action

Success criteria:
- Required mutation completed with minimal scope.
- Final state confirmed by read-back output.
- No fallback workaround used unless explicitly required by live repo constraints.

Failure handling:
If mutation execution is unavailable in-session, return:
1. Exact manual commands
2. Expected success indicators
3. Follow-up verification command
