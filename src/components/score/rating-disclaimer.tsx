export function RatingDisclaimer({ className }: { className?: string }) {
  return (
    <p
      className={
        className ??
        "rounded-[8px] border border-stone-200 bg-stone-50 px-4 py-3 text-xs leading-relaxed text-stone-600"
      }
    >
      Ratings are evidence-based, confidence-weighted, and methodology-versioned.
      Current data is sample/seeded while the evidence corpus is being built.
      {typeof className === "undefined" && (
        <>
          {" "}
          Version:{" "}
          <span className="font-mono text-stone-500">susco-v0.1-category-seed</span>
        </>
      )}
    </p>
  );
}
