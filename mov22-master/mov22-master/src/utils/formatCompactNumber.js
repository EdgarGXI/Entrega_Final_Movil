export default function formatCompactNumber(num) {
  if (num < 1000) return num.toString();

  if (num < 10000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }

  if (num < 100000) {
    return Math.round(num / 1000) + 'k';
  }

  const rounded = Math.round(num / 1000);
  return (rounded <= 999 ? rounded + 'k' : '1M');
}
