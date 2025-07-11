import bcrypt from "bcrypt";

const senhaPura = "123456";
const saltRounds = 10;

bcrypt.hash(senhaPura, saltRounds).then((hash) => {
  console.log("Hash gerado:", hash);
});
