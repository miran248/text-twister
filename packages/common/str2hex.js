// Both methods are throwable!

export const fromHex = (hex) => new Uint8Array(hex.match(/.{1,2}/g).map(
  (hex) => parseInt(hex, 16)
));

export const toHex = (byteArray) => Array.prototype.reduce.call(
  byteArray,
  (memo, byte) => memo + (byte & 0xFF).toString(16).padStart(2, "0"),
  ""
);
