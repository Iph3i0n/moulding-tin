import ISerialiseable from "./base.ts";
import { BufferWriter, BufferReader } from "./buffer-extra.ts";

export default class Empty implements ISerialiseable<never> {
  Impart(_1: never, _2: BufferWriter): void {}

  Accept(_: BufferReader): never {
    return undefined as never;
  }

  Confirm(_: unknown): _ is never {
    return true;
  }
}
