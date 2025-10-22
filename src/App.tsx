import "./App.css";

export function Hello(_name: string) {
  const unused = 123; // debería marcar warning por no usado
  return `Hola`;
}

function App() {
  return (
    <>
      <div>
        <h1>HolaMundo('print')</h1>
      </div>
    </>
  );
}

export default App;
