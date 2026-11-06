export const isCourseDisabled = (course) => Boolean(course?.disabled);

export function CourseDisabledCallout({ reason, className = '' }) {
  if (!reason) return null;
  return (
    <p
      className={`inline-block max-w-full rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium leading-snug text-amber-950 ${className}`}
    >
      {reason}
    </p>
  );
}

export function CourseDisabledLabel({ reason, className = '' }) {
  if (!reason) return null;
  return (
    <span
      className={`inline-block max-w-full rounded border border-slate-300 bg-white px-2 py-0.5 text-xs font-semibold leading-snug text-slate-800 shadow-sm ${className}`}
    >
      {reason}
    </span>
  );
}
