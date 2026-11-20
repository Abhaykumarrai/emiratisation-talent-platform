import { D, LIFECYCLE } from './data'

export const PIPE_STAGES = ['Sourcing', 'Screening', 'Shortlisting', 'Interview', 'Selection', 'Offer', 'Joining', 'Retention']
export const PIPE_NOTE: Record<string, string> = { Selection: 'Selected', Offer: 'Offer released', Joining: 'Verify joining', Retention: 'Employment verified' }
export const pipe: Record<string, { cid: string; req: string }[]> = Object.fromEntries(PIPE_STAGES.map(s => [s, []]))
;[['C-1043', 'Sourcing', 'REQ-501'], ['C-1053', 'Sourcing', 'REQ-503'], ['C-1045', 'Screening', 'REQ-503'], ['C-1047', 'Shortlisting', 'REQ-502'], ['C-1044', 'Interview', 'REQ-504'], ['C-1046', 'Offer', 'REQ-501'], ['C-1049', 'Retention', 'REQ-502']].forEach(([c, s, r]) => pipe[s].push({ cid: c, req: r }))
export const history: Record<string, string[][]> = {}
D.candidates.forEach((c: any) => (history[c.id] = [[c.status, 'System', 'Current status']]))
export { LIFECYCLE }

const AR: Record<string, string> = {
  'Portal': 'البوابة', 'Emiratisation Talent': 'منصة المواهب الإماراتية', 'Dashboard': 'لوحة المعلومات', 'Search…': 'بحث…',
  'Registered candidates': 'المرشحون المسجلون', 'Verified': 'موثق', 'Open requirements': 'الوظائف المفتوحة', 'Placements': 'التوظيفات', '12-month retention': 'الاستمرارية 12 شهراً',
  'Status': 'الحالة', 'Name': 'الاسم', 'Emirate': 'الإمارة', 'Skills': 'المهارات', 'Readiness': 'الجاهزية', 'Source': 'المصدر', 'Education': 'التعليم',
  'Illustrative data — frontend prototype with mock data only.': 'بيانات توضيحية — نموذج أولي للواجهة ببيانات تجريبية فقط.',
  'Submit': 'إرسال', 'Close': 'إغلاق', 'Advance status': 'تقدّم بالحالة', 'Overview': 'نظرة عامة',
  'Organizations': 'المؤسسات', 'Candidates': 'المرشحون', 'Market Intelligence': 'ذكاء السوق', 'Training': 'التدريب', 'Assessments': 'التقييمات', 'Jobs': 'الوظائف',
  'Talent Matching': 'مطابقة المواهب', 'Recruitment': 'التوظيف', 'Compliance': 'الامتثال', 'Retention': 'الاستمرارية', 'Reports': 'التقارير', 'Finance': 'المالية',
  'Integrations': 'التكاملات', 'Administration': 'الإدارة', 'Government': 'الحكومة', 'Employers': 'أصحاب العمل', 'Institutes': 'المعاهد', 'Programs': 'البرامج', 'Batches': 'الدفعات',
  'Enrollments': 'التسجيلات', 'Certifications': 'الشهادات', 'Users': 'المستخدمون', 'Roles': 'الأدوار', 'Settings': 'الإعدادات', 'Audit Logs': 'سجلات التدقيق',
}
export let lang = (() => { try { return localStorage.getItem('lang') || 'en' } catch { return 'en' } })()
export const setLang = (l: string) => { lang = l; try { localStorage.setItem('lang', l) } catch {} }
export const tr = (s: string) => (lang === 'ar' && AR[s]) || s
