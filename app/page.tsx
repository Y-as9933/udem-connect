
"use client";

import { useState } from "react";

const initialCalls = [
  { id: 1, student: "María López", reason: "Consulta académica", status: "Pendiente" },
  { id: 2, student: "Carlos Ruiz", reason: "Información de matrícula", status: "En proceso" },
  { id: 3, student: "Ana Martínez", reason: "Soporte estudiantil", status: "Resuelto" },
];

export default function Home() {
  const [active, setActive] = useState("Dashboard");
  const [calls, setCalls] = useState(initialCalls);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [student, setStudent] = useState("");
  const [reason, setReason] = useState("");

  const menu = [
    { name: "Dashboard", icon: "▦" },
    { name: "Estudiantes", icon: "♙" },
    { name: "Llamadas", icon: "☎" },
    { name: "Reportes", icon: "▥" },
  ];

  const filteredCalls = calls.filter(
    (call) =>
      call.student.toLowerCase().includes(search.toLowerCase()) ||
      call.reason.toLowerCase().includes(search.toLowerCase())
  );

  function addCall(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!student.trim() || !reason.trim()) return;
    setCalls([
      { id: Date.now(), student, reason, status: "Pendiente" },
      ...calls,
    ]);
    setStudent("");
    setReason("");
    setShowForm(false);
    setActive("Llamadas");
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 md:flex">
      <aside className="bg-slate-950 text-white md:min-h-screen md:w-64 md:shrink-0">
        <div className="border-b border-white/10 px-6 py-7">
          <div className="text-2xl font-bold tracking-tight">
            UDEM<span className="text-sky-400">Connect</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Sistema de atención estudiantil
          </p>
        </div>

        <nav className="flex gap-2 overflow-x-auto p-3 md:flex-col">
          {menu.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex min-w-fit items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                active === item.name
                  ? "bg-sky-500 font-semibold text-white"
                  : "text-slate-300 hover:bg-white/10"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="hidden px-6 py-8 text-xs leading-6 text-slate-500 md:block">
          UDEM Connect
          <br />
          Plataforma de gestión académica
          <br />
          Versión inicial 1.0
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-5 md:p-9">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              Universidad de Managua
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              {active}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Centro de atención y seguimiento estudiantil
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500" />
            Sistema en línea
          </div>
        </header>

        {active === "Dashboard" && (
          <>
            <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Total de llamadas", value: calls.length, icon: "☎", color: "bg-sky-50 text-sky-700" },
                { label: "Pendientes", value: calls.filter(c => c.status === "Pendiente").length, icon: "◷", color: "bg-amber-50 text-amber-700" },
                { label: "En proceso", value: calls.filter(c => c.status === "En proceso").length, icon: "↻", color: "bg-violet-50 text-violet-700" },
                { label: "Resueltas", value: calls.filter(c => c.status === "Resuelto").length, icon: "✓", color: "bg-emerald-50 text-emerald-700" },
              ].map((card) => (
                <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">{card.label}</p>
                    <span className={`rounded-xl px-3 py-2 text-lg ${card.color}`}>{card.icon}</span>
                  </div>
                  <p className="mt-4 text-3xl font-bold">{card.value}</p>
                  <p className="mt-1 text-xs text-slate-400">Datos de demostración</p>
                </div>
              ))}
            </div>

            <section className="mb-7 rounded-2xl bg-gradient-to-r from-slate-900 to-sky-900 p-7 text-white shadow-sm">
              <p className="text-sm font-medium text-sky-300">PANEL DE OPERACIONES</p>
              <h2 className="mt-3 text-2xl font-bold">
                Bienvenido a UDEM Connect
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Administra las consultas de los estudiantes, registra llamadas
                y da seguimiento a cada solicitud desde un solo lugar.
              </p>
              <button
                onClick={() => { setActive("Llamadas"); setShowForm(true); }}
                className="mt-5 rounded-xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-300"
              >
                + Registrar llamada
              </button>
            </section>
          </>
        )}

        {active === "Estudiantes" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Atención a estudiantes</h2>
            <p className="mt-2 text-sm text-slate-500">
              Consulta los estudiantes registrados en las llamadas de demostración.
            </p>
            <div className="mt-5 space-y-3">
              {calls.map((call) => (
                <div key={call.id} className="rounded-xl bg-slate-50 p-4">
                  <p className="font-semibold">{call.student}</p>
                  <p className="mt-1 text-sm text-slate-500">{call.reason}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {active === "Llamadas" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Registro de llamadas</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Consulta y gestiona las solicitudes estudiantiles.
                </p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700"
              >
                + Nueva llamada
              </button>
            </div>

            {showForm && (
              <form onSubmit={addCall} className="mt-6 grid gap-4 rounded-xl bg-slate-50 p-4 md:grid-cols-3">
                <input
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                  placeholder="Nombre del estudiante"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-sky-500"
                  required
                />
                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Motivo de la llamada"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-sky-500"
                  required
                />
                <button className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
                  Guardar llamada
                </button>
              </form>
            )}

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por estudiante o motivo..."
              className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
            />

            <div className="mt-5 space-y-3">
              {filteredCalls.map((call) => (
                <div key={call.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-4">
                  <div>
                    <p className="font-semibold">{call.student}</p>
                    <p className="mt-1 text-sm text-slate-500">{call.reason}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      call.status === "Resuelto"
                        ? "bg-emerald-100 text-emerald-700"
                        : call.status === "En proceso"
                        ? "bg-violet-100 text-violet-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {call.status}
                    </span>
                    <select
                      aria-label={`Estado de ${call.student}`}
                      value={call.status}
                      onChange={(e) => setCalls(calls.map(c => c.id === call.id ? { ...c, status: e.target.value } : c))}
                      className="max-w-36 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs"
                    >
                      <option>Pendiente</option>
                      <option>En proceso</option>
                      <option>Resuelto</option>
                    </select>
                  </div>
                </div>
              ))}
              {filteredCalls.length === 0 && (
                <p className="py-8 text-center text-sm text-slate-500">
                  No se encontraron llamadas.
                </p>
              )}
            </div>
          </section>
        )}

        {active === "Reportes" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Resumen de actividad</h2>
            <p className="mt-2 text-sm text-slate-500">
              Distribución actual de llamadas registradas.
            </p>
            <div className="mt-6 space-y-5">
              {["Pendiente", "En proceso", "Resuelto"].map((status) => {
                const count = calls.filter(c => c.status === status).length;
                const percent = calls.length ? (count / calls.length) * 100 : 0;
                return (
                  <div key={status}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>{status}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-sky-600" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <footer className="mt-8 text-center text-xs text-slate-400">
          UDEM Connect · Proyecto académico · Datos ficticios de demostración
        </footer>
      </main>
    </div>
  );
}

