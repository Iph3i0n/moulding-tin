// deno-lint-ignore-file no-explicit-any
import ISerialiseable from "./base.ts";
import { BufferWriter, BufferReader } from "./buffer-extra.ts";

type Structured<T extends Record<string, unknown>> = {
  [TKey in keyof T]: ISerialiseable<T[TKey]>;
};

export default class Struct<T extends Record<string, unknown>>
  implements ISerialiseable<T>
{
  #structure: Structured<T>;

  constructor(structure: Structured<T>) {
    this.#structure = structure;
  }

  Impart(value: T, buffer: BufferWriter): void {
    for (const key in this.#structure)
      this.#structure[key].Impart(value[key], buffer);
  }

  Accept(buffer: BufferReader): T {
    const result: any = {};
    for (const key in this.#structure)
      result[key] = this.#structure[key].Accept(buffer);

    return result;
  }

  Confirm(value: unknown): value is T {
    return (
      typeof value === "object" &&
      !Object.keys(this.#structure).find((k) =>
        !this.#structure[k].Confirm((value as any)[k])
      )
    );
  }
}
