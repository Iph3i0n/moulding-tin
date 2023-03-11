import ISerialiseable from "./base.ts";
import { BufferWriter, BufferReader } from "./buffer-extra.ts";

export default class UShort implements ISerialiseable<number> {
  Impart(value: number, buffer: BufferWriter): void {
    buffer.Write(16, value);
  }

  Accept(buffer: BufferReader): number {
    return buffer.Read(16);
  }

  Confirm(value: unknown): value is number {
    return typeof value === "number";
  }
}
