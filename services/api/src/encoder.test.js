import { encodeSessions, decodeSession } from "./encoder";

describe("encoder/encodeSessions", () => {
  const encoded = "080110d4a3efcde62c1a054d6972616e";

  it("is defined", () => {
    expect(encodeSessions).toBeDefined();
  });

  // it("should return Uint8Array instance", () => {
  //   expect(encodeSessions(encoded)).toBeInstanceOf(Uint8Array);
  // });
});

// describe("encoder/decodeSession", () => {
//
// });
