export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-5xl font-bold tracking-tight text-white">
        Project<span className="text-marcy-500">Marcy</span>
      </h1>
      <p className="text-gray-400 text-lg text-center max-w-md">
        A safe space for salespeople to vent, connect, laugh, and breathe.
      </p>
      <div className="flex gap-4 mt-4">
        <a
          href="/feed"
          className="px-6 py-3 rounded-xl bg-marcy-500 hover:bg-marcy-600 font-semibold transition-colors"
        >
          Enter the Feed
        </a>
        <a
          href="/vent"
          className="px-6 py-3 rounded-xl border border-gray-700 hover:border-marcy-500 font-semibold transition-colors"
        >
          Anonymous Vent
        </a>
      </div>
    </main>
  );
}
