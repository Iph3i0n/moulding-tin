import ISerialiseable from "./base.ts";
import { BufferWriter, BufferReader } from "./buffer-extra.ts";

export default class Bool implements ISerialiseable<boolean> {
  Impart(value: boolean, buffer: BufferWriter): void {
    buffer.Write(1, value ? 1 : 0);
  }

  Accept(buffer: BufferReader): boolean {
    return !!buffer.Read(1);
  }

  Confirm(value: unknown): value is boolean {
    return typeof value === "boolean";
  }
}
