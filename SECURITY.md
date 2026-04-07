# Security Policy – Digitale Resilienz

## 1. Foundational Philosophy

Digital resilience is built on **trust through verification**, not surveillance. This policy aims to:

- **Decentralize trust** – Secure the architecture, not police the user.
- **Ensure clear accountability** – Every security domain has an explicitly named owner.
- **Protect human autonomy** – Data collection is minimized, retention is bounded, and surveillance is avoided.

## 2. Reporting a Vulnerability

**Private reporting only** – Do **not** use public issues or discussions.

- **Contact:** `security@digitale-resilienz.org` (or use [GitHub Security Advisories](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability))
- **Expected response time:** 48 hours (acknowledgement), 14 days (initial assessment)
- **What to include:**  
  - Affected component(s)  
  - Steps to reproduce (proof of concept preferred)  
  - Potential impact (confidentiality, integrity, availability)

We will never ask for your credentials or any personally identifiable information during the reporting process.

## 3. Core Security Pillars

### A. Data Privacy & Minimisation („Datensparsamkeit“)

- **Collect only what is functionally necessary** – No telemetry, usage analytics, or logging of personal behaviour unless required for core operation.
- **Retention boundaries:**  
  - Logs: deleted after 30 days (except active incident investigations)  
  - User data: deleted immediately when no longer required for the service  
  - Backups: destroyed after 90 days  
- **No built‑in surveillance** – The system shall not monitor user activity, keystrokes, file contents, or network destinations beyond what is required for immediate security (e.g., rate‑limiting).

### B. Identity & Access Management (IAM)

- **Principle of Least Privilege** – Every user, service, and contributor gets only the permissions necessary for their exact role.
- **Role‑Based Access Control (RBAC)** – Pre‑defined roles (e.g., `maintainer`, `triage`, `reader`). No shared or generic accounts.
- **Authentication:**  
  - SSH keys or GitHub OAuth for code access  
  - Mandatory 2FA for any role that can merge or release  
- **Revocation:** Access is removed within 24 hours of role change or offboarding.

### C. Acceptable Use Policy (AUP)

You are authorised to use this project’s resources (code, infrastructure, credentials) only for lawful, non‑malicious purposes. Concretely:

- **Allowed:** Running your own instance, modifying code for internal resilience, contributing improvements, conducting authorised security research.
- **Prohibited:**  
  - Using the project to attack others (DDoS, scanning, exploitation)  
  - Sharing credentials or private keys  
  - Deliberately introducing vulnerabilities  
  - Mass data harvesting without consent

> *Why?* These rules protect everyone’s autonomy – your freedom stops where another person’s security begins.

### D. Incident Response & Disaster Recovery

| Phase | Owner | Action |
|-------|-------|--------|
| **Declaration** | Project maintainer (or any committer if maintainer unreachable) | Freeze release pipeline, tag compromised artefacts |
| **Mitigation** | Security contact (`@security‑team`) | Patch, revoke keys, rotate secrets |
| **Communication** | Community manager (or maintainer) | Public advisory within 72 hours (no blame, only technical facts) |
| **Post‑mortem** | Lead maintainer | Public report within 2 weeks – **focus on systemic flaws, not individual error** |

**Recovery:** Restore from signed, immutable backups. Assume full compromise of any affected system – rebuild, not just patch.

## 4. Implementation in This Project (GitHub)

- **Signed commits** are required for all release tags (using GPG or Sigstore).
- **Automated dependency scanning** (Dependabot alerts) is enabled.
- **Branch protection:** `main` requires status checks and maintainer approval.
- **Secrets:** No secrets in source code – use GitHub Secrets or a dedicated secrets manager.

## 5. Compliance & Accountability

- **Policy owner:** `@Acephali92` (project founder) – ultimately responsible for outcomes.
- **Review cycle:** This policy is reviewed every 6 months or after any major incident.
- **Violations:** AUP violations are handled privately first, then by temporary or permanent access revocation. Intentional malicious acts may be reported to relevant authorities.

## 6. Questions & Improvements

We believe security policies must evolve with the community. Open an issue (with `[SECURITY]` in the title) for policy suggestions – do **not** use that channel for vulnerability reports.

---

*This policy is designed to balance resilience, autonomy, and accountability. It rejects opaque surveillance in favour of transparent, verifiable security.*
