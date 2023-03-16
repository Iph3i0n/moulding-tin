import ISerialiseable from "./base.ts";
import { BufferWriter, BufferReader } from "./buffer-extra.ts";
import { Buffer } from "../deps.ts";

export default class IBuffer implements ISerialiseable<Buffer> {
  Impart(value: Buffer, buffer: BufferWriter): void {
    buffer.Write(32, value.length);
    for (const byte of value.bytes({ copy: true })) buffer.Write(8, byte);
  }

  Accept(buffer: BufferReader): Buffer {
    const result = new BufferWriter();
    const length = buffer.Read(32);

    for (let i = 0; i < length; i++) result.Write(8, buffer.Read(8));

    return result.Buffer;
  }

  Confirm(value: unknown): value is Buffer {
    return value instanceof Buffer;
  }
}
