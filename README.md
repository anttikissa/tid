# tid - Typed ID

Here's an example TID:

`u1h9e80ge8vjg17agt`

It consists of :

`u` - 6 bits type (one of characters `[0-9a-zA-Z]`), indicating that it's a user ID

`1h9e80ge8` - 45 bits 1-millisecond precision UNIX timestamp, base32 encoded

`vjg17agt` - 40 bits random data, base32 encoded

The Base32 encoding uses the lowercase variant of the Crockford Base32 alphabet. Lowercase fits in smaller space (when using a proportional font), has
fewer opportunities for confusion (G, B and, Q could be confused with 6, 8, and 0),
and is slightly easier to type.

Every TID is typed, so you can recognize the type of the ID by the first character. This lets you omit
the type in for example URLs:

https://example.com/u1h9e8v5x32p0yvgx6 will refer to a **u**ser with ID `u1h9e8v5x32p0yvgx6`, and
https://example.com/w1h9e8whyz30xkgw6d will refer to a **w**orkspace with id `w1h9e8whyz30xkgw6d`.

If you run out of types or wish to have untyped IDs, just use '0' as the type.

You can have as much randomness as you want - for many practical purposes 40 bits is probably enough, but you can use
more if you like (up to 75 bits).

`a1h9e9f0qtfrs9w0x` - an id using 40 bits of randomness

`a1h9e9g1w8ste0gezhnbthfr` - an id with full 75 bits of randomness

The short ids are equivalent to zero-padded long ids: `a1h9e9f0qtfrs9w0x` has the same bit representation as
`a1h9e9f0qtfrs9w0x0000000`.

## Binary representation

TIDs have a binary representation in case you want to store them in a compact format (such as UUIDs).

(TODO - find out how ULID-UUID conversion works and ensure it works the same way)

## Comments about ULID

