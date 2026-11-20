import { useState } from 'react'
import { toast } from 'sonner'
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis, LabelList } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Info, Upload } from 'lucide-react'
import { D } from './data'
import { StatusBadge, actions } from './portals'
import { PIPE_NOTE, PIPE_STAGES, pipe, tr } from './state'

const num = (n: number) => Number(n).toLocaleString('en-AE')
const C = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)']

const Cell_ = ({ v }: { v: any }) => {
  if (v && typeof v === 'object' && !('$$typeof' in v)) {
    if ('b' in v) return <StatusBadge s={v.b} />
    if ('p' in v) return <div className="flex min-w-28 items-center gap-2"><Progress value={v.p} className="h-1.5" /><span className="w-9 text-xs text-muted-foreground">{v.p}%</span></div>
    if ('h' in v) return v.h
  }
  return <>{v}</>
}

function Kpis({ items }: any) {
  return <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">{items.map(([l, v, d]: any) => (
    <Card key={l} className="gap-1 py-4"><CardHeader className="px-4 pb-0"><CardTitle className="text-sm font-medium text-muted-foreground">{tr(l)}</CardTitle></CardHeader>
      <CardContent className="px-4"><div className="text-2xl font-bold tracking-tight">{v}</div>{d && <p className={'text-xs ' + (String(d).startsWith('-') ? 'text-red-600' : 'text-emerald-600')}>{d}</p>}</CardContent></Card>))}</div>
}

function DataTable({ b }: any) {
  const [q, setQ] = useState('')
  const rows = b.rows.filter((r: any[]) => !q || r.map(c => (c && typeof c === 'object' && !('$$typeof' in c) ? (c.b ?? c.p ?? '') : c)).join(' ').toLowerCase().includes(q.toLowerCase()))
  return <Card><CardHeader className="flex flex-row items-center justify-between gap-2"><CardTitle>{tr(b.title || '')}</CardTitle>
    <div className="flex items-center gap-2">{b.search && <Input className="h-8 w-52" placeholder={tr('Search…')} value={q} onChange={e => setQ(e.target.value)} />}
      {b.action && <Button size="sm" onClick={() => toast(b.action[1])}>{b.action[0]}</Button>}</div></CardHeader>
    <CardContent><Table><TableHeader><TableRow>{b.cols.map((c: string) => <TableHead key={c}>{tr(c)}</TableHead>)}</TableRow></TableHeader>
      <TableBody>{rows.map((r: any[], i: number) => <TableRow key={i} className={b.click ? 'cursor-pointer' : ''} onClick={() => b.click && actions[b.click]?.({ id: r[0] })}>
        {r.map((c, j) => <TableCell key={j}><Cell_ v={c} /></TableCell>)}</TableRow>)}</TableBody></Table></CardContent></Card>
}

function Bars({ b, funnel }: any) {
  const data = b.rows.map(([name, v]: any) => ({ name, v }))
  const cfg: ChartConfig = { v: { label: b.title, color: b.alt ? 'var(--chart-2)' : 'var(--chart-1)' } }
  return <Card><CardHeader><CardTitle>{tr(b.title)}</CardTitle></CardHeader><CardContent>
    <ChartContainer config={cfg} className="w-full" style={{ height: data.length * 36 + 16 }}>
      <BarChart data={data} layout="vertical" margin={{ left: 0, right: 40 }}>
        <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={120} fontSize={12} /><XAxis type="number" hide />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="v" radius={6} fill="var(--color-v)">{funnel && data.map((_: any, i: number) => <Cell key={i} fillOpacity={1 - i * 0.07} />)}<LabelList dataKey="v" position="right" fontSize={12} formatter={(x: any) => b.pct ? x + '%' : num(x)} /></Bar>
      </BarChart></ChartContainer></CardContent></Card>
}

