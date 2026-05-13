# Contact Form Microsoft 365 Graph Setup

Status
- Primary: active
- Updated: 2026-05-13
- Current reference: docs/planning/domain-hosting-email-rollout-plan.md
- Note: Active operational baseline for Contact form delivery via Microsoft Graph.


Purpose
- Record the Microsoft 365 / Exchange Online setup used by `api/contact.js` to send Contact form email via Microsoft Graph using certificate-based app authentication.

Current State
- `api/contact.js` accepts validated contact submissions and returns normalized JSON responses.
- SMTP AUTH/app-password workflow is deprecated for this project path.
- Graph API with Entra app certificate is the current implementation direction.
- Default sender mailbox is `contact@musifer.studio`.
- Default recipient mailbox is `contact@musifer.studio`.
- MFA is enabled for Microsoft 365 users.
- Domain and hosting rollout dependencies are complete; this path operates on the current Vercel + `musifer.studio` baseline.

Recommended Delivery Path
- Use Microsoft Graph API `users/{sender}/sendMail` with OAuth2 client credentials and certificate-based client assertion.
- Keep sender and receiver mailbox defaults at `contact@musifer.studio` unless product requirements change.

Mailbox Authority and Ownership Model
- Business owner (site operator) is decision authority for mailbox policy, retention policy, and public-routing changes.
- Operational mailbox baseline for site contact path is `contact@musifer.studio` for both sender identity and receiver inbox.
- Tenant/admin authority controls Entra app registration, certificate lifecycle, permission grants, and Conditional Access policy outcomes.
- Development authority controls implementation in `api/contact.js`, deployment wiring, and non-secret operational documentation updates.
- Change-control expectation: mailbox identity or routing changes must be reflected in this document and `docs/high-level-project-tracking.md` in the same task.

Resolved Decisions (2026-05-13)
- Sender mailbox default: `contact@musifer.studio`.
- Recipient mailbox default: `contact@musifer.studio`.
- MFA posture: enabled for Microsoft 365 users.
- Integration path: Microsoft Graph API remains the required delivery path.

Environment Variables
- `CONTACT_EMAIL_TO`
  - Inbox that receives contact submissions.
  - Example: `contact@musifer.studio`
- `CONTACT_SENDER_EMAIL`
  - Mailbox used as Graph sendMail user principal.
  - Example: `contact@musifer.studio`
- `GRAPH_CLIENT_ID`
  - Entra application/client ID.
- `GRAPH_TENANT_ID`
  - Entra tenant ID.
- `GRAPH_CERT_THUMBPRINT`
  - SHA-1 certificate thumbprint used for the JWT `x5t` header.
- `GRAPH_CERT_PRIVATE_KEY_PEM`
  - Private key PEM for signing client assertions.
- `CONTACT_RATE_LIMIT`
  - Optional. Requests allowed per minute per IP.
  - Current server default is `5` if unset.

Vercel Setup Steps
1. Open the Vercel project.
2. Go to Settings > Environment Variables.
3. Add `CONTACT_EMAIL_TO` for Production, Preview, and Development as appropriate.
4. Add `CONTACT_SENDER_EMAIL` for the same environments.
5. Add `GRAPH_CLIENT_ID` for the same environments.
6. Add `GRAPH_TENANT_ID` for the same environments.
7. Add `GRAPH_CERT_THUMBPRINT` for the same environments.
8. Add `GRAPH_CERT_PRIVATE_KEY_PEM` for the same environments.
9. Optionally add `CONTACT_RATE_LIMIT` if the default of `5` should be overridden.
10. Redeploy after saving environment-variable changes.

Microsoft 365 / Entra Setup Steps
1. Confirm app registration has `Mail.Send` application permission with admin consent.
2. Confirm app certificate is uploaded to the Entra app registration and matches private key used in Vercel.
3. Confirm `CONTACT_SENDER_EMAIL` mailbox exists and app access policy allows send-as for that mailbox.
4. Confirm there is no Conditional Access or Exchange policy blocking app-only sends.

Implementation Steps In Code
1. Build a signed client assertion JWT in `api/contact.js` using `GRAPH_CERT_PRIVATE_KEY_PEM` and `GRAPH_CERT_THUMBPRINT`.
2. Request an access token from the tenant token endpoint with client-credentials grant.
3. Call Graph `users/{sender}/sendMail` with the resulting token.
4. Build the outgoing message so the inbox receives:
   - sender name
   - sender email address
   - optional subject
   - full message body
   - timestamp or request metadata only if genuinely useful
5. Use `replyTo: formData.email` so replies go back to the person who submitted the form.
6. On Graph auth/send failure, log server-side details and return a normalized error result from `sendEmail()`.
7. Keep user-facing API responses generic; do not expose provider details to the client.

Runtime Identifier Policy
- Planning docs should reference where runtime identifiers are managed (Entra app registration, certificate records, and deployment environment dashboards) instead of recording concrete runtime IDs/thumbprints inline.
- If runtime identifiers are temporarily recorded for implementation support, remove them when the implementation task is complete.
- Keep secrets and private key material out of repo docs at all times.

Validation And Test Steps
1. Add the environment variables locally in `.env.local` or use `vercel env pull` for local testing.
2. Submit a valid message from the local contact form and confirm:
   - the API returns `200`
   - the success state renders in-page
   - the email arrives in `CONTACT_EMAIL_TO`
3. Submit multiple requests quickly to confirm the current rate-limit behavior still returns `429`.
4. Confirm invalid email or missing required fields still fail before network submission on the client.
5. Inspect Vercel function logs for Graph token or sendMail failures.

Fallback Path
- If certificate auth cannot be supported in deployment constraints, use a short-lived client secret plus secret rotation policy as a temporary fallback.

Notes
- Do not commit credentials to the repository.
- Keep `.env.local` local-only.
- Preserve the existing generic success and failure UI copy unless product requirements change.
- Domain/hosting phase gating is complete; this operational note now tracks steady-state contact delivery on the active infrastructure baseline.