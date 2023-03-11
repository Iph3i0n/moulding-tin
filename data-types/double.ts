import ISerialiseable from "./base.ts";
import { BufferWriter, BufferReader } from "./buffer-extra.ts";

export default class Double implements ISerialiseable<number> {
  Impart(value: number, buffer: BufferWriter): void {
    const data = new ArrayBuffer(8);
    new DataView(data).setFloat64(0, value, false);
    for (const item of new Uint8Array(data)) buffer.Write(8, item);
  }

  Accept(buffer: BufferReader): number {
    const data = new Uint8Array([
      buffer.Read(8),
      buffer.Read(8),
      buffer.Read(8),
      buffer.Read(8),
      buffer.Read(8),
      buffer.Read(8),
      buffer.Read(8),
      buffer.Read(8),
    ]).buffer;

    return new DataView(data).getFloat64(0, false);
  }

  Confirm(value: unknown): value is number {
    return typeof value === "number";
  }
}
