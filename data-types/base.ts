import { BufferWriter, BufferReader } from "./buffer-extra.ts";

export default interface ISerialiseable<T> {
  Impart(value: T, buffer: BufferWriter): void;
  Accept(buffer: BufferReader): T;

  Confirm(value: unknown): value is T;
}