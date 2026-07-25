// March 4, 2025 = 0.0 years. Every 4th of the month adds +0.1.
export function getYearsExperience() {
  const start = new Date(2025, 2, 4); // month is 0-indexed
  const now = new Date();

  let months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());

  if (now.getDate() < 4) months--;

  return Math.max(0, months) * 0.1;
}
