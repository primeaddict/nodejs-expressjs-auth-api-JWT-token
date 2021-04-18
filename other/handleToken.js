// TOKEN
const TokenGenerator = require('../utils/token');

const TOKEN_TIME = process.env.TOKEN_TIME;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const TOKEN_BEFORE = process.env.TOKEN_BEFORE;
const TOKEN_ALGO = process.env.TOKEN_ALGO;
const secretKey = TOKEN_SECRET

const option = { algorithm: TOKEN_ALGO, noTimestamp: false, expiresIn: TOKEN_TIME, notBefore: TOKEN_BEFORE }

let tokenGenerator = null;
tokenGenerator = new TokenGenerator(secretKey, option);

function HandleToken() { }
HandleToken.prototype.genrateToken = (payload, optionSign) => {

  try {
    const token = tokenGenerator.sign(payload, optionSign);
    return token;

  } catch (err) {
    throw new Error(err)
  }


}

HandleToken.prototype.verifyToken = (token, optionVerify) => {

  const payload = tokenGenerator.verify(token, optionVerify)
  return payload;

}

HandleToken.prototype.refreshToken = (token, optionRefresh) => {

  try {
    console.log(optionRefresh);
    const refToken = tokenGenerator.refresh(token, optionRefresh);
    return refToken;
  } catch (err) {
    throw new Error(err);
  }

}

HandleToken.prototype.discardToken = () => { }


module.exports = HandleToken;