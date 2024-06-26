declare global {
    interface StringConstructor {
    encode_utf8(s: string): string;
    }
  }

  String.encode_utf8 = (s: string) => {
    return unescape(encodeURIComponent(s));
  };
    
  export {}