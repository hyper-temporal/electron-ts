// export function ReflectionToString(obj: any): string {

//   let result = "";
//   for (const [key, value] of Object.entries(obj)) {
//     result += `${key}: ${value} + \n `;
//   }
//   return result;
// }
declare global {
  interface StringConstructor {
    encode_utf8(s: string): string;
  }
}

String.encode_utf8 = (s: string) => {
  return encodeURIComponent(s);
};

export { }