import crypto from "crypto";

type PasswordOptions = {
  length?: number;
  includeUpperCase?: boolean;
  includeLowerCase?: boolean;
  includeDigits?: boolean;
  includeSymbols?: boolean;
  excludeAmbiguous?: boolean;
};

export class Password {
  static CHARSETS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    digits: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  } as const;

  static AMBIGUOUS_CHARS = new Set(["0", "O", "l", "1", "I"]);
  static generatePassword(options: PasswordOptions = {}): string {
    const {
      length = 16,
      includeUpperCase = true,
      includeLowerCase = true,
      includeSymbols = true,
      includeDigits = true,
      excludeAmbiguous = false,
    } = options;

    if (length < 8) throw new Error(`Password length must be at least 8.`);
    let pool = "";
    const requiredChars: string[] = [];

    const addCharset = (chars: string, active: boolean) => {
      if (!active) return;
      const filtered = excludeAmbiguous
        ? chars
            .split("")
            .filter((char) => !this.AMBIGUOUS_CHARS.has(char))
            .join("")
        : chars;
      pool += filtered;
      requiredChars.push(this.pickRandom(filtered));
    };
    addCharset(this.CHARSETS.uppercase, includeUpperCase);
    addCharset(this.CHARSETS.lowercase, includeLowerCase);
    addCharset(this.CHARSETS.digits, includeDigits);
    addCharset(this.CHARSETS.symbols, includeSymbols);

    if (!pool) throw new Error(`At least one charcter set must be enabled.`);
    if (requiredChars.length > length)
      throw new Error(`Length to short to satify all characters requirements`);

    const remaining = Array.from(
      { length: length - requiredChars.length },
      () => this.pickRandom(pool),
    );

    return this.cryptoSuffle([...requiredChars, ...remaining]).join("");
  }

  static pickRandom(chars: string): string {
    if (!chars.length) throw new Error(`Empty Charset Provided.`);

    const max = Math.floor(256 / chars.length) * chars.length;
    let byte: number;
    do {
      byte = crypto.randomBytes(1)[0];
    } while (byte >= max);
    return chars[byte % chars.length];
  }

  static cryptoSuffle<T>(arr: T[]): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.cryptoRandomInt(0, i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  static cryptoRandomInt(min: number, max: number): number {
    const range = max - min;
    const max256 = Math.floor(256 / range) * range;
    let byte: number;
    do {
      byte = crypto.randomBytes(1)[0];
    } while (byte >= max256);
    return min + (byte % range);
  }
}
