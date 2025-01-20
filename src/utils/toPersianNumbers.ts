const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

// export function toPersianNumbersWithComma(n:number|string|undefined) {
export function toPersianNumbersWithComma(n:any) {
  if (n === undefined) return '';
  const numWithCommas = numberWithCommas(n);
  const persianNumber = toPersianNumbers(numWithCommas);
  return persianNumber;
}

export function numberWithCommas(x:any) {
  if (x === undefined) return '';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function toPersianNumbers(n:any) {
  if (n === undefined) return '';
  return n.toString().replace(/\d/g, (x:any) => farsiDigits[parseInt(x)]);
}
