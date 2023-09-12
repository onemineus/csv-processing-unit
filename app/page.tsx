import CSVFileInput from "@/components/StandardizedData";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen bg-zinc-950 text-zinc-50">
      <div>
        <CSVFileInput />
      </div>
    </main>
  );
}
