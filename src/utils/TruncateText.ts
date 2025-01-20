export default function TruncateText(str:string, length:number) {
  if (str.length < length) return str;
  return str.slice(0, length) + "...";
}
