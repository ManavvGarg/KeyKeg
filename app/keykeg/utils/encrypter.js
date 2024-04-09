// Includes crypto module
const crypto = require("crypto");

// Defining algorithm
const algorithm = "aes-256-cbc";

// Defining key
const key = crypto.randomBytes(32);

// Defining iv
const iv = crypto.randomBytes(16);

// An encrypt function
function encryptData(text) {
  // Creating Cipheriv with its parameter
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);

  // Updating text
  let encrypted = cipher.update(text);

  // Using concatenation
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  let finData = encrypted.toString("hex");
  // Returning iv and encrypted data
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

// A decrypt function
function decryptData(text, iv2) {
  let iv = Buffer.from(iv2, "hex");
  let encryptedText = Buffer.from(text, "hex");

  // Creating Decipher
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);

  // Updating encrypted text
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // returns data after decryption
  return decrypted.toString();
}

export { encryptData, decryptData };
