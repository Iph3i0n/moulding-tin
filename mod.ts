export { default as Array } from "./data-types/array.ts";
export { default as ASCII } from "./data-types/ascii.ts";
export { default as Bool } from "./data-types/bool.ts";
export { default as Char } from "./data-types/char.ts";
export { default as Double } from "./data-types/double.ts";
export { default as Float } from "./data-types/float.ts";
export { default as Int } from "./data-types/int.ts";
export { default as Long } from "./data-types/long.ts";
export { default as Short } from "./data-types/short.ts";
export { default as Struct } from "./data-types/struct.ts";
export { default as UChar } from "./data-types/u-char.ts";
export { default as UInt } from "./data-types/u-int.ts";
export { default as ULong } from "./data-types/u-long.ts";
export { default as UShort } from "./data-types/u-short.ts";
export { default as UTF8 } from "./data-types/utf-8.ts";
export { default as Empty } from "./data-types/empty.ts";
export { default as DateTime } from "./data-types/date-time.ts";
export { default as Union } from "./data-types/union.ts";
export { default as Intersection } from "./data-types/intersection.ts";
export { default as Literal } from "./data-types/literal.ts";
export { default as Record } from "./data-types/record.ts";
export { default as Buffer } from "./data-types/buffer.ts";
export { default as Optional } from "./data-types/optional.ts";
export type { default as ISerialiseable } from "./data-types/base.ts";

import { BufferReader, BufferWriter } from "./data-types/buffer-extra.ts";
import type ISerialiseable from "./data-types/base.ts";
import { Buffer } from "./deps.ts";

export type Serialised<T> = T extends ISerialiseable<infer A> ? A : never;

export function Write<TSchema>(
  schema: ISerialiseable<TSchema>,
  input: TSchema
) {
  const writer = new BufferWriter();

  if (!schema.Confirm(input))
    throw new Error("Attempting to serialise invalid type");

  schema.Impart(input, writer);

  return writer.Buffer;
}

export function Read<TSchema>(schema: ISerialiseable<TSchema>, buffer: Buffer) {
  const reader = new BufferReader(buffer.bytes({ copy: true }));

  return schema.Accept(reader);
}
