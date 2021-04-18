const User = require('../model/User');

const HandleEncryption =  require('../other/handleEncryption');
const handleEncryption = new HandleEncryption();

function AuthController() { }


AuthController.prototype.checkEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user !== null ? true : false;
    } catch (error) {
        console.log(error + "");
    }
}

AuthController.prototype.getUser = async (email) => {
    return getUser(email);
}

AuthController.prototype.registerUser = async (user) => {

    try {
        const { name, email, password } = user;

        let tempUser = {
            name, email, password: await handleEncryption.hashPassword(password)
        }

        tempUser = new User(tempUser);
        const savedUser = await tempUser.save();
        return savedUser;
    } catch (error) {
        console.log(error + "");
    }

}

AuthController.prototype.loginUser = async (user) => {

    const { email, password } = user;
    const userData = await getUser(email);
    if (userData) {
        const checkedPassword = await handleEncryption.matchPassword(password, userData.password);
        if (checkedPassword) {
            return ({ message: "login success", error: false });

        } else {
            return ({ message: "Wrong password", error: true });

        }
    } else {
        return ({ message: "Wrong Email", error: true });
    }

}

const getUser = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user !== null ? user : null;
    } catch (error) {
        next(new Error(error))
    }

}


module.exports = AuthController;

