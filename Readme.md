# Moulding Tin

A simple tool to declare and serialise structs using Deno.

Simply:

```TypeScript
import {
  BufferReader,
  BufferWriter,
  Struct,
  ASCII,
  Long,
  Serialised
} from "https://deno.land/x/moulding_tin@LATEST/mod.ts";

const DataType = new Struct({
  a_string: new ASCII(),
  a_big_integer: new Long(),
});

App.onGotData((data: Buffer) => {
  const deserialised = DataType.Accept(new BufferReader(data));

  // Do something with your data
});

export function SendData(data: Serialised<T>) {
  const writer = new BufferWriter();
  DataType.Impart(data, writer);

  App.send(writer.Buffer);
}
```

## Why is this useful?

JSON is pretty large. This library can store an 8 boolean object in one number. This is good for passing data around micro services, storing data on the disk, and many other things of this nature.

## What are the down sides?

You must have a rigid contract. If not then the data will not be readable.
