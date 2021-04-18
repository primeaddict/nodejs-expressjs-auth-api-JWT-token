

const HandleAuth = (req, res, next) => {

    if (!req.headers['x-access-token']) {
        next(new Error("No token found!"));
    }

    const token = req.headers['x-access-token'];

    // next(new Error(token));
    next();
}

module.exports = HandleAuth;