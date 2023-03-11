import ISerialiseable from "./base.ts";
import { BufferWriter, BufferReader } from "./buffer-extra.ts";

export default class Char implements ISerialiseable<number> {
  Impart(value: number, buffer: BufferWriter): void {
    buffer.Write(1, value >= 0 ? 1 : 0);
    buffer.Write(8, Math.abs(value));
  }

  Accept(buffer: BufferReader): number {
    const is_positive = !!buffer.Read(1);
    if (is_positive) return buffer.Read(8);
    return -buffer.Read(8);
  }

  Confirm(value: unknown): value is number {
    return typeof value === "number";
  }
}
