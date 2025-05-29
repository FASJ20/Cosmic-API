import bcrypt from "bcrypt";

const saltRounds = 10;

// Exporting a variable to hash a password in the database
export const hashPassword = async (password) => {
  const salt =  bcrypt.genSaltSync(saltRounds);
  let result = await bcrypt.hash(password, salt);
  return result 
};

// Exporting a variable to compare the unhashed password versus the hashed to see whether the password is hashed or not
export const comparePassword = (plain, hashed) =>
  bcrypt.compareSync(plain, hashed);
