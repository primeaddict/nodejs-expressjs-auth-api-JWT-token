const router = require('express').Router();

// VALIDATOR
const HandleValidation = require('../other/handleValidation');
const handleValidation = new HandleValidation();

// CONTROLLER
const AuthController = require('../controller/authController')
const authController = new AuthController();

// TOKEN AUTH
const handleAuth = require('../other/handleAuth');

//TOKEN HANDLER
const HandleToken = require('../other/handleToken');
const handleToken = new HandleToken();

// ---------------------------------------------------------------------------------------

router.post('/register', async (req, res, next) => {

    const error = handleValidation.registerValidator(req.body);
    if (error) {
        res.status(400).send({ message: error });
        return;
    }

    try {
        const { email } = req.body;

        const userExist = await authController.checkEmail(email);

        if (userExist) return res.status(400).send({ message: "Email already registered." });

        const savedUser = await authController.registerUser(req.body)

        res.status(200).json({ user: savedUser })

    } catch (err) {
        next(new Error(err))
    }
})

router.post('/login', handleAuth, async (req, res, next) => {

    const error = handleValidation.loginValidator(req.body);

    if (error) {
        res.status(400).send({ message: error });
        return;
    }

    try {
        const { error, message } = await authController.loginUser(req.body);
        const status = error ? 500 : 200;
        if (!error) {
            const payload = { user: 'primeaddict' };

            const loginOptions = { audience: 'primeaddict', issuer: 'admin', jwtid: '1', subject: 'LOGIN' }
            const token = handleToken.genrateToken(payload, loginOptions)
            return res.status(status).json({ message, token });

        } else {
            return res.status(status).json({ message });
        }
    } catch (err) {
        next(new Error(err))
    }
})

router.post('/refresh', (req, res, next) => {

    try {
        refreshToken = handleToken.refreshToken(req.body.token, { verify: { audience: 'user', issuer: 'admin' }, jwtid: '1' })
        res.send(refreshToken);
    } catch (err) {
        next(new Error(err));
    }
})

router.post('/verify', (req, res) => {

    const verify = { audience: 'user', issuer: 'admin' }
    verifyPayload = handleToken.verifyToken(req.body.token, verify);
    res.send(payloadf);
})

router.post('/destroy', (req, res) => {
    try {
        res.json("DESTROY TODO");

    } catch (err) {
        next(new Error(err));
    }
});


module.exports = router;


// DEFINATION
// { audience: 'myaud', issuer: 'myissuer', jwtid: '1', subject: 'user' }
// audience: To whom token is assigned
// issuer: The auther of token/ Source
// jwtid: Unique id of token
// subject: The purpose of token link LOGIN, VERIFYUSER, LOGOUT