function Gap({ b }: any) {
  const data = D.skillGap.map(([name, demand, available]: any) => ({ name, demand, available }))
  const cfg: ChartConfig = { demand: { label: 'Employer demand', color: 'var(--chart-2)' }, available: { label: 'Available candidates', color: 'var(--chart-1)' } }
  return <Card><CardHeader><CardTitle>{tr(b.title)}</CardTitle></CardHeader><CardContent>
    <ChartContainer config={cfg} className="h-64 w-full"><BarChart data={data}><CartesianGrid vertical={false} /><XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} /><YAxis hide />
      <ChartTooltip content={<ChartTooltipContent />} /><Bar dataKey="demand" fill="var(--color-demand)" radius={4} /><Bar dataKey="available" fill="var(--color-available)" radius={4} /></BarChart></ChartContainer>
    <div className="mt-3 flex gap-4 text-xs text-muted-foreground"><span style={{ color: 'var(--chart-2)' }}>● Employer demand</span><span style={{ color: 'var(--chart-1)' }}>● Available candidates</span></div>
    <p className="mt-2 text-xs text-muted-foreground">Illustrative figures for explaining the feature.</p></CardContent></Card>
}

function Donut({ b }: any) {
  const data = b.parts.map(([name, value]: any, i: number) => ({ name, value, fill: C[i % 5] }))
  return <Card><CardHeader><CardTitle>{tr(b.title)}</CardTitle></CardHeader><CardContent className="flex flex-wrap items-center gap-6">
    <ChartContainer config={{}} className="h-36 w-36"><PieChart><ChartTooltip content={<ChartTooltipContent hideLabel />} /><Pie data={data} dataKey="value" nameKey="name" innerRadius={38} strokeWidth={2} /></PieChart></ChartContainer>
    <div className="space-y-1.5 text-sm">{data.map((d: any) => <div key={d.name} className="flex items-center gap-2"><i className="size-2.5 rounded-sm" style={{ background: d.fill }} />{d.name}<b>{d.value}%</b></div>)}</div></CardContent></Card>
}

function LineC({ b }: any) {
  const data = b.labels.map((l: string, i: number) => Object.fromEntries([['x', l], ...b.series.map((s: any, k: number) => ['s' + k, s.data[i]])]))
  const cfg: ChartConfig = Object.fromEntries(b.series.map((s: any, k: number) => ['s' + k, { label: s.name, color: C[k] }]))
  return <Card><CardHeader><CardTitle>{tr(b.title)}</CardTitle></CardHeader><CardContent>
    <ChartContainer config={cfg} className="h-56 w-full"><LineChart data={data} margin={{ left: 8, right: 8 }}><CartesianGrid vertical={false} /><XAxis dataKey="x" tickLine={false} axisLine={false} /><YAxis hide domain={['dataMin - 5', 'dataMax + 3']} />
      <ChartTooltip content={<ChartTooltipContent />} />{b.series.map((_: any, k: number) => <Line key={k} dataKey={'s' + k} stroke={`var(--color-s${k})`} strokeWidth={2.5} dot />)}</LineChart></ChartContainer>
    <div className="mt-2 flex gap-4 text-xs text-muted-foreground">{b.series.map((s: any, k: number) => <span key={k} style={{ color: C[k] }}>● {s.name}</span>)}</div></CardContent></Card>
}

const Stepper = ({ b }: any) => <Card><CardHeader><CardTitle>{tr(b.title)}</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">
  {b.steps.map((s: string, i: number) => <Badge key={s} variant={i === b.cur ? 'default' : 'outline'} className={i < b.cur ? 'border-transparent bg-primary/15 text-primary' : i > b.cur ? 'text-muted-foreground' : ''}>{i + 1}. {s}</Badge>)}</CardContent></Card>

