import ISerialiseable from "./base.ts";
import { BufferWriter, BufferReader } from "./buffer-extra.ts";

export default class Sequence<T> implements ISerialiseable<Array<T>> {
  #structure: ISerialiseable<T>;

  constructor(structure: ISerialiseable<T>) {
    this.#structure = structure;
  }

  Impart(value: Array<T>, buffer: BufferWriter): void {
    buffer.Write(1, value.length ? 1 : 0);
    for (let i = 0; i < value.length; i++) {
      this.#structure.Impart(value[i], buffer);
      buffer.Write(1, i < value.length - 1 ? 1 : 0);
    }
  }

  Accept(buffer: BufferReader): Array<T> {
    const result: Array<T> = [];
    while (buffer.Read(1)) result.push(this.#structure.Accept(buffer));

    return result;
  }

  Confirm(value: unknown): value is T[] {
    return Array.isArray(value) && !value.find(this.#structure.Confirm);
  }
}
