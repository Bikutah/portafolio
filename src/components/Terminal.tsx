import { useState } from "react";
import "../styles.css";

type TypeHistorial = {
  cmd: string;
  status: "ok" | "error";
  output: string;
};

type TypeComando = { comando: string; contenido: string };

export default function Terminal() {

  const comandos = [
    { comando: "help", contenido: "about: Informacion sobre mi.\nproyects: Listado de algunos proyectos en los que participe!\ntecnologias: Tecnologias que conozco.\ncontacto: Informacion de contacto." },
    { comando: "about", contenido: "Aca va estar la informacion del help" }
  ];




  function buscarComando(input: string): TypeComando | undefined {
    const inputSanatizado = input.trim().toLowerCase()
    return comandos.find(c => c.comando.toLowerCase() === inputSanatizado)
  }

  const [historialComandos, setHistorialComandos] = useState<TypeHistorial[]>(
    [],
  );

  const [texto, setTexto] = useState("");

  function handleInput(e: React.FormEvent) {
    e.preventDefault();

    const input = texto.trim();
    if (!input) return;

    const esValido = buscarComando(input);
    const output = esValido ? esValido.contenido : "Error comando no encontrado, escribe 'help' para ver la lista de los comandos disponibles.";

    setHistorialComandos((prev) => [
      ...prev,
      {
        cmd: input,
        status: esValido ? "ok" : "error",
        output,
      },
    ]);

    setTexto("");
  }
  return (
    <div className=" bg-[var(--color-ubuntu-terminal)] rounded-b-md text-white inline-block align-bottom">

      <ul
        className=" items-center gap-2 font-mono text-sm text-white"
        style={{ listStyle: "none", paddingLeft: 0, marginTop: 8 }}
      >
        <span className="shrink-0">
          Bienvenido a mi portafolio! Escribe 'help' para ver la lista de los comandos disponibles.
        </span>
      </ul>

      <ul
        className="items-center gap-2 font-mono text-sm text-white whitespace-pre-wrap"
        style={{ listStyle: "none", paddingLeft: 0, marginTop: 8 }}
      >
        {historialComandos.map((h, i) => (
          <li key={i} className="whitespace-pre-wrap">

            <div className="flex items-center gap-2 font-mono text-sm text-emerald-400">
              <span className="shrink-0">
                victor@portafolio:<span className="text-cyan-400">~</span>$ {h.cmd}
              </span>
            </div>

            {h.output}
          </li>
        ))}
      </ul>


      <form onSubmit={handleInput} className="w-full">
        <label htmlFor="cmd" className="sr-only">
          Comando
        </label>

        <div className="flex items-center gap-2 font-mono text-sm text-emerald-400">
          <span className="shrink-0">
            victor@portafolio:<span className="text-cyan-400">~</span>$
          </span>

          <input
            id="cmd"
            type="text"
            autoComplete="off"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent outline-none text-white placeholder:text-emerald-700"
            placeholder="escribí un comando…"
          />
        </div>
      </form>
    </div>
  );
}
