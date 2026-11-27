import { CalendarDays, Search, MapPin, ArrowRight, GraduationCap, QrCode, Award } from "lucide-react";

const featuredEvents = [
  {
    category: "Cultura",
    title: "Encuentro universitario de cultura y arte",
    date: "Próximamente",
    place: "Ciudad Universitaria",
    color: "from-amber-100 to-orange-50",
    initials: "CU",
  },
  {
    category: "Académico",
    title: "Jornada de innovación y conocimiento",
    date: "Próximamente",
    place: "Universidad de Antioquia",
    color: "from-sky-100 to-blue-50",
    initials: "JI",
  },
  {
    category: "Bienestar",
    title: "Actividades para la vida universitaria",
    date: "Próximamente",
    place: "Ciudad Universitaria",
    color: "from-emerald-100 to-teal-50",
    initials: "BV",
  },
];

const services = [
  { icon: CalendarDays, title: "Descubre eventos", text: "Encuentra actividades académicas, culturales y de bienestar." },
  { icon: QrCode, title: "Gestiona tu asistencia", text: "Consulta tus inscripciones y valida tu participación." },
  { icon: Award, title: "Obtén certificados", text: "Accede a los certificados de los eventos en los que participaste." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#003b70] text-white"><GraduationCap size={25} /></div>
            <div><p className="text-lg font-bold tracking-tight text-[#003b70]">EventUdeA</p><p className="text-xs text-slate-500">Universidad de Antioquia</p></div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#eventos" className="hover:text-[#003b70]">Eventos</a>
            <a href="#como-funciona" className="hover:text-[#003b70]">Cómo funciona</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-[#003b70] hover:bg-slate-50">Iniciar sesión</a>
            <a href="/registro" className="rounded-lg bg-[#003b70] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#002d55]">Crear cuenta</a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#003b70] text-white">
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-48 left-1/3 h-96 w-96 rounded-full bg-[#e7a823]/10" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-28">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100"><span className="h-2 w-2 rounded-full bg-[#e7a823]" /> La vida universitaria sucede aquí</p>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">Conecta con todo lo que pasa en la <span className="text-[#f2c66d]">UdeA.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-blue-100 md:text-lg">Explora eventos, participa en actividades y mantén tus experiencias universitarias organizadas en un solo lugar.</p>
            <a href="#eventos" className="mt-9 inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-[#003b70] shadow-lg hover:bg-blue-50">Explorar eventos <ArrowRight size={17} /></a>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
            <div className="rounded-2xl bg-white p-6 text-slate-900">
              <div className="flex items-center justify-between"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#003b70]">EVENTUDEA</span><CalendarDays className="text-[#003b70]" /></div>
              <p className="mt-8 text-sm font-semibold text-slate-500">TU PRÓXIMA EXPERIENCIA</p>
              <p className="mt-2 text-2xl font-bold">Hay mucho por descubrir.</p>
              <p className="mt-3 text-sm leading-6 text-slate-500">Conoce espacios para aprender, compartir y disfrutar la vida universitaria.</p>
              <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-5 text-sm font-semibold text-[#003b70]"><MapPin size={16} /> Universidad de Antioquia</div>
            </div>
          </div>
        </div>
      </section>

      <section id="eventos" className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="text-sm font-bold uppercase tracking-widest text-[#a36d00]">Agenda universitaria</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Eventos para descubrir</h2><p className="mt-3 max-w-xl text-slate-500">Explora actividades y encuentra tu próximo espacio para participar.</p></div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400"><Search size={17} /><span>Buscar eventos (próximamente)</span></div>
        </div>
        <div className="mt-9 grid gap-6 md:grid-cols-3">
          {featuredEvents.map((event) => (
            <article key={event.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
              <div className={`flex h-40 items-end bg-gradient-to-br ${event.color} p-6`}><span className="text-5xl font-black tracking-tight text-[#003b70]/20">{event.initials}</span></div>
              <div className="p-6"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#003b70]">{event.category}</span><h3 className="mt-4 min-h-14 text-lg font-bold text-slate-900">{event.title}</h3><div className="mt-4 space-y-2 text-sm text-slate-500"><p className="flex items-center gap-2"><CalendarDays size={15} />{event.date}</p><p className="flex items-center gap-2"><MapPin size={15} />{event.place}</p></div></div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-xs text-slate-400">Contenido de demostración: los eventos reales se cargarán desde Supabase.</p>
      </section>

      <section id="como-funciona" className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-widest text-[#a36d00]">Una experiencia integrada</p><h2 className="mt-2 text-3xl font-bold tracking-tight">Tu vida universitaria, más conectada</h2></div><div className="mt-10 grid gap-8 md:grid-cols-3">{services.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl bg-slate-50 p-7"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f1f8] text-[#003b70]"><Icon size={23} /></div><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>)}</div></div>
      </section>

      <footer className="bg-[#002d55] px-6 py-8 text-center text-sm text-blue-100"><p className="font-semibold">EventUdeA</p><p className="mt-1 text-xs text-blue-200/70">Proyecto académico · Análisis y Diseño de Sistemas II</p></footer>
    </main>
  );
}