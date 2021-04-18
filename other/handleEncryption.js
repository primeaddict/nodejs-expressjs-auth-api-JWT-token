const bcrypt = require('bcryptjs');


function HandleEncryption() { }

HandleEncryption.prototype.hashPassword = async (password) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPasswordString = await bcrypt.hash(password, salt);
    return hashedPasswordString;
}

HandleEncryption.prototype.matchPassword = async (password, hashedPasswordStr) => {

    const hashedPasswordString = await bcrypt.compare(password, hashedPasswordStr);
    return hashedPasswordString;
}

module.exports = HandleEncryption;