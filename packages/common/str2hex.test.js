import { fromHex, fromHex2, toHex } from "./str2hex";

describe("str2hex/fromHex", () => {
  const encoded = "080110d4a3efcde62c1a054d6972616e";

  it("is defined", () => {
    expect(fromHex).toBeDefined();
  });

  it("should return Uint8Array instance", () => {
    expect(fromHex(encoded)).toBeInstanceOf(Uint8Array);
  });
});

// describe("str2hex/toHex", () => {
//
// });
