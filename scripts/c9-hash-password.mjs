// Usage: node scripts/c9-hash-password.mjs "your admin password"
// Prints the value for C9_ADMIN_PASSWORD_HASH. The password itself is never stored.
import { randomBytes, scryptSync } from 'node:crypto';
const pw = process.argv[2];
if (!pw) { console.error('Usage: node scripts/c9-hash-password.mjs "your admin password"'); process.exit(1); }
const salt = randomBytes(16);
console.log(`scrypt$${salt.toString('base64url')}$${scryptSync(pw, salt, 64).toString('base64url')}`);
console.log('\nAlso set C9_SESSION_SECRET to:', randomBytes(32).toString('base64url'));
