import ISerialiseable from "./base.ts";
import { BufferWriter, BufferReader } from "./buffer-extra.ts";

export default class Long implements ISerialiseable<bigint> {
  Impart(value: bigint, buffer: BufferWriter): void {
    buffer.Write(1, value >= 0 ? 1 : 0);
    let binary_string = value.toString(2);
    while (binary_string.length < 64) binary_string = "0" + binary_string;
    for (let i = 0; i < 64; i++)
      buffer.Write(1, binary_string[i] === "1" ? 1 : 0);
  }

  Accept(buffer: BufferReader): bigint {
    const is_positive = !!buffer.Read(1);
    let data = "0b";
    for (let i = 0; i < 64; i++) data += buffer.Read(1).toString();

    if (is_positive) return BigInt(data);

    return -BigInt(data);
  }

  Confirm(value: unknown): value is bigint {
    return typeof value === "bigint";
  }
}