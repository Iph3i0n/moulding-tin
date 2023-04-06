import ISerialiseable, { IBufferReader, IBufferWriter } from "./base.ts";

export default class UTF8 implements ISerialiseable<string> {
  Impart(value: string, buffer: IBufferWriter): void {
    for (const char of value) buffer.Write(32, char.charCodeAt(0));

    buffer.Write(32, 0x00);
  }

  Accept(buffer: IBufferReader): string {
    let result = "";

    while (!result.endsWith(String.fromCharCode(0x00)))
      result += String.fromCharCode(buffer.Read(32));

    return result.substring(0, result.length - 1);
  }

  Confirm(value: unknown): value is string {
    return typeof value === "string";
  }
}
