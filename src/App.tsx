import { useEffect, useReducer, useState } from 'react'
import { toast } from 'sonner'
import { BarChart3, BookOpen, Briefcase, Building2, CalendarDays, Award, ClipboardCheck, FileText, LayoutDashboard, Moon, Plug, Repeat, Settings, ShieldCheck, Sparkles, Sun, User, Users, Wallet, Languages } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger } from '@/components/ui/sidebar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Toaster } from '@/components/ui/sonner'
import { Block } from './blocks'
import { P, actions, pills, StatusBadge } from './portals'
import { D } from './data'
import { LIFECYCLE, history, lang, setLang, tr } from './state'

const ICONS: Record<string, any> = { grid: LayoutDashboard, users: Users, building: Building2, chart: BarChart3, book: BookOpen, clip: ClipboardCheck, brief: Briefcase, spark: Sparkles, shield: ShieldCheck, repeat: Repeat, file: FileText, wallet: Wallet, plug: Plug, cog: Settings, user: User, award: Award, cal: CalendarDays }

function parseHash() {
  const [, po, pg, tb] = decodeURIComponent(location.hash).split('/')
  const portal = P[po] ? po : 'admin'
  const page = P[portal].nav.find((n: any) => n.id === pg) ? pg : P[portal].nav[0].id
  return { portal, page, tab: tb || null }
}
const go = (po: string, pg: string, tb?: string) => { location.hash = `#/${po}/${pg}${tb ? '/' + tb : ''}` }

