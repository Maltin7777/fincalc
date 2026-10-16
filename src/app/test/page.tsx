export default function TestPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <article className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/[.03]">
        <div className="flex items-center justify-between gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-zinc-100 text-xl dark:bg-white/10">
            🏷️
          </span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
            Example
          </span>
        </div>
        <h2 className="mt-5 text-lg font-semibold tracking-tight">
          Example Card
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          This is an example card on the /test page. Cards like this are used
          across FinCalc to present features and results in a clean, focused
          layout.
        </p>
        <div className="mt-6 flex items-center justify-between rounded-xl bg-zinc-100 px-4 py-3 dark:bg-white/10">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Sample value
          </span>
          <span className="text-lg font-semibold tabular-nums">$1,250.00</span>
        </div>
      </article>
    </div>
  );
}