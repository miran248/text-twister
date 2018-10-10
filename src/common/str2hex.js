// Both methods are throwable!

export const fromHex = (hex) => decodeURIComponent(hex.match(/.{1,2}/g).map(
  (hex) => String.fromCharCode(parseInt(hex, 16))
).join(""));

export const toHex = (string) => encodeURIComponent(string).split("").map(
  (char) => char.charCodeAt(0).toString(16)
).join("");
