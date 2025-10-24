import { useState } from "react";
import '../styles.css'

type TypeHistorial = {
  cmd: string;
  status: "ok" | "error";
  output: string;
  ts: number; // timestamp
};

export default function Terminal() {
  const comandos = ["about me", "help"];

  const [historialComandos, setHistorialComandos] = useState<TypeHistorial[]>(
    [],
  );
  const [texto, setTexto] = useState("");

  function handleInput(e: React.FormEvent) {
    e.preventDefault();

    const input = texto.trim();
    if (!input) return;

    const esValido = comandos.includes(input);
    const output = esValido ? input : "Error 404";

    setHistorialComandos((prev) => [
      ...prev,
      {
        cmd: input,
        status: esValido ? "ok" : "error",
        output,
        ts: Date.now(),
      },
    ]);

    setTexto("");
  }
  return (
    <div className=" bg-[var(--color-ubuntu-terminal)] p-10 rounded-b-md text-white inline-block align-bottom">

      <ul className=" items-center gap-2 font-mono text-sm text-emerald-400" style={{ listStyle: "none", paddingLeft: 0, marginTop: 8 }}>
        {comandos.map((h) => (
          <li key={h} style={{ marginBottom: 6 }}>
            {h.toUpperCase()}
          </li>
        ))}
      </ul>

      <ul className=" items-center gap-2 font-mono text-sm text-emerald-400" style={{ listStyle: "none", paddingLeft: 0, marginTop: 8 }}>
        {historialComandos.map((h, i) => (
          <li key={h.ts + "-" + i}>
              [{new Date(h.ts).toLocaleTimeString()}]
            <span>&gt; {h.cmd}</span> {h.output.toUpperCase()}
          </li>
        ))}
      </ul>

      <form onSubmit={handleInput} className="w-full">
        <label htmlFor="cmd" className="sr-only">Comando</label>

        <div className="flex items-center gap-2 font-mono text-sm text-emerald-400">
          <span className="shrink-0">
            victor@ubuntu:<span className="text-cyan-400">~</span>$
          </span>

          <input
            id="cmd"
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent outline-none text-emerald-100 placeholder:text-emerald-700"
            placeholder="escribí un comando…"
          />
        </div>
      </form>

    </div>
  );
}