export default function App() {
  const [loc, setLoc] = useState(parseHash())
  const [, bump] = useReducer(x => x + 1, 0)
  const [dark, setDark] = useState(() => { try { return (localStorage.getItem('theme') ?? (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light')) === 'dark' } catch { return false } })
  const [cand, setCand] = useState<string | null>(null)
  const [match, setMatch] = useState<string | null>(null)

  useEffect(() => { const h = () => setLoc(parseHash()); window.addEventListener('hashchange', h); return () => window.removeEventListener('hashchange', h) }, [])
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch {} }, [dark])
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr' })
  actions.cand = d => setCand(d.id)
  actions.match = d => setMatch(d.id)
  actions.toast = d => toast(d.msg)

  const pd = P[loc.portal], item = pd.nav.find((n: any) => n.id === loc.page), spec = item.p()
  const tabNames = spec.tabs ? Object.keys(spec.tabs) : []
  const tab = tabNames.includes(loc.tab) ? loc.tab : tabNames[0]
  const blocks = spec.tabs ? spec.tabs[tab] : spec.blocks
  const ar = lang === 'ar'

  return (
    <SidebarProvider>
      <Sidebar side={ar ? 'right' : 'left'}>
        <SidebarHeader className="gap-3 p-3">
          <div className="flex items-center gap-2"><div className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">ET</div>
            <div className="leading-tight"><div className="text-sm font-semibold">{tr('Emiratisation Talent')}</div><div className="text-xs text-muted-foreground">Development &amp; Placement</div></div></div>
          <Select value={loc.portal} onValueChange={v => go(v, P[v].nav[0].id)}>
            <SelectTrigger aria-label={tr('Portal')}><SelectValue>{pd.name[ar ? 1 : 0]}</SelectValue></SelectTrigger>
            <SelectContent>{Object.entries(P).map(([k, v]: any) => <SelectItem key={k} value={k}>{v.name[ar ? 1 : 0]}</SelectItem>)}</SelectContent></Select>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup><SidebarGroupLabel>{pd.name[ar ? 1 : 0]}</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>
            {pd.nav.map((n: any) => { const I = ICONS[n.i] || LayoutDashboard; return (
              <SidebarMenuItem key={n.id}><SidebarMenuButton isActive={n.id === loc.page} render={<a href={`#/${loc.portal}/${n.id}`} />}><I /><span>{ar ? n.ar : n.en}</span></SidebarMenuButton></SidebarMenuItem>) })}
          </SidebarMenu></SidebarGroupContent></SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-3"><div className="flex items-center gap-2"><div className="grid size-8 place-items-center rounded-full bg-amber-600 text-xs font-semibold text-white">{pd.user[0].split(' ').map((w: string) => w[0]).slice(0, 2).join('')}</div>
          <div className="leading-tight"><div className="text-sm font-medium">{pd.user[0]}</div><div className="text-xs text-muted-foreground">{pd.user[1]}</div></div></div></SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger /><Separator orientation="vertical" className="mx-1 h-5" />
          <Breadcrumb className="flex-1"><BreadcrumbList><BreadcrumbItem className="hidden sm:block">{pd.name[ar ? 1 : 0]}</BreadcrumbItem><BreadcrumbSeparator className="hidden sm:block" /><BreadcrumbItem><BreadcrumbPage>{ar ? item.ar : item.en}</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <Button variant="outline" size="sm" onClick={() => { setLang(ar ? 'en' : 'ar'); bump() }}><Languages />{ar ? 'English' : 'العربية'}</Button>
          <Button variant="outline" size="icon" aria-label="Toggle theme" onClick={() => setDark(d => !d)}>{dark ? <Sun /> : <Moon />}</Button>
        </header>
        <div className="flex flex-col gap-4 p-4 md:p-6">
          <div className="text-xs text-muted-foreground">{tr('Illustrative data — frontend prototype with mock data only.')}</div>
          {tabNames.length > 0 && <Tabs value={tab} onValueChange={v => go(loc.portal, loc.page, v)}><TabsList className="flex h-auto flex-wrap justify-start">{tabNames.map(n => <TabsTrigger key={n} value={n}>{tr(n)}</TabsTrigger>)}</TabsList></Tabs>}
          {blocks.filter(Boolean).map((b: any, i: number) => <Block key={loc.portal + loc.page + tab + i} b={b} />)}
        </div>
      </SidebarInset>

      <Sheet open={!!cand} onOpenChange={o => !o && setCand(null)}>
        <SheetContent side={ar ? 'left' : 'right'} className="w-full overflow-y-auto sm:max-w-lg">{cand && <CandidatePanel id={cand} user={pd.user[0]} bump={bump} />}</SheetContent></Sheet>
      <Sheet open={!!match} onOpenChange={o => !o && setMatch(null)}>
        <SheetContent side={ar ? 'left' : 'right'} className="w-full overflow-y-auto sm:max-w-lg">{match && <MatchPanel id={match} />}</SheetContent></Sheet>
      <Toaster />
    </SidebarProvider>
  )
}

function CandidatePanel({ id, user, bump }: { id: string; user: string; bump: () => void }) {
  const [, re] = useReducer(x => x + 1, 0)
  const c = D.candidates.find((x: any) => x.id === id), idx = LIFECYCLE.indexOf(c.status)
  const advance = () => { c.status = LIFECYCLE[idx + 1]; history[c.id].unshift([c.status, user, 'Just now']); toast(`Status → ${c.status} (logged)`); re(); bump() }
  return <>
    <SheetHeader><SheetTitle>{c.name}</SheetTitle><SheetDescription>{c.id} · {c.emirate}</SheetDescription></SheetHeader>
    <div className="space-y-5 px-4 pb-6 text-sm">
      <div className="flex items-center gap-2"><StatusBadge s={c.status} />{idx < LIFECYCLE.length - 1 && <Button size="sm" onClick={advance}>{tr('Advance status')}</Button>}</div>
      <section><h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Lifecycle</h4><div className="flex flex-wrap gap-1.5">{LIFECYCLE.map((s, i) => <Badge key={s} variant={i === idx ? 'default' : 'outline'} className={i < idx ? 'border-transparent bg-primary/15 text-primary' : i > idx ? 'text-muted-foreground' : ''}>{s}</Badge>)}</div></section>
      <section><h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Profile</h4><ul className="divide-y">{[['Education', c.edu], ['Experience', c.exp], ['Languages', c.lang], ['Preferred industry', c.pref], ['Source', c.source], ['Profile completeness', c.completeness + '%'], ['Emirates ID', '🔒 restricted']].map(([k, v]) => <li key={k} className="flex justify-between py-2"><span className="text-muted-foreground">{k}</span><span>{v}</span></li>)}</ul></section>
      <section><h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Skills</h4>{pills(c.skills)}</section>
      <section><h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status history (audit)</h4><ol className="ms-2 space-y-3 border-s ps-4">{history[c.id].map(([s, u, t], i) => <li key={i} className="relative before:absolute before:-start-[21px] before:top-1.5 before:size-2.5 before:rounded-full before:bg-primary"><b>{s}</b><div className="text-xs text-muted-foreground">{u} · {t}</div></li>)}</ol></section>
    </div></>
}

function MatchPanel({ id }: { id: string }) {
  const r = D.requirements.find((x: any) => x.id === id)
  const rows = D.candidates.map((c: any) => {
    const hit = r.skills.filter((s: string) => c.skills.includes(s)), miss = r.skills.filter((s: string) => !c.skills.includes(s))
    const sk = Math.round(hit.length / r.skills.length * 100), exp = c.exp === 'Fresher' ? 0 : 1
    return { c, hit, miss, sk, all: Math.min(99, Math.round(sk * .6 + Math.min(c.score, 100) * .25 + exp * 10 + (c.emirate === r.loc ? 5 : 0))) }
  }).filter((x: any) => x.sk > 0).sort((a: any, b: any) => b.all - a.all).slice(0, 6)
  return <>
    <SheetHeader><SheetTitle>{r.title}</SheetTitle><SheetDescription>{r.id} · {r.employer} · {r.loc}</SheetDescription></SheetHeader>
    <div className="space-y-3 px-4 pb-6 text-sm">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ranked matches (AI-assisted, explainable)</h4>
      {rows.map((x: any) => <Card key={x.c.id} className="gap-2 py-4"><CardContent className="space-y-2 px-4">
        <div className="flex justify-between font-semibold"><span>{x.c.name}</span><span>{x.all}%</span></div>
        <div className="flex items-center gap-2"><Progress value={x.sk} className="h-1.5" /><span className="w-10 text-xs text-muted-foreground">{x.sk}%</span></div>
        <p className="text-xs text-muted-foreground">✓ {x.hit.join(', ')}{x.miss.length > 0 && <><br />✗ Missing: {x.miss.join(', ')} → training recommended</>}<br />Readiness {x.c.score || 'n/a'} · {x.c.exp} · {x.c.emirate}</p>
        <Button size="sm" onClick={() => toast.success(x.c.name + ' submitted to employer pipeline')}>Submit to employer</Button></CardContent></Card>)}
      <p className="text-xs text-muted-foreground">Rankings assist recruiters. Candidates are never auto-rejected; recruiters and employers make all decisions.</p>
    </div></>
}
