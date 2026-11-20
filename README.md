# UAE Emiratisation Talent Development & Placement Platform — Frontend Prototype

A clickable, zero-build frontend prototype of the platform described in the PRD. It connects government entities, employers, training institutes and Emirati candidates across the full lifecycle: onboarding → verification → assessment → training → matching → recruitment → verified placement → retention & compliance.

> All data is **illustrative mock data**. No real candidates, employers, government figures or integrations. Government APIs (Nafis, Mawaheb, etc.) are shown as prospective targets only.

## Portals (switch from the sidebar)

| Portal | Highlights |
|---|---|
| Platform Admin | KPI funnel, organizations & approval workflow, candidate lifecycle, market intelligence & skill-gap, training, assessments, requirements, explainable matching, recruitment kanban, compliance rules, retention, finance, integrations, RBAC matrix, audit log |
| Government | Programme dashboard, authorized candidate database, training progress, placement outcomes, reports |
| Employer | Compliance calculator (verified employment only), requirements, search, interviews, offers, retention |
| Training Institute | Programmes, batches, attendance, assessments, certifications, quality indicators |
| Candidate | Journey, consent, documents, skills, assessments, recommended training & jobs, applications |

## Interactions worth trying
- Click any candidate → drawer with lifecycle, **Advance status** (logged to history with user + timestamp).
- Jobs → **View matches** → ranked, explainable matches (AI assists; humans decide).
- Recruitment → Pipeline: move cards; "placed" counts only at verified employment.
- Candidates → CSV import: validates columns, duplicates and bad rows (runs in-browser).
- Employer → Workforce & Compliance calculator.
- English / Arabic (RTL) toggle and light / dark theme.

## Run locally
```bash
python -m http.server 8000   # or any static server, then open http://localhost:8000
```

## Structure
`index.html` · `styles.css` · `data.js` (mock data) · `app.js` (hash-routed vanilla JS app)

Next steps (per PRD): replace mock data with a multi-tenant backend, RBAC/field-level security, consent management, CV parsing and a versioned compliance rule engine.
