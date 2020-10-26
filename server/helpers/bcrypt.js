const bcrypt = require('bcrypt');

function hashing(password){
  const hash = bcrypt.hashSync(password, 8);
  return hash
}
function compareSync(password,encryptPass){
  return bcrypt.compareSync(password, encryptPass);
}

module.exports = {hashing,compareSync}