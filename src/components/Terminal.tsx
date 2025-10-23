import { useState } from "react";

type TypeHistorial = {
  cmd: string;
  status: "ok" | "error";
  output: string;
  ts: number; // timestamp
};

export default function Terminal() {
  const comandos = ["ayuda", "sobre mi"];

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
    <div>
      <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: 8 }}>
        {comandos.map((h) => (
          <li key={h} style={{ marginBottom: 6 }}>
            {h.toUpperCase()}
          </li>
        ))}
      </ul>

      <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: 8 }}>
        {historialComandos.map((h, i) => (
          <li key={h.ts + "-" + i}>
              [{new Date(h.ts).toLocaleTimeString()}]
            <span>&gt; {h.cmd}</span> {h.output.toUpperCase()}
          </li>
        ))}
      </ul>

      <form onSubmit={handleInput}>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      </form>
    </div>
  );
}
