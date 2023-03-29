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
  Buffer as BufferSchema,
  DateTime,
} from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { Buffer } from "./deps.ts";

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

Deno.test("Builds a buffer", () => {
  const schema = new Struct({
    data: new BufferSchema(),
    name: new ASCII(),
  });

  const data_bytes = [1, 2, 3, 4];

  const result = Read(
    schema,
    Write(schema, { data: new Buffer(data_bytes), name: "Test Name" })
  );

  assertEquals([...result.data.bytes()], data_bytes);
  assertEquals(result.name, "Test Name");
});

Deno.test("Parses time", () => {
  const schema = new Struct({
    now: new DateTime(),
  });

  const now = new Date();

  const result = Read(schema, Write(schema, { now }));

  assertEquals(result.now.getTime(), now.getTime());
});
