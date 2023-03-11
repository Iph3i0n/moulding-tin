import ISerialiseable from "./base.ts";
import { BufferWriter, BufferReader } from "./buffer-extra.ts";

export default class Literal<T extends string | number | boolean>
  implements ISerialiseable<T>
{
  #structure: T;

  constructor(structure: T) {
    this.#structure = structure;
  }

  Impart(_1: T, _2: BufferWriter): void {}

  Accept(_: BufferReader): T {
    return this.#structure;
  }

  Confirm(value: unknown): value is T {
    return value === this.#structure;
  }
}
