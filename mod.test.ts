import {
  Read,
  Write,
  ISerialiseable,
  ASCII,
  Struct,
  Array,
  Union,
  Int,
  Record,
  UTF8,
  UInt,
} from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";

function Perform<TSchema>(schema: ISerialiseable<TSchema>, input: TSchema) {
  return () => {
    const result = Read(schema, Write(schema, input));

    assertEquals(result, input);
  };
}

Deno.test("Performs a basic string", Perform(new ASCII(), "Hello world"));

Deno.test(
  "Performs a complex struct",
  Perform(
    new Struct({
      test: new ASCII(),
    }),
    {
      test: "Hello world",
    }
  )
);

Deno.test(
  "Builds a union",
  Perform(new Array(new Union(new ASCII(), new Int())), ["hello world", 123])
);

Deno.test(
  "Builds a record",
  Perform(new Record(new UTF8(), new UInt()), { test_1: 1, test_2: 4 })
);
