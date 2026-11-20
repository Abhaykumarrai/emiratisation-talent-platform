(() => {
"use strict";
const $ = (s, e = document) => e.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const store = { get(k, d) { try { return localStorage.getItem(k) ?? d; } catch { return d; } }, set(k, v) { try { localStorage.setItem(k, v); } catch {} } };

/* ---------- i18n ---------- */
const AR = {
  "Portal": "البوابة", "Emiratisation Talent": "منصة المواهب الإماراتية", "Development & Placement": "التطوير والتوظيف",
  "Dashboard": "لوحة المعلومات", "Organizations": "المؤسسات", "Candidates": "المرشحون", "Market Intelligence": "ذكاء السوق",
  "Training": "التدريب", "Assessments": "التقييمات", "Jobs": "الوظائف", "Talent Matching": "مطابقة المواهب", "Recruitment": "التوظيف",
  "Compliance": "الامتثال", "Retention": "الاستمرارية", "Reports": "التقارير", "Finance": "المالية", "Integrations": "التكاملات",
  "Administration": "الإدارة", "Candidate Database": "قاعدة المرشحين", "Employment Programs": "برامج التوظيف", "Training Programs": "البرامج التدريبية",
  "Training Progress": "تقدم التدريب", "Placement Outcomes": "نتائج التوظيف", "Employer Participation": "مشاركة أصحاب العمل", "Organization Settings": "إعدادات المؤسسة",
  "Company Profile": "ملف الشركة", "Workforce & Compliance": "القوى العاملة والامتثال", "Job Requirements": "متطلبات الوظائف", "Candidate Search": "البحث عن مرشحين",
  "Shortlisted Candidates": "المرشحون المختصرون", "Interviews": "المقابلات", "Offers": "العروض", "Joined Employees": "الموظفون المنضمون", "Users & Settings": "المستخدمون والإعدادات",
  "Institute Profile": "ملف المعهد", "Batches": "الدفعات", "Candidate Enrollment": "تسجيل المرشحين", "Attendance": "الحضور", "Certifications": "الشهادات", "Performance Reports": "تقارير الأداء",
  "My Profile": "ملفي", "My Documents": "مستنداتي", "My Skills": "مهاراتي", "My Assessments": "تقييماتي", "Recommended Training": "تدريب مقترح", "My Courses": "دوراتي",
  "My Certificates": "شهاداتي", "Recommended Jobs": "وظائف مقترحة", "My Applications": "طلباتي", "My Interviews": "مقابلاتي", "My Offers": "عروضي", "My Employment": "وظيفتي",
  "Search…": "بحث…", "Status": "الحالة", "Name": "الاسم", "Emirate": "الإمارة", "Skills": "المهارات", "Readiness": "الجاهزية", "Source": "المصدر",
  "Registered candidates": "المرشحون المسجلون", "Verified": "موثق", "Open requirements": "الوظائف المفتوحة", "Placements": "التوظيفات", "12-month retention": "الاستمرارية 12 شهراً",
  "Illustrative data — this is a frontend prototype with mock data only.": "بيانات توضيحية — هذا نموذج أولي للواجهة ببيانات تجريبية فقط.",
  "Submit": "إرسال", "Cancel": "إلغاء", "Close": "إغلاق", "Advance status": "تقدّم بالحالة", "Overview": "نظرة عامة"
};
let lang = store.get("lang", "en");
const tr = s => (lang === "ar" && AR[s]) || s;

/* ---------- icons ---------- */
const IC = {
  grid: '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-6"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/>',
  clip: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 14l2 2 4-4"/>',
  brief: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>',
  spark: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  repeat: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6"/>',
  wallet: '<path d="M20 12V8H6a2 2 0 0 1 0-4h12v4M4 6v12a2 2 0 0 0 2 2h14v-4M18 12a2 2 0 0 0 0 4h4v-4z"/>',
  plug: '<path d="M12 22v-5M9 8V2M15 8V2M18 8v5a6 6 0 0 1-12 0V8z"/>',
  cog: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M8.2 13.9L7 22l5-3 5 3-1.2-8.1"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'
};
const icon = n => `<svg viewBox="0 0 24 24">${IC[n] || IC.grid}</svg>`;

/* ---------- cell + block helpers ---------- */
const GOOD = /^(verified|joined|completed|active|job ready|passed|retained|paid|approved|offer accepted|employment verified|assessment passed|confirmed|live)/i;
const WARN = /(pending|ongoing|upcoming|interview|training|shortlist|draft|below|review|offered|selected|sourcing|in progress|screening|hold)/i;
const BAD = /(reject|suspend|overdue|resign|fail|drop|expired|terminated|discontinued)/i;
const badge = s => `<span class="badge ${BAD.test(s) ? "b-bad" : GOOD.test(s) ? "b-good" : WARN.test(s) ? "b-warn" : "b-info"}">${esc(s)}</span>`;
const prog = p => `<div class="prog"><i><b style="width:${p}%"></b></i><span>${p}%</span></div>`;
const pills = a => a.map(x => `<span class="pill">${esc(x)}</span>`).join("");
const btn = (label, act, data = {}, cls = "") => `<button class="btn sm ${cls}" data-act="${act}" ${Object.entries(data).map(([k, v]) => `data-${k}="${esc(v)}"`).join(" ")}>${esc(label)}</button>`;
const cell = v => (v && typeof v === "object") ? ("b" in v ? badge(v.b) : "p" in v ? prog(v.p) : v.h) : esc(v);
const num = n => Number(n).toLocaleString(lang === "ar" ? "ar-AE" : "en-AE");

const B = {
  kpis: b => `<div class="kpis">${b.items.map(([l, v, d]) => `<div class="card kpi"><small>${esc(tr(l))}</small><div class="v">${esc(v)}</div>${d ? `<div class="d ${String(d).startsWith("-") ? "neg" : ""}">${esc(d)}</div>` : ""}</div>`).join("")}</div>`,
  table: b => `<div class="card"><h3>${esc(tr(b.title || ""))}${b.action ? btn(b.action[0], "toast", { msg: b.action[1] }, "primary") : ""}</h3>
    ${b.search ? `<div class="toolbar"><input type="text" data-filter placeholder="${esc(tr("Search…"))}" aria-label="Search"></div>` : ""}
    <div class="tablewrap"><table><thead><tr>${b.cols.map(c => `<th>${esc(tr(c))}</th>`).join("")}</tr></thead><tbody>
    ${b.rows.map(r => `<tr ${b.click ? `class="click" data-act="${b.click}" data-id="${esc(r[0])}"` : ""}>${r.map(c => `<td>${cell(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`,
  bars: b => `<div class="card"><h3>${esc(tr(b.title))}</h3>${b.rows.map(([l, v, m]) => `<div class="bar-row ${b.alt ? "alt" : ""}"><span>${esc(l)}</span><div class="track"><div class="fill" style="width:${Math.min(100, v / (m || Math.max(...b.rows.map(r => r[1]))) * 100)}%"></div></div><span>${b.pct ? v + "%" : num(v)}</span></div>`).join("")}</div>`,
  gap: b => `<div class="card"><h3>${esc(tr(b.title))}</h3>${D.skillGap.map(([s, d, a]) => `<div class="gap-row"><span>${s}</span><div class="gap-bars"><div style="width:${d / 1.2}%;background:var(--accent)"></div><div style="width:${a / 1.2}%;background:var(--primary)"></div></div><b style="color:var(--bad)">−${d - a}</b></div>`).join("")}
    <div class="legend"><span><i style="background:var(--accent)"></i>Employer demand</span><span><i style="background:var(--primary)"></i>Available candidates</span></div><p class="note">Illustrative figures for explaining the feature.</p></div>`,
  funnel: b => `<div class="card funnel"><h3>${esc(tr(b.title))}</h3>${b.steps.map(([l, n], i) => `<div class="step"><span class="fl">${esc(l)}</span><div class="fb" style="width:${Math.max(8, n / b.steps[0][1] * 100)}%;opacity:${1 - i * .07}">${num(n)}</div></div>`).join("")}</div>`,
  stepper: b => `<div class="card"><h3>${esc(tr(b.title))}</h3><div class="stepper">${b.steps.map((s, i) => `<span class="s ${i < b.cur ? "done" : i === b.cur ? "cur" : ""}">${i + 1}. ${esc(s)}</span>`).join("")}</div></div>`,
  donut: b => { const tot = b.parts.reduce((a, p) => a + p[1], 0); let off = 0; const cols = ["var(--primary)", "var(--accent)", "var(--info)", "var(--warn)", "var(--bad)"];
    return `<div class="card"><h3>${esc(tr(b.title))}</h3><div class="donut"><svg viewBox="0 0 42 42"><circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--surface2)" stroke-width="6"/>${b.parts.map((p, i) => { const l = p[1] / tot * 100, s = `<circle cx="21" cy="21" r="15.9" fill="none" stroke="${cols[i % 5]}" stroke-width="6" stroke-dasharray="${l} ${100 - l}" stroke-dashoffset="${-off}"/>`; off += l; return s; }).join("")}</svg>
    <div>${b.parts.map((p, i) => `<div style="margin:4px 0"><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${cols[i % 5]};margin-inline-end:8px"></i>${esc(p[0])} <b>${p[1]}%</b></div>`).join("")}</div></div></div>`; },
  line: b => { const all = b.series.flatMap(s => s.data), mx = Math.max(...all) * 1.1, mn = Math.min(...all) * .9, W = 400, H = 150, X = i => 30 + i * (W - 40) / (b.labels.length - 1), Y = v => H - 20 - (v - mn) / (mx - mn) * (H - 40); const cols = ["var(--primary)", "var(--accent)"];
    return `<div class="card"><h3>${esc(tr(b.title))}</h3><svg viewBox="0 0 ${W} ${H}" style="width:100%">${b.series.map((s, k) => `<polyline fill="none" stroke="${cols[k]}" stroke-width="2.5" points="${s.data.map((v, i) => X(i) + "," + Y(v)).join(" ")}"/>${s.data.map((v, i) => `<circle cx="${X(i)}" cy="${Y(v)}" r="3" fill="${cols[k]}"/>`).join("")}`).join("")}${b.labels.map((l, i) => `<text x="${X(i)}" y="${H - 4}" font-size="10" text-anchor="middle" fill="var(--muted)">${l}</text>`).join("")}</svg>
    <div class="legend">${b.series.map((s, k) => `<span><i style="background:${cols[k]}"></i>${s.name}</span>`).join("")}</div></div>`; },
  list: b => `<div class="card"><h3>${esc(tr(b.title))}</h3><ul class="list">${b.items.map(([a, c]) => `<li><span>${a}</span><span>${c ?? ""}</span></li>`).join("")}</ul></div>`,
  timeline: b => `<div class="card"><h3>${esc(tr(b.title))}</h3><div class="tl">${b.items.map(([t, s]) => `<div><b>${esc(t)}</b><small>${esc(s)}</small></div>`).join("")}</div></div>`,
  form: b => `<div class="card"><h3>${esc(tr(b.title))}</h3><form class="form" data-act="form" data-msg="${esc(b.msg)}">${b.fields.map(([l, t, o]) => `<label class="${t === "textarea" ? "full" : ""}">${esc(l)}${t === "select" ? `<select>${o.map(x => `<option>${esc(x)}</option>`).join("")}</select>` : t === "textarea" ? `<textarea rows="3"></textarea>` : `<input type="${t}" ${o ? `value="${esc(o)}"` : ""}>`}</label>`).join("")}<div class="full"><button class="btn primary" type="submit">${esc(tr("Submit"))}</button></div></form></div>`,
  kanban: () => `<div class="kanban">${PIPE_STAGES.map((st, si) => `<div class="kcol"><h4><span>${st}</span><span>${pipe[st].length}</span></h4>${pipe[st].map(c => { const cd = D.candidates.find(x => x.id === c.cid); return `<div class="kcard"><b>${esc(cd.name)}</b><small>${esc(c.req)}</small><div class="row"><small>${PIPE_NOTE[st] || ""}</small><span>${si < PIPE_STAGES.length - 1 ? btn("→", "move", { cid: c.cid, st }) : ""}</span></div></div>`; }).join("")}</div>`).join("")}</div>`,
  upload: () => `<div class="card"><h3>Bulk candidate import (CSV)</h3><div class="drop"><p>Authorized sources only. Required columns: <code>name,email,mobile,source</code> — Emirates ID is not collected at import.</p>
    <input type="file" id="csvFile" accept=".csv" hidden><button class="btn primary" data-act="pick">Choose CSV file</button> <button class="btn" data-act="template">Download template</button></div><div id="importReport"></div></div>`,
  calc: () => `<div class="card"><h3>Emiratisation target calculator (illustrative)</h3><div class="calc">
    <label class="form"><span>Total workforce</span><input type="number" id="cw" value="200"></label>
    <label class="form"><span>Applicable target (headcount)</span><input type="number" id="ct" value="10"></label>
    <label class="form"><span>Verified Emirati employees</span><input type="number" id="cv" value="7"></label></div>
    <div id="calcOut" style="margin-top:14px"></div>
    <p class="note">Only <b>verified employment</b> counts. Registration, training enrolment, offers or pipeline presence are never counted. Actual targets depend on the employer’s regulatory classification and must be reviewed by a compliance specialist.</p></div>`,
  note: b => `<div class="banner">${esc(b.text)}</div>`,
  grid: b => `<div class="grid g2">${b.items.map(renderBlock).join("")}</div>`
};
const renderBlock = b => (B[b.t] || (() => ""))(b);

/* ---------- state ---------- */
const PIPE_STAGES = ["Sourcing", "Screening", "Shortlisting", "Interview", "Selection", "Offer", "Joining", "Retention"];
const PIPE_NOTE = { Selection: "Selected", Offer: "Offer released", Joining: "Verify joining", Retention: "Employment verified" };
const pipe = Object.fromEntries(PIPE_STAGES.map(s => [s, []]));
[["C-1043", "Sourcing", "REQ-501"], ["C-1053", "Sourcing", "REQ-503"], ["C-1045", "Screening", "REQ-503"], ["C-1047", "Shortlisting", "REQ-502"], ["C-1044", "Interview", "REQ-504"], ["C-1046", "Offer", "REQ-501"], ["C-1049", "Retention", "REQ-502"]].forEach(([c, s, r]) => pipe[s].push({ cid: c, req: r }));
const history = {};
D.candidates.forEach(c => history[c.id] = [[c.status, "System", "Current status"]]);

/* ---------- common sub-blocks ---------- */
const candRows = list => list.map(c => [c.id, c.name, c.emirate, c.edu, { h: pills(c.skills) }, { b: c.status }, { p: c.score }, c.source]);
const candCols = ["ID", "Name", "Emirate", "Education", "Skills", "Status", "Readiness", "Source"];
const candTable = (title, list) => ({ t: "table", title, cols: candCols, rows: candRows(list), search: 1, click: "cand" });
const reqTable = (list, title = "Job requirements") => ({ t: "table", title, cols: ["ID", "Title", "Employer", "Vacancies", "Skills", "Location", "Salary", "Status", "Match"], rows: list.map(r => [r.id, r.title, r.employer, r.vac, { h: pills(r.skills) }, r.loc, r.sal, { b: r.status }, { h: btn("View matches", "match", { id: r.id }) }]), search: 1 });
const reqFlow = { t: "stepper", title: "Requirement workflow", steps: ["Created", "Platform Review", "Approved", "Candidate Sourcing", "Shortlisting", "Interview", "Offer", "Joining", "Closed"], cur: 3 };
const trainFlow = { t: "stepper", title: "Training workflow", steps: ["Program Created", "Approval", "Candidate Selection", "Batch Creation", "Enrollment", "Training Started", "Attendance", "Assessment", "Completed", "Certification"], cur: 5 };
const retLine = { t: "line", title: "Retention by milestone (%)", labels: ["Join", "30d", "90d", "180d", "365d"], series: [{ name: "Cohort 2026-A", data: [100, 97, 92, 88, 84] }, { name: "Target", data: [100, 95, 90, 85, 80] }] };
const placeTable = { t: "table", title: "Placements (verified outcome stages)", cols: ["ID", "Candidate", "Employer", "Role", "Joining date", "Stage", "Outcome"], rows: D.placements };
const certRows = [["CERT-77", "Khalid Al Ketbi", "Python for Data (Basic)", "Emirates Skills Academy", "14 Jun 2026", { b: "Verified" }], ["CERT-81", "Omar Al Hammadi", "AutoCAD Professional", "Al Noor Technical College", "02 Sep 2026", { b: "Verified" }], ["CERT-85", "Fatima Al Mansoori", "IFRS Essentials", "Gulf Finance Institute", "20 Oct 2026", { b: "Pending" }]];
const eduCohort = [["Dubai", 3120], ["Abu Dhabi", 2840], ["Sharjah", 2210], ["Ajman", 1190], ["Ras Al Khaimah", 1260], ["Fujairah", 980], ["Umm Al Quwain", 880]];
const orgForm = { t: "form", title: "Register organization", msg: "Organization submitted for approval (Pending)", fields: [["Legal name", "text"], ["Type", "select", ["Private employer", "Government entity", "Training institute", "Certification body", "Strategic partner"]], ["Trade licence no.", "text"], ["Emirate", "select", ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"]], ["Contact email", "email"], ["Notes", "textarea"]] };
const govReports = { t: "table", title: "Programme reports (authorized scope)", cols: ["Report", "Scope", "Period", "Format"], rows: [["Candidates registered through programme", "Programme A", "Q4 2026", { h: btn("Export CSV", "toast", { msg: "Export logged in audit trail" }) }], ["Training enrolment & certification", "Programme A", "Q4 2026", { h: btn("Export CSV", "toast", { msg: "Export logged in audit trail" }) }], ["Placement & retention", "Programme A", "Q4 2026", { h: btn("Export CSV", "toast", { msg: "Export logged in audit trail" }) }]] };
const passFail = { t: "table", title: "Assessment results (kept individually — no single score decides eligibility)", cols: ["Assessment", "Weight", "Score", "Result"], rows: [["Technical – Data Analytics", "40%", { p: 68 }, { b: "Training Recommended" }], ["Communication", "20%", { p: 74 }, { b: "Assessment Passed" }], ["Education & qualifications", "15%", { p: 80 }, { b: "Assessment Passed" }], ["Relevant experience", "15%", { p: 30 }, { b: "Needs Improvement" }], ["Aptitude", "10%", { p: 70 }, { b: "Assessment Passed" }]] };

/* ---------- portals ---------- */
const P = {
  admin: {
    name: ["Platform Admin", "مسؤول المنصة"], user: ["Nasser Al Admin", "Super Admin"], nav: [
      { id: "dash", i: "grid", en: "Dashboard", ar: "لوحة المعلومات", p: () => ({ blocks: [
        { t: "kpis", items: [["Registered candidates", "12,480", "+4.2% this month"], ["Verified", "68%", "+2.1 pts"], ["Open requirements", "37"], ["Employer partners", "64", "+5"], ["Placements", "412", "+31"], ["12-month retention", "84%"]] },
        { t: "grid", items: [{ t: "funnel", title: "Talent-to-employment funnel", steps: [["Registered", 12480], ["Verified", 8486], ["Assessed", 5230], ["Trained", 2140], ["Job ready", 1480], ["Shortlisted", 960], ["Interview", 610], ["Offered", 470], ["Joined (verified)", 412]] }, { t: "bars", title: "Candidates by emirate", rows: eduCohort }] },
        { t: "grid", items: [{ t: "donut", title: "Candidates by readiness", parts: [["Job ready", 12], ["Training recommended", 28], ["Assessed", 18], ["Not assessed", 42]] }, retLine] },
        { t: "table", title: "Training institute performance", cols: ["ID", "Institute", "Focus", "Emirate", "Status", "Completion", "Placement"], rows: D.institutes }] }) },
      { id: "orgs", i: "building", en: "Organizations", ar: "المؤسسات", p: () => ({ tabs: {
        Government: [{ t: "table", title: "Government entities", cols: ["ID", "Name", "Level", "Status", "Agreement", "Data access"], rows: D.government }, { t: "note", text: "Government collaboration, database access and funding are separate approvals — nothing is assumed until formally agreed." }],
        Employers: [{ t: "table", title: "Employers", cols: ["ID", "Name", "Industry", "Emirate", "Status", "Trade licence", "Licence expiry"], rows: D.employers, search: 1, action: ["+ Add employer", "Use the Register form below"] }, orgForm, { t: "stepper", title: "Approval workflow", steps: ["Registered", "Documents verified", "Review", "Approved / Rejected / More info"], cur: 2 }],
        Institutes: [{ t: "table", title: "Training institutes", cols: ["ID", "Name", "Focus", "Emirate", "Status", "Completion", "Placement"], rows: D.institutes }] } }) },
      { id: "cand", i: "users", en: "Candidates", ar: "المرشحون", p: () => ({ tabs: {
        "All Candidates": [candTable("All candidates", D.candidates), B.upload ? { t: "upload" } : null],
        Verification: [candTable("Awaiting verification", D.candidates.filter(c => /Verification|Registered/.test(c.status))), { t: "note", text: "Document verification and consent are checked here. Emirates ID is access-restricted and only collected where lawful." }],
        "Talent Pool": [candTable("Job-ready talent pool", D.candidates.filter(c => c.score >= 75))] } }) },
      { id: "mi", i: "chart", en: "Market Intelligence", ar: "ذكاء السوق", p: () => ({ tabs: {
        Industries: [{ t: "bars", title: "Employer requirements by industry", rows: [["Banking & Finance", 120], ["IT", 96], ["Healthcare", 70], ["Logistics", 66], ["Retail", 58], ["Telecom", 44], ["Construction", 38], ["Hospitality", 31]] }],
        Skills: [{ t: "bars", alt: 1, title: "Most requested skills", rows: [["Data Analytics", 100], ["Accounting", 120], ["Cybersecurity", 80], ["Customer Service", 90], ["HR Management", 60], ["Supply Chain", 55]] }],
        "Demand Analysis": [{ t: "gap", title: "Skill-gap analysis" }, { t: "table", title: "Training opportunities (recommended)", cols: ["Skill", "Gap", "Hiring commitments", "Suggested programme"], rows: [["Data Analytics", "75", "Gulf Meridian Bank: 5", "Data Analytics Professional"], ["Cybersecurity", "65", "Skyline Telecom: 2", "Cybersecurity Foundations"], ["Accounting", "50", "Falcon Logistics: 3", "Corporate Accounting & IFRS"]] }, { t: "table", title: "Employer demand forecast", cols: ["Role", "Headcount", "Horizon"], rows: D.forecast }] } }) },
      { id: "train", i: "book", en: "Training", ar: "التدريب", p: () => ({ tabs: {
        Programs: [trainFlow, { t: "table", title: "Programs", cols: ["ID", "Programme", "Industry", "Duration", "Institute", "Target role", "Status", "Cost"], rows: D.programs, action: ["+ New programme", "Programme draft created"] }],
        Batches: [{ t: "table", title: "Batches", cols: ["Batch", "Candidates", "Duration", "Progress", "Status", "Attendance"], rows: D.batches }],
        Enrollments: [candTable("Candidates enrolled / recommended", D.candidates.filter(c => /Training/.test(c.status)))],
        Certifications: [{ t: "table", title: "Certifications", cols: ["ID", "Candidate", "Certificate", "Issuer", "Date", "Status"], rows: certRows }] } }) },
      { id: "assess", i: "clip", en: "Assessments", ar: "التقييمات", p: () => ({ tabs: {
        "Assessment Library": [{ t: "table", title: "Assessment library", cols: ["ID", "Name", "Type", "Format", "Scope"], rows: D.assessments }],
        Results: [passFail, { t: "note", text: "Readiness weights are configurable per job family and never auto-determine eligibility." }] } }) },
      { id: "jobs", i: "brief", en: "Jobs", ar: "الوظائف", p: () => ({ tabs: { Requirements: [reqFlow, reqTable(D.requirements)], Vacancies: [{ t: "table", title: "Vacancies", cols: ["Requirement", "Open", "Filled", "Time to fill"], rows: [["REQ-501", "4", "0", "—"], ["REQ-502", "2", "1", "26 days"], ["REQ-503", "2", "0", "—"], ["REQ-504", "5", "0", "—"]] }] } }) },
      { id: "match", i: "spark", en: "Talent Matching", ar: "مطابقة المواهب", p: () => ({ tabs: { "AI Search": [{ t: "note", text: "Natural-language talent search (P2). Try: “Emirati data analysts in Dubai with Power BI”." }, { t: "form", title: "Search talent", msg: "Search runs against the verified talent pool (prototype: showing ranked matches)", fields: [["Query", "text", "Emirati data analysts in Dubai with Power BI"]] }, candTable("Results", D.candidates.filter(c => c.skills.some(s => /Data|Power|Python/.test(s))))], "Matching Results": [reqTable(D.requirements, "Select a requirement to view ranked, explainable matches")] } }) },
      { id: "rec", i: "repeat", en: "Recruitment", ar: "التوظيف", p: () => ({ tabs: {
        Pipeline: [{ t: "note", text: "Move cards with →. “Placed” is only counted at verified employment — an offer alone never counts." }, { t: "kanban" }],
        Interviews: [{ t: "table", title: "Interviews", cols: ["Candidate", "Requirement", "Date", "Mode", "Status"], rows: [["Mariam Al Shamsi", "REQ-504", "21 Nov 2026 10:00", "In person", { b: "Scheduled" }], ["Fatima Al Mansoori", "REQ-502", "24 Nov 2026 14:00", "Video", { b: "Scheduled" }]] }],
        Offers: [{ t: "table", title: "Offers", cols: ["Candidate", "Requirement", "Salary", "Status"], rows: [["Aisha Al Zaabi", "REQ-501", "AED 12,000", { b: "Offer Accepted" }]] }],
        Placements: [placeTable] } }) },
      { id: "comp", i: "shield", en: "Compliance", ar: "الامتثال", p: () => ({ tabs: {
        Rules: [{ t: "table", title: "Compliance rule engine (versioned)", cols: ["Rule", "Applies to", "Employer size", "Effective", "Version", "Reviewed by"], rows: [["EM-R1", "Mainland private sector", "50+ employees", "01 Jan 2026", "v2026.1", "Compliance specialist"], ["EM-R2", "Mainland private sector", "50+ employees", "01 Jul 2026", "v2026.2", "Compliance specialist"]] }, { t: "note", text: "Rules are placeholders — maintain against verified official guidance. Calculations are stored against rule version and reporting period." }],
        "Employer Monitoring": [{ t: "table", title: "Employer compliance (illustrative)", cols: ["Employer", "Workforce", "Target", "Verified", "Gap", "Status"], rows: [["Gulf Meridian Bank", "200", "10", "7", "3", { b: "Below target" }], ["Falcon Logistics", "120", "6", "6", "0", { b: "Compliant" }], ["Skyline Telecom", "340", "17", "11", "6", { b: "Below target" }]] }, { t: "calc" }],
        Alerts: [{ t: "list", title: "Alerts", items: [["Gulf Meridian Bank — reporting deadline in 14 days", badge("Upcoming")], ["Skyline Telecom — gap of 6 unresolved", badge("Below target")], ["Desert Rose Hospitality — trade licence expired", badge("Expired")]] }] } }) },
      { id: "ret", i: "repeat", en: "Retention", ar: "الاستمرارية", p: () => ({ tabs: { "Follow-ups": [{ t: "table", title: "Retention follow-ups", cols: ["ID", "Candidate", "Employer", "Joined", "30d", "90d", "180d", "365d", "Reason"], rows: D.retention.map(r => [...r.slice(0, 7), r[7], r[8]]) }], "Employment Status": [retLine, placeTable] } }) },
      { id: "rep", i: "file", en: "Reports", ar: "التقارير", p: () => ({ tabs: { Government: [govReports], Employer: [{ t: "bars", title: "Offer acceptance by employer", pct: 1, rows: [["Gulf Meridian Bank", 92], ["Falcon Logistics", 78], ["Skyline Telecom", 65]], }], Training: [{ t: "bars", title: "Certification rate by institute", pct: 1, rows: [["Emirates Skills Academy", 92], ["Gulf Finance Institute", 88], ["Al Noor Technical", 81]] }], Placement: [placeTable] } }) },
      { id: "fin", i: "wallet", en: "Finance", ar: "المالية", p: () => ({ tabs: { Agreements: [{ t: "table", title: "Agreements", cols: ["Party", "Type", "Status", "Term"], rows: [["Programme A (illustrative)", "Government MoU", { b: "Active" }, "2026–2027"], ["Gulf Meridian Bank", "Employer service agreement", { b: "Active" }, "2026–2027"], ["Emirates Skills Academy", "Training agreement", { b: "Active" }, "2026"]] }], Invoices: [{ t: "table", title: "Invoices (AED)", cols: ["ID", "Customer", "Description", "Amount", "Status", "Due"], rows: D.invoices }, { t: "note", text: "No government funding or incentive is assumed until formally approved." }], Payments: [{ t: "kpis", items: [["Collected", "AED 24,000"], ["Outstanding", "AED 180,500"], ["Overdue", "AED 162,500"]] }] } }) },
      { id: "int", i: "plug", en: "Integrations", ar: "التكاملات", p: () => ({ tabs: { APIs: [{ t: "table", title: "Integration targets (prospective — not confirmed)", cols: ["System", "Capability", "Stage", "Status"], rows: D.integrations }, { t: "note", text: "The platform remains fully functional without government API access using authorized manual imports/exports." }], Imports: [{ t: "upload" }], Exports: [govReports] } }) },
      { id: "adm", i: "cog", en: "Administration", ar: "الإدارة", p: () => ({ tabs: { Users: [{ t: "table", title: "Users", cols: ["User", "Role", "Organization", "MFA", "Status"], rows: [["admin.nasser", "Super Admin", "Platform", "Enabled", { b: "Active" }], ["ops.sara", "Operations", "Platform", "Enabled", { b: "Active" }], ["gov.officer1", "Employment Officer", "Programme A", "Enabled", { b: "Active" }]] }], Roles: [{ t: "table", title: "Role-based access matrix", cols: ["Feature", "Super Admin", "Government", "Employer", "Institute", "Candidate"], rows: [["All organizations", "Full", "Limited", "Own", "Own", "No"], ["Candidate database", "Full", "Authorized", "Shared/shortlisted", "Enrolled", "Own"], ["Training programs", "Full", "View/manage assigned", "View", "Own", "View/enroll"], ["Job requirements", "Full", "View authorized", "Own", "No", "View/apply"], ["Recruitment pipeline", "Full", "Authorized", "Own", "No", "Own applications"], ["Compliance", "Full", "Program reports", "Own company", "No", "No"], ["Reports", "Full", "Program scope", "Own company", "Own programs", "Own data"], ["Platform settings", "Full", "No", "No", "No", "No"]] }], Settings: [{ t: "list", title: "Security", items: [["Organization-level data isolation", badge("Active")], ["MFA for privileged users", badge("Active")], ["Encryption at rest & in transit", badge("Active")], ["Emirates ID field restriction", badge("Active")]] }], "Audit Logs": [{ t: "table", title: "Audit log", cols: ["Time", "User", "Action", "Entity"], rows: D.audit, search: 1 }] } }) }
    ] },
  gov: {
    name: ["Government Portal", "بوابة الجهات الحكومية"], user: ["Employment Officer", "Programme A"], nav: [
      { id: "dash", i: "grid", en: "Dashboard", ar: "لوحة المعلومات", p: () => ({ blocks: [{ t: "kpis", items: [["Registered via programme", "1,200"], ["Assessed", "640"], ["Enrolled in training", "310"], ["Certified", "198"], ["Placed (verified)", "74"], ["Retention (6 mo)", "88%"]] }, { t: "grid", items: [{ t: "funnel", title: "Programme funnel", steps: [["Registered", 1200], ["Assessed", 640], ["Enrolled", 310], ["Certified", 198], ["Placed", 74]] }, { t: "bars", title: "Placements by industry", rows: [["Banking", 28], ["IT", 19], ["Logistics", 12], ["Retail", 9], ["Healthcare", 6]] }] }, { t: "note", text: "You only see candidates and information permitted under your agreement." }] }) },
      { id: "cd", i: "users", en: "Candidate Database", ar: "قاعدة المرشحين", p: () => ({ blocks: [candTable("Authorized candidates", D.candidates.filter(c => /Government/.test(c.source))), { t: "upload" }] }) },
      { id: "ep", i: "award", en: "Employment Programs", ar: "برامج التوظيف", p: () => ({ blocks: [{ t: "table", title: "Programmes", cols: ["ID", "Programme", "Level", "Status", "Agreement", "Data access"], rows: D.government }] }) },
      { id: "tp", i: "book", en: "Training Programs", ar: "البرامج التدريبية", p: () => ({ blocks: [{ t: "table", title: "Assigned training programmes", cols: ["ID", "Programme", "Industry", "Duration", "Institute", "Target role", "Status", "Cost"], rows: D.programs }] }) },
      { id: "tg", i: "chart", en: "Training Progress", ar: "تقدم التدريب", p: () => ({ blocks: [{ t: "table", title: "Batches", cols: ["Batch", "Candidates", "Duration", "Progress", "Status", "Attendance"], rows: D.batches }, { t: "table", title: "Candidates requiring additional training", cols: candCols, rows: candRows(D.candidates.filter(c => /Recommended/.test(c.status))), click: "cand" }] }) },
      { id: "po", i: "repeat", en: "Placement Outcomes", ar: "نتائج التوظيف", p: () => ({ blocks: [placeTable, retLine] }) },
      { id: "epn", i: "building", en: "Employer Participation", ar: "مشاركة أصحاب العمل", p: () => ({ blocks: [{ t: "table", title: "Participating employers", cols: ["ID", "Name", "Industry", "Emirate", "Status", "Trade licence", "Licence expiry"], rows: D.employers }, { t: "table", title: "Hiring demand", cols: ["Role", "Headcount", "Horizon"], rows: D.forecast }] }) },
      { id: "rep", i: "file", en: "Reports", ar: "التقارير", p: () => ({ blocks: [govReports] }) },
      { id: "set", i: "cog", en: "Organization Settings", ar: "إعدادات المؤسسة", p: () => ({ blocks: [{ t: "form", title: "Organization profile", msg: "Settings saved", fields: [["Entity name", "text", "Programme A (illustrative)"], ["Contact email", "email", "programme@example.gov"], ["Reporting contact", "text", "Employment Officer"]] }] }) }
    ] },
  emp: {
    name: ["Employer Portal", "بوابة أصحاب العمل"], user: ["HR Manager", "Gulf Meridian Bank"], nav: [
      { id: "dash", i: "grid", en: "Dashboard", ar: "لوحة المعلومات", p: () => ({ blocks: [{ t: "kpis", items: [["Total workforce", "200"], ["Applicable target", "10"], ["Verified Emirati workforce", "7"], ["Compliance gap", "3"], ["Open vacancies", "4"], ["Offer acceptance", "92%"]] }, { t: "grid", items: [{ t: "funnel", title: "Candidate pipeline", steps: [["Submitted", 24], ["Shortlisted", 12], ["Interviewed", 8], ["Offered", 5], ["Joined", 3]] }, retLine] }] }) },
      { id: "cp", i: "building", en: "Company Profile", ar: "ملف الشركة", p: () => ({ blocks: [{ t: "form", title: "Company profile", msg: "Profile updated", fields: [["Legal name", "text", "Gulf Meridian Bank"], ["Trade licence no.", "text", "TL-00000 (sample)"], ["Industry", "select", ["Banking", "IT", "Retail"]], ["HQ emirate", "select", ["Dubai", "Abu Dhabi"]]] }, { t: "table", title: "Branches", cols: ["Branch", "Emirate", "Headcount"], rows: [["Head Office", "Dubai", "140"], ["Abu Dhabi Branch", "Abu Dhabi", "60"]] }] }) },
      { id: "wc", i: "shield", en: "Workforce & Compliance", ar: "القوى العاملة والامتثال", p: () => ({ blocks: [{ t: "calc" }, { t: "table", title: "Verified Emirati employees", cols: ["ID", "Name", "Role", "Joined", "Evidence", "Status"], rows: [["PL-801", "Rashid Al Suwaidi", "Financial Analyst", "12 Aug 2026", "Contract + payroll", { b: "Employment Verified" }]] }, { t: "list", title: "Reminders", items: [["Reporting deadline in 14 days", badge("Upcoming")]] }] }) },
      { id: "jr", i: "brief", en: "Job Requirements", ar: "متطلبات الوظائف", p: () => ({ blocks: [reqFlow, reqTable(D.requirements.filter(r => r.employer === "Gulf Meridian Bank")), { t: "form", title: "Create requirement", msg: "Requirement sent for platform review", fields: [["Job title", "text"], ["Vacancies", "number", "1"], ["Industry", "select", ["Banking", "IT", "Retail"]], ["Required skills", "text"], ["Minimum education", "select", ["Diploma", "Bachelor", "Master"]], ["Salary range (AED)", "text"], ["Location", "select", ["Dubai", "Abu Dhabi", "Sharjah"]], ["Preferred joining date", "date"], ["Description", "textarea"]] }, { t: "table", title: "Future demand forecast", cols: ["Role", "Headcount", "Horizon"], rows: D.forecast }] }) },
      { id: "cs", i: "spark", en: "Candidate Search", ar: "البحث عن مرشحين", p: () => ({ blocks: [{ t: "note", text: "Only shared / shortlisted candidates are visible to employers. AI ranks candidates; you make every hiring decision." }, candTable("Matching candidates", D.candidates.filter(c => /Job Ready|Shortlisted|Offered|Interview/.test(c.status)))] }) },
      { id: "sl", i: "users", en: "Shortlisted Candidates", ar: "المرشحون المختصرون", p: () => ({ blocks: [candTable("Shortlisted", D.candidates.filter(c => /Shortlisted|Interview/.test(c.status)))] }) },
      { id: "iv", i: "cal", en: "Interviews", ar: "المقابلات", p: () => ({ blocks: [{ t: "table", title: "Interviews", cols: ["Candidate", "Requirement", "Date", "Mode", "Status"], rows: [["Fatima Al Mansoori", "REQ-502", "24 Nov 2026 14:00", "Video", { b: "Scheduled" }]] }, { t: "form", title: "Schedule interview", msg: "Interview recorded; candidate notified", fields: [["Candidate", "select", D.candidates.map(c => c.name)], ["Date", "date"], ["Mode", "select", ["Video", "In person"]]] }] }) },
      { id: "of", i: "file", en: "Offers", ar: "العروض", p: () => ({ blocks: [{ t: "table", title: "Offers", cols: ["Candidate", "Requirement", "Salary", "Status"], rows: [["Aisha Al Zaabi", "REQ-501", "AED 12,000", { b: "Offer Accepted" }]] }] }) },
      { id: "je", i: "user", en: "Joined Employees", ar: "الموظفون المنضمون", p: () => ({ blocks: [placeTable.rows ? { ...placeTable, rows: D.placements.filter(r => /Meridian/.test(r[2])) } : placeTable] }) },
      { id: "rt", i: "repeat", en: "Retention", ar: "الاستمرارية", p: () => ({ blocks: [retLine] }) },
      { id: "rp", i: "chart", en: "Reports", ar: "التقارير", p: () => ({ blocks: [{ t: "bars", title: "Interview conversion", pct: 1, rows: [["Submitted → Shortlisted", 50], ["Shortlisted → Interview", 67], ["Interview → Offer", 63], ["Offer → Joined", 60]] }] }) },
      { id: "us", i: "cog", en: "Users & Settings", ar: "المستخدمون والإعدادات", p: () => ({ blocks: [{ t: "table", title: "Users", cols: ["User", "Role", "Status"], rows: [["hr.manager", "HR Manager", { b: "Active" }], ["recruiter.1", "Recruiter", { b: "Active" }], ["admin.company", "Employer Admin", { b: "Active" }]] }] }) }
    ] },
  inst: {
    name: ["Training Institute Portal", "بوابة معاهد التدريب"], user: ["Coordinator", "Emirates Skills Academy"], nav: [
      { id: "dash", i: "grid", en: "Dashboard", ar: "لوحة المعلومات", p: () => ({ blocks: [{ t: "kpis", items: [["Active programmes", "3"], ["Active batches", "2"], ["Enrolled candidates", "55"], ["Attendance", "92%"], ["Certification rate", "92%"], ["Placement rate", "71%"]] }, { t: "grid", items: [{ t: "bars", title: "Quality indicators", pct: 1, rows: [["Completion", 87], ["Certification", 92], ["Satisfaction", 90], ["Interview conversion", 64], ["Placement", 71], ["Retention", 84]] }, { t: "donut", title: "Assessment outcomes", parts: [["Passed", 72], ["Needs improvement", 20], ["Absent", 8]] }] }] }) },
      { id: "ip", i: "building", en: "Institute Profile", ar: "ملف المعهد", p: () => ({ blocks: [{ t: "form", title: "Profile", msg: "Profile updated", fields: [["Institute name", "text", "Emirates Skills Academy"], ["Accreditation", "text", "Sample accreditation"], ["Emirate", "select", ["Dubai", "Abu Dhabi"]]] }] }) },
      { id: "pr", i: "book", en: "Training Programs", ar: "البرامج التدريبية", p: () => ({ blocks: [trainFlow, { t: "table", title: "Programmes", cols: ["ID", "Programme", "Industry", "Duration", "Institute", "Target role", "Status", "Cost"], rows: D.programs.slice(0, 2), action: ["+ Create programme", "Programme sent for approval"] }] }) },
      { id: "ba", i: "users", en: "Batches", ar: "الدفعات", p: () => ({ blocks: [{ t: "table", title: "Batches", cols: ["Batch", "Candidates", "Duration", "Progress", "Status", "Attendance"], rows: D.batches.slice(0, 2) }] }) },
      { id: "en", i: "clip", en: "Candidate Enrollment", ar: "تسجيل المرشحين", p: () => ({ blocks: [candTable("Enrolled / recommended candidates", D.candidates.filter(c => /Training/.test(c.status)))] }) },
      { id: "at", i: "cal", en: "Attendance", ar: "الحضور", p: () => ({ blocks: [{ t: "table", title: "Attendance – Data Analytics Batch 01", cols: ["Candidate", "Sessions", "Attended", "Attendance"], rows: [["Khalid Al Ketbi", "20", "19", { p: 95 }], ["Majid Al Mazrouei", "20", "16", { p: 80 }], ["Saeed Al Nuaimi", "20", "11", { p: 55 }]] }, { t: "note", text: "Attendance below 75% triggers a warning to the candidate and institute." }] }) },
      { id: "as", i: "clip", en: "Assessments", ar: "التقييمات", p: () => ({ blocks: [passFail] }) },
      { id: "ce", i: "award", en: "Certifications", ar: "الشهادات", p: () => ({ blocks: [{ t: "table", title: "Certificates", cols: ["ID", "Candidate", "Certificate", "Issuer", "Date", "Status"], rows: certRows, action: ["Upload certificate", "Certificate uploaded for verification"] }] }) },
      { id: "pf", i: "chart", en: "Performance Reports", ar: "تقارير الأداء", p: () => ({ blocks: [{ t: "table", title: "Performance", cols: ["ID", "Institute", "Focus", "Emirate", "Status", "Completion", "Placement"], rows: D.institutes.slice(0, 1) }] }) }
    ] },
  cand: {
    name: ["Candidate Portal", "بوابة المرشحين"], user: ["Khalid Al Ketbi", "Candidate"], nav: [
      { id: "pf", i: "user", en: "My Profile", ar: "ملفي", p: () => ({ blocks: [{ t: "kpis", items: [["Profile completeness", "88%"], ["Readiness", "64 / 100"], ["Status", "Training Enrolled"]] }, { t: "stepper", title: "My journey", steps: LIFECYCLE, cur: 6 }, { t: "grid", items: [{ t: "list", title: "Details", items: [["Emirate", "Abu Dhabi"], ["Education", "BEng Computer Science"], ["Experience", "Fresher"], ["Languages", "Arabic, English"], ["Preferred industry", "IT"]] }, { t: "list", title: "Consent", items: [["Share profile with verified employers", badge("Granted")], ["SMS / email notifications", badge("Granted")], ["WhatsApp updates", badge("Pending")]] }] }] }) },
      { id: "dc", i: "file", en: "My Documents", ar: "مستنداتي", p: () => ({ blocks: [{ t: "table", title: "Documents", cols: ["Document", "Uploaded", "Status"], rows: [["CV", "02 Jun 2026", { b: "Verified" }], ["Degree certificate", "02 Jun 2026", { b: "Verified" }], ["Emirates ID (restricted)", "—", { b: "Pending" }]], action: ["Upload document", "Upload queued for verification"] }] }) },
      { id: "sk", i: "spark", en: "My Skills", ar: "مهاراتي", p: () => ({ blocks: [{ t: "bars", title: "Skills (extracted from CV, editable)", pct: 1, rows: [["Python", 70], ["SQL", 60], ["Data Analytics", 45], ["Communication", 75]] }] }) },
      { id: "as", i: "clip", en: "My Assessments", ar: "تقييماتي", p: () => ({ blocks: [passFail] }) },
      { id: "rt", i: "book", en: "Recommended Training", ar: "تدريب مقترح", p: () => ({ blocks: [{ t: "table", title: "Recommended for you (based on skill gaps and employer demand)", cols: ["ID", "Programme", "Industry", "Duration", "Institute", "Target role", "Status", "Action"], rows: D.programs.slice(0, 3).map(p => [...p.slice(0, 7), { h: btn("Enroll", "toast", { msg: "Enrollment request sent to institute" }, "primary") }]) }] }) },
      { id: "mc", i: "book", en: "My Courses", ar: "دوراتي", p: () => ({ blocks: [{ t: "table", title: "My courses", cols: ["Batch", "Candidates", "Duration", "Progress", "Status", "Attendance"], rows: [D.batches[0]] }] }) },
      { id: "ce", i: "award", en: "My Certificates", ar: "شهاداتي", p: () => ({ blocks: [{ t: "table", title: "Certificates", cols: ["ID", "Candidate", "Certificate", "Issuer", "Date", "Status"], rows: [certRows[0]] }] }) },
      { id: "rj", i: "brief", en: "Recommended Jobs", ar: "وظائف مقترحة", p: () => ({ blocks: [{ t: "table", title: "Jobs matching your profile", cols: ["ID", "Title", "Employer", "Location", "Salary", "Match", "Action"], rows: D.requirements.slice(0, 3).map((r, i) => [r.id, r.title, r.employer, r.loc, r.sal, { p: [78, 52, 61][i] }, { h: btn("Apply", "toast", { msg: "Application submitted" }, "primary") }]) }] }) },
      { id: "ap", i: "clip", en: "My Applications", ar: "طلباتي", p: () => ({ blocks: [{ t: "table", title: "Applications", cols: ["Requirement", "Role", "Employer", "Stage"], rows: [["REQ-501", "Junior Data Analyst", "Gulf Meridian Bank", { b: "Sourcing" }]] }] }) },
      { id: "iv", i: "cal", en: "My Interviews", ar: "مقابلاتي", p: () => ({ blocks: [{ t: "table", title: "Interviews", cols: ["Role", "Employer", "Date", "Status"], rows: [["—", "No interviews scheduled yet", "—", { b: "Pending" }]] }] }) },
      { id: "of", i: "file", en: "My Offers", ar: "عروضي", p: () => ({ blocks: [{ t: "table", title: "Offers", cols: ["Role", "Employer", "Salary", "Status"], rows: [["—", "No offers yet", "—", { b: "Pending" }]] }] }) },
      { id: "em", i: "brief", en: "My Employment", ar: "وظيفتي", p: () => ({ blocks: [{ t: "timeline", title: "Employment history", items: [["Registered via government initiative", "Jan 2026"], ["Verified", "Feb 2026"], ["Assessed", "Mar 2026"], ["Enrolled: Data Analytics Professional", "Oct 2026"]] }] }) }
    ] }
};

/* ---------- app shell ---------- */
let portal = "admin", page = "dash", tab = null;
const view = $("#view");

function route() {
  const [, po, pg, tb] = decodeURIComponent(location.hash).split("/");
  if (P[po]) { portal = po; page = pg || P[po].nav[0].id; tab = tb || null; }
  render();
}
function go(po, pg, tb) { location.hash = `#/${po}/${pg}${tb ? "/" + tb : ""}`; }

function render() {
  const pd = P[portal];
  if (!pd.nav.find(n => n.id === page)) page = pd.nav[0].id;
  document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  $("#lang").textContent = lang === "ar" ? "English" : "العربية";
  $("#portal").innerHTML = Object.entries(P).map(([k, v]) => `<option value="${k}" ${k === portal ? "selected" : ""}>${esc(v.name[lang === "ar" ? 1 : 0])}</option>`).join("");
  $("#nav").innerHTML = pd.nav.map(n => `<a href="#/${portal}/${n.id}" class="${n.id === page ? "on" : ""}">${icon(n.i)}<span>${esc(lang === "ar" ? n.ar : n.en)}</span></a>`).join("");
  document.querySelectorAll("[data-i]").forEach(e => e.textContent = tr(e.dataset.i));
  const item = pd.nav.find(n => n.id === page), spec = item.p();
  $("#title").textContent = lang === "ar" ? item.ar : item.en;
  $("#uname").textContent = pd.user[0]; $("#urole").textContent = pd.user[1]; $("#avatar").textContent = pd.user[0].split(" ").map(w => w[0]).slice(0, 2).join("");
  let html = `<div class="banner">${esc(tr("Illustrative data — this is a frontend prototype with mock data only."))}</div>`;
  let blocks = spec.blocks;
  if (spec.tabs) {
    const names = Object.keys(spec.tabs); if (!names.includes(tab)) tab = names[0];
    html += `<div class="tabs" role="tablist">${names.map(n => `<button class="${n === tab ? "on" : ""}" data-act="tab" data-id="${esc(n)}" role="tab">${esc(tr(n))}</button>`).join("")}</div>`;
    blocks = spec.tabs[tab];
  }
  html += blocks.filter(Boolean).map(renderBlock).join("");
  view.innerHTML = html;
  $("#sidebar").classList.remove("on");
  calcUpdate();
}

/* ---------- interactions ---------- */
function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("on"), 2600); }
function openDrawer(html) { $("#drawer").innerHTML = html + `<p><button class="btn" data-act="close">${esc(tr("Close"))}</button></p>`; $("#drawer").classList.add("on"); $("#bg").classList.add("on"); }
function closeDrawer() { $("#drawer").classList.remove("on"); $("#bg").classList.remove("on"); }

function candDrawer(id) {
  const c = D.candidates.find(x => x.id === id), idx = LIFECYCLE.indexOf(c.status);
  openDrawer(`<h2>${esc(c.name)}</h2><div style="color:var(--muted)">${c.id} · ${esc(c.emirate)} · ${badge(c.status)}</div>
  <h4>Lifecycle</h4><div class="stepper">${LIFECYCLE.map((s, i) => `<span class="s ${i < idx ? "done" : i === idx ? "cur" : ""}">${s}</span>`).join("")}</div>
  <p>${idx < LIFECYCLE.length - 1 ? btn(tr("Advance status"), "advance", { id: c.id }, "primary") : ""}</p>
  <h4>Profile</h4><ul class="list"><li><span>Education</span><span>${esc(c.edu)}</span></li><li><span>Experience</span><span>${esc(c.exp)}</span></li><li><span>Languages</span><span>${esc(c.lang)}</span></li><li><span>Preferred industry</span><span>${esc(c.pref)}</span></li><li><span>Source</span><span>${esc(c.source)}</span></li><li><span>Profile completeness</span><span>${c.completeness}%</span></li><li><span>Emirates ID</span><span>🔒 restricted</span></li></ul>
  <h4>Skills</h4>${pills(c.skills)}
  <h4>Status history (audit)</h4><div class="tl">${history[c.id].map(([s, u, t]) => `<div><b>${esc(s)}</b><small>${esc(u)} · ${esc(t)}</small></div>`).join("")}</div>`);
}
function matchDrawer(id) {
  const r = D.requirements.find(x => x.id === id);
  const rows = D.candidates.map(c => {
    const hit = r.skills.filter(s => c.skills.includes(s)), miss = r.skills.filter(s => !c.skills.includes(s));
    const sk = Math.round(hit.length / r.skills.length * 100), exp = c.exp === "Fresher" ? 0 : 1;
    return { c, hit, miss, sk, all: Math.min(99, Math.round(sk * .6 + Math.min(c.score, 100) * .25 + exp * 10 + (c.emirate === r.loc ? 5 : 0))) };
  }).filter(x => x.sk > 0).sort((a, b) => b.all - a.all).slice(0, 6);
  openDrawer(`<h2>${esc(r.title)}</h2><div style="color:var(--muted)">${r.id} · ${esc(r.employer)} · ${esc(r.loc)}</div>
  <h4>Ranked matches (AI-assisted, explainable)</h4>${rows.length ? rows.map(x => `<div class="card" style="margin-bottom:10px"><h3>${esc(x.c.name)}<span>${x.all}%</span></h3>${prog(x.sk)}
  <p class="note" style="margin:6px 0">✓ ${x.hit.join(", ") || "—"}${x.miss.length ? `<br>✗ Missing: ${x.miss.join(", ")} → training recommended` : ""}<br>Readiness ${x.c.score || "n/a"} · ${esc(x.c.exp)} · ${esc(x.c.emirate)}</p>${btn("Submit to employer", "toast", { msg: x.c.name + " submitted to employer pipeline" }, "primary")}</div>`).join("") : "<p>No matches yet.</p>"}
  <p class="note">Rankings assist recruiters. Candidates are never auto-rejected; recruiters and employers make all decisions.</p>`);
}
function calcUpdate() {
  const o = $("#calcOut"); if (!o) return;
  const w = +$("#cw").value || 0, t = +$("#ct").value || 0, v = +$("#cv").value || 0, gap = Math.max(0, t - v);
  o.innerHTML = `<div class="kpis"><div class="card kpi"><small>Total workforce</small><div class="v">${w}</div></div><div class="card kpi"><small>Applicable target</small><div class="v">${t}</div></div><div class="card kpi"><small>Verified Emirati employees</small><div class="v">${v}</div></div><div class="card kpi"><small>Remaining target gap</small><div class="v">${gap}</div></div><div class="card kpi"><small>Status</small><div class="v" style="font-size:18px">${badge(gap ? "Below target" : "Target met")}</div></div></div>`;
}
function importCsv(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim()), head = (lines.shift() || "").split(",").map(s => s.trim().toLowerCase());
  const need = ["name", "email", "mobile", "source"], missing = need.filter(n => !head.includes(n)), out = $("#importReport");
  if (missing.length) { out.innerHTML = `<p class="banner" style="background:var(--bad-bg);color:var(--bad)">Missing required columns: ${missing.join(", ")}</p>`; return; }
  const seen = new Set(), errs = []; let ok = 0;
  lines.forEach((l, i) => { const c = l.split(",").map(s => s.trim()), r = Object.fromEntries(head.map((h, j) => [h, c[j] || ""])); let e = need.filter(n => !r[n]).map(n => `missing ${n}`);
    if (r.email && !/^\S+@\S+\.\S+$/.test(r.email)) e.push("invalid email"); if (r.email && seen.has(r.email.toLowerCase())) e.push("duplicate in file"); seen.add((r.email || "").toLowerCase());
    e.length ? errs.push([i + 2, e.join(", ")]) : ok++; });
  out.innerHTML = `<div class="kpis" style="margin-top:12px"><div class="card kpi"><small>Valid records</small><div class="v">${ok}</div></div><div class="card kpi"><small>Rejected</small><div class="v">${errs.length}</div></div></div>${errs.length ? `<table style="margin-top:10px"><thead><tr><th>Row</th><th>Error</th></tr></thead><tbody>${errs.map(e => `<tr><td>${e[0]}</td><td>${esc(e[1])}</td></tr>`).join("")}</tbody></table>` : ""}<p class="note">Prototype: no data leaves your browser.</p>`;
}

document.addEventListener("click", e => {
  const el = e.target.closest("[data-act]"); if (!el || el.tagName === "FORM") { if (e.target.id === "bg") closeDrawer(); return; }
  const d = el.dataset;
  if (d.act === "toast") { e.stopPropagation(); toast(d.msg); }
  else if (d.act === "tab") go(portal, page, d.id);
  else if (d.act === "cand") candDrawer(d.id);
  else if (d.act === "match") { e.stopPropagation(); matchDrawer(d.id); }
  else if (d.act === "close") closeDrawer();
  else if (d.act === "advance") { const c = D.candidates.find(x => x.id === d.id), i = LIFECYCLE.indexOf(c.status); c.status = LIFECYCLE[i + 1]; history[c.id].unshift([c.status, P[portal].user[0], "Just now"]); toast(`Status → ${c.status} (logged)`); candDrawer(c.id); render(); }
  else if (d.act === "move") { const a = pipe[d.st], i = a.findIndex(x => x.cid === d.cid), [c] = a.splice(i, 1); pipe[PIPE_STAGES[PIPE_STAGES.indexOf(d.st) + 1]].push(c); render(); }
  else if (d.act === "pick") $("#csvFile").click();
  else if (d.act === "template") { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob(["name,email,mobile,source\nSample Candidate,sample@example.com,0500000000,Self-registration\n"], { type: "text/csv" })); a.download = "candidate-import-template.csv"; a.click(); }
});
$("#bg").addEventListener("click", closeDrawer);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });
document.addEventListener("input", e => {
  if (e.target.matches("[data-filter]")) { const q = e.target.value.toLowerCase(); e.target.closest(".card").querySelectorAll("tbody tr").forEach(r => r.style.display = r.textContent.toLowerCase().includes(q) ? "" : "none"); }
  if (e.target.closest("#cw,#ct,#cv") || ["cw", "ct", "cv"].includes(e.target.id)) calcUpdate();
});
document.addEventListener("change", e => { if (e.target.id === "csvFile" && e.target.files[0]) e.target.files[0].text().then(importCsv); });
document.addEventListener("submit", e => { if (e.target.dataset.act === "form") { e.preventDefault(); toast(e.target.dataset.msg); e.target.reset(); } });
$("#portal").addEventListener("change", e => go(e.target.value, P[e.target.value].nav[0].id));
$("#lang").addEventListener("click", () => { lang = lang === "ar" ? "en" : "ar"; store.set("lang", lang); render(); });
$("#theme").addEventListener("click", () => { const t = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = t; store.set("theme", t); });
$("#menuBtn").addEventListener("click", () => $("#sidebar").classList.toggle("on"));
document.documentElement.dataset.theme = store.get("theme", matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
window.addEventListener("hashchange", route);
route();
})();
