const jwt = require('jsonwebtoken');

function TokenGenerator(secretKey, options) {
  this.secretKey = secretKey;
  this.options = options; //algorithm + keyid + noTimestamp + expiresIn + notBefore
}

TokenGenerator.prototype.sign = function (payload, signOptions) {
  const jwtSignOptions = Object.assign({}, signOptions, this.options);
  return jwt.sign(payload, this.secretKey, jwtSignOptions);
}

// refreshOptions.verify = options you would use with verify function
// refreshOptions.jwtid = contains the id for the new token
TokenGenerator.prototype.refresh = function (token, refreshOptions) {
  console.log(this.secretKey);
  try {
    const payload = jwt.verify(token, this.secretKey, refreshOptions.verify);
    console.log(payload);
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
    const jwtSignOptions = Object.assign({}, this.options);
    // const jwtSignOptions = Object.assign({}, this.options, { jwtid: refreshOptions.jwtid });
    // The first signing converted all needed options into claims, they are already in the payload
    return jwt.sign(payload, this.secretKey, jwtSignOptions);

  } catch (err) {

    throw new Error(err);
  }
}

// refreshOptions.verify = options you would use with verify function
// refreshOptions.jwtid = contains the id for the new token
TokenGenerator.prototype.verify = function (token, verifyOptions) {

  try {
    const payload = jwt.verify(token, this.secretKey, verifyOptions);
    return payload;

  } catch (err) {
    throw new Error(err);
  }
}


module.exports = TokenGenerator;











// BACKUP

// const jwt = require('jsonwebtoken');

// function TokenGenerator(secretOrPrivateKey, secretOrPublicKey, options) {
//   this.secretOrPrivateKey = secretOrPrivateKey;
//   this.secretOrPublicKey = secretOrPublicKey;
//   this.options = options; //algorithm + keyid + noTimestamp + expiresIn + notBefore
// }

// TokenGenerator.prototype.sign = function (payload, signOptions) {
//   const jwtSignOptions = Object.assign({}, signOptions, this.options);
//   return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
// }

// // refreshOptions.verify = options you would use with verify function
// // refreshOptions.jwtid = contains the id for the new token
// TokenGenerator.prototype.refresh = (token, refreshOptions) => {

//   try {
//     const payload = jwt.verify(token, this.secretOrPublicKey, refreshOptions.verify);
//     console.log(payload);
//     delete payload.iat;
//     delete payload.exp;
//     delete payload.nbf;
//     delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
//     const jwtSignOptions = Object.assign({}, this.options);
//     // const jwtSignOptions = Object.assign({}, this.options, { jwtid: refreshOptions.jwtid });
//     // The first signing converted all needed options into claims, they are already in the payload
//     return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);

//   } catch (err) {
//     throw new Error(err);
//   }
// }

// // refreshOptions.verify = options you would use with verify function
// // refreshOptions.jwtid = contains the id for the new token
// TokenGenerator.prototype.verify = (token, verifyOptions) => {

//   try {
//     const payload = jwt.verify(token, this.secretOrPublicKey, verifyOptions);

//     return payload;

//   } catch (err) {
//     throw new Error(err);
//   }
// }


// module.exports = TokenGenerator;