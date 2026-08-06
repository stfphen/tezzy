import { HeartMark } from "@/components/icons";

/** Route-level loading state — a soft skeleton in the brand colours. */
export default function Loading() {
  return (
    <div className="container-tezzy py-20 sm:py-28">
      <div className="flex flex-col items-center gap-4" role="status" aria-live="polite">
        <HeartMark className="h-10 w-10 animate-pulse text-candy" />
        <p className="font-display text-sm font-bold text-mocha">Pouring something cute…</p>
      </div>

      <div aria-hidden="true" className="mt-14 flex flex-col gap-4">
        <div className="h-10 w-2/3 max-w-md animate-pulse rounded-pill bg-petal/70" />
        <div className="h-4 w-full max-w-xl animate-pulse rounded-pill bg-petal/50" />
        <div className="h-4 w-4/5 max-w-lg animate-pulse rounded-pill bg-petal/50" />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-64 animate-pulse rounded-card bg-shell/80" />
          ))}
        </div>
      </div>
    </div>
  );
}