function Kanban() {
  const [, tick] = useState(0)
  const move = (st: string, cid: string) => { const a = pipe[st], i = a.findIndex(x => x.cid === cid), [c] = a.splice(i, 1); pipe[PIPE_STAGES[PIPE_STAGES.indexOf(st) + 1]].push(c); tick(x => x + 1) }
  return <div className="grid auto-cols-[minmax(210px,1fr)] grid-flow-col gap-3 overflow-x-auto pb-2">{PIPE_STAGES.map((st, si) => (
    <div key={st} className="min-h-48 rounded-xl bg-muted/60 p-2.5"><h4 className="mb-2 flex justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground"><span>{st}</span><span>{pipe[st].length}</span></h4>
      {pipe[st].map(c => { const cd = D.candidates.find((x: any) => x.id === c.cid); return <Card key={c.cid} className="mb-2 gap-1 py-3"><CardContent className="px-3 text-sm"><b className="block">{cd.name}</b><span className="text-xs text-muted-foreground">{c.req}</span>
        <div className="mt-2 flex items-center justify-between"><span className="text-xs text-muted-foreground">{PIPE_NOTE[st] || ''}</span>{si < PIPE_STAGES.length - 1 && <Button size="sm" variant="outline" className="h-6 px-2" onClick={() => move(st, c.cid)}>→</Button>}</div></CardContent></Card> })}</div>))}</div>
}

function Calc() {
  const [w, setW] = useState(200), [t, setT] = useState(10), [v, setV] = useState(7), gap = Math.max(0, t - v)
  const f = (l: string, val: number, set: any) => <label className="space-y-1 text-xs font-medium text-muted-foreground">{l}<Input type="number" value={val} onChange={e => set(+e.target.value || 0)} /></label>
  return <Card><CardHeader><CardTitle>Emiratisation target calculator (illustrative)</CardTitle></CardHeader><CardContent className="space-y-4">
    <div className="grid gap-3 sm:grid-cols-3">{f('Total workforce', w, setW)}{f('Applicable target (headcount)', t, setT)}{f('Verified Emirati employees', v, setV)}</div>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{[['Total workforce', w], ['Applicable target', t], ['Verified Emirati employees', v], ['Remaining gap', gap]].map(([l, x]) => <Card key={l as string} className="gap-1 py-3"><CardContent className="px-4"><div className="text-xs text-muted-foreground">{l}</div><div className="text-2xl font-bold">{x}</div></CardContent></Card>)}</div>
    <StatusBadge s={gap ? 'Below target' : 'Target met'} />
    <p className="text-xs text-muted-foreground">Only <b>verified employment</b> counts. Registration, training enrolment, offers or pipeline presence are never counted. Actual targets depend on the employer’s regulatory classification and must be reviewed by a compliance specialist.</p></CardContent></Card>
}

function Upload_() {
  const [rep, setRep] = useState<any>(null)
  const parse = (text: string) => {
    const lines = text.split(/\r?\n/).filter(l => l.trim()), head = (lines.shift() || '').split(',').map(s => s.trim().toLowerCase())
    const need = ['name', 'email', 'mobile', 'source'], missing = need.filter(n => !head.includes(n))
    if (missing.length) return setRep({ missing })
    const seen = new Set<string>(), errs: any[] = []; let ok = 0
    lines.forEach((l, i) => { const c = l.split(',').map(s => s.trim()), r: any = Object.fromEntries(head.map((h, j) => [h, c[j] || ''])); const e = need.filter(n => !r[n]).map(n => `missing ${n}`)
      if (r.email && !/^\S+@\S+\.\S+$/.test(r.email)) e.push('invalid email'); if (r.email && seen.has(r.email.toLowerCase())) e.push('duplicate in file'); seen.add((r.email || '').toLowerCase()); e.length ? errs.push([i + 2, e.join(', ')]) : ok++ })
    setRep({ ok, errs })
  }
  const tpl = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['name,email,mobile,source\nSample Candidate,sample@example.com,0500000000,Self-registration\n'], { type: 'text/csv' })); a.download = 'candidate-import-template.csv'; a.click() }
  return <Card><CardHeader><CardTitle>Bulk candidate import (CSV)</CardTitle></CardHeader><CardContent className="space-y-3">
    <div className="rounded-xl border-2 border-dashed p-6 text-center text-sm text-muted-foreground"><Upload className="mx-auto mb-2 size-6" />Authorized sources only. Required columns: <code>name,email,mobile,source</code> — Emirates ID is not collected at import.
      <div className="mt-3 flex justify-center gap-2"><label className={buttonVariants() + " cursor-pointer"}>Choose CSV file<input type="file" accept=".csv" hidden onChange={e => e.target.files?.[0]?.text().then(parse)} /></label><Button variant="outline" onClick={tpl}>Download template</Button></div></div>
    {rep?.missing && <p className="rounded-md bg-red-100 p-2 text-sm text-red-700">Missing required columns: {rep.missing.join(', ')}</p>}
    {rep?.errs && <><div className="flex gap-3"><Badge>Valid: {rep.ok}</Badge><Badge variant="destructive">Rejected: {rep.errs.length}</Badge></div>
      {rep.errs.length > 0 && <Table><TableHeader><TableRow><TableHead>Row</TableHead><TableHead>Error</TableHead></TableRow></TableHeader><TableBody>{rep.errs.map((e: any) => <TableRow key={e[0]}><TableCell>{e[0]}</TableCell><TableCell>{e[1]}</TableCell></TableRow>)}</TableBody></Table>}
      <p className="text-xs text-muted-foreground">Prototype: no data leaves your browser.</p></>}</CardContent></Card>
}

