import ISerialiseable from "./base.ts";
import { BufferWriter, BufferReader } from "./buffer-extra.ts";

export default class DateTime implements ISerialiseable<Date> {
  Impart(value: Date, buffer: BufferWriter): void {
    buffer.Write(32, value.getTime());
  }

  Accept(buffer: BufferReader): Date {
    return new Date(buffer.Read(32));
  }

  Confirm(value: unknown): value is Date {
    return value instanceof Date;
  }
}
