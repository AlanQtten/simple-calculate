export default function preCheck(str: string) {
  return /^[.()*/+\-\d]+$/.test(str);
}
