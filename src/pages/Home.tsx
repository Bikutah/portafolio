import Terminal from "../components/Terminal";
import "../styles.css";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center ">
      {" "}
      <div className="w-11/12 md:w-3/4 h-3/4 flex flex-col shadow-2xl">
        {" "}
        <div className="rounded-t-md bg-[#2C001E] text-rose-100 px-3 py-2 font-mono text-xs flex items-center justify-between flex-shrink-0">
          <span>victor@ubuntu: ~</span>{" "}
          <div className="flex gap-1">
            {" "}
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
            {" "}
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
            {" "}
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
            {" "}
          </div>
          {" "}
        </div>
        <div className="flex-grow overflow-y-auto bg-[var(--color-ubuntu-terminal)] text-white p-3 rounded-b-md">
          <Terminal />
        </div>
        {" "}
      </div>
      {" "}
    </div>
  );
}