function FormB({ b }: any) {
  return <Card><CardHeader><CardTitle>{tr(b.title)}</CardTitle></CardHeader><CardContent>
    <form className="grid gap-3 sm:grid-cols-2" onSubmit={e => { e.preventDefault(); toast.success(b.msg); (e.target as HTMLFormElement).reset() }}>
      {b.fields.map(([l, t, o]: any) => <label key={l} className={'space-y-1 text-xs font-medium text-muted-foreground ' + (t === 'textarea' ? 'sm:col-span-2' : '')}>{l}
        {t === 'select' ? <select className="h-9 w-full rounded-md border bg-transparent px-2 text-sm text-foreground">{o.map((x: string) => <option key={x}>{x}</option>)}</select>
          : t === 'textarea' ? <textarea rows={3} className="w-full rounded-md border bg-transparent p-2 text-sm text-foreground" /> : <Input type={t} defaultValue={o} />}</label>)}
      <div className="sm:col-span-2"><Button type="submit">{tr('Submit')}</Button></div></form></CardContent></Card>
}

export function Block({ b }: { b: any }) {
  switch (b.t) {
    case 'kpis': return <Kpis {...b} />
    case 'table': return <DataTable b={b} />
    case 'bars': return <Bars b={b} />
    case 'funnel': return <Bars b={{ ...b, rows: b.steps }} funnel />
    case 'gap': return <Gap b={b} />
    case 'donut': return <Donut b={b} />
    case 'line': return <LineC b={b} />
    case 'stepper': return <Stepper b={b} />
    case 'kanban': return <Kanban />
    case 'calc': return <Calc />
    case 'upload': return <Upload_ />
    case 'form': return <FormB b={b} />
    case 'note': return <div className="flex items-start gap-2 rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground"><Info className="mt-0.5 size-4 shrink-0" />{b.text}</div>
    case 'list': return <Card><CardHeader><CardTitle>{tr(b.title)}</CardTitle></CardHeader><CardContent><ul className="divide-y text-sm">{b.items.map(([a, c]: any, i: number) => <li key={i} className="flex justify-between gap-3 py-2"><span>{a}</span><span>{c}</span></li>)}</ul></CardContent></Card>
    case 'timeline': return <Card><CardHeader><CardTitle>{tr(b.title)}</CardTitle></CardHeader><CardContent><ol className="ms-2 space-y-3 border-s ps-4 text-sm">{b.items.map(([t, s]: any) => <li key={t} className="relative before:absolute before:-start-[21px] before:top-1.5 before:size-2.5 before:rounded-full before:bg-primary"><b>{t}</b><div className="text-xs text-muted-foreground">{s}</div></li>)}</ol></CardContent></Card>
    case 'grid': return <div className="grid gap-4 lg:grid-cols-2">{b.items.map((x: any, i: number) => <Block key={i} b={x} />)}</div>
    default: return null
  }
}
