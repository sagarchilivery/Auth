import bcrypt from "bcryptjs";

let salt = await bcrypt.genSalt(10);

export function Hasher(password) {
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

export function VerifyPassword(password, hashedPassword) {
  const OG_password = bcrypt.compareSync(password, hashedPassword);
  return OG_password;
}
