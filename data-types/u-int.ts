import ISerialiseable from "./base.ts";
import { BufferWriter, BufferReader } from "./buffer-extra.ts";

export default class UInt implements ISerialiseable<number> {
  Impart(value: number, buffer: BufferWriter): void {
    buffer.Write(32, value);
  }

  Accept(buffer: BufferReader): number {
    return buffer.Read(32);
  }

  Confirm(value: unknown): value is number {
    return typeof value === "number";
  }
}
