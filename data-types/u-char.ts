import ISerialiseable from "./base.ts";
import { BufferWriter, BufferReader } from "./buffer-extra.ts";

export default class UChar implements ISerialiseable<number> {
  Impart(value: number, buffer: BufferWriter): void {
    buffer.Write(8, value);
  }

  Accept(buffer: BufferReader): number {
    return buffer.Read(8);
  }

  Confirm(value: unknown): value is number {
    return typeof value === "number";
  }
}
