export function formatIsoDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString();
}

export function startOfDayIso(isoOrDate: string | Date): string {
  const d = typeof isoOrDate === 'string' ? new Date(isoOrDate) : new Date(isoOrDate);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}
