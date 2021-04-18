### **nodejs-expressjs-auth-api-JWT-token**


>### This repo is small example of API for user's Registration, Login
>### developed in NodeJs using ExpressJs and JWTWebToken

## **Points to note**
1. Used JOI for request body validator.
2. Used CORS for cors.
3. Used BcryptJs for password hashing and verification.
4. Created seperate errorHandler for global error handling.
5. Created separate tokenHandler for token genration, verification, decoding, deleting.
6. Created separate validationHandler to handle all type of handelling logic at one place.

### **User can** 
1. *Regiser*
2. *Login*

### **JWT**
1. *Token Genrated when user logged in.*
2. *API to* **Refresh Token** 


# RUN APPLICATION
|Command     |Purpose                                       |
|------------|----------------------------------------------|
|`npm i`     |run to install all the required library       |
|`npm start` |run to start the application                  |







# **File Structure**

## controller
* [authController.js](.\controller\authController.js)

## model
* [User.js](.\model\User.js)

## routes
* [authRoutes.js](.\routes\authRoutes.js)

## utils
* [errors.js](.\utils\errors.js)
* [token.js](.\utils\token.js)

## other
* [keys/](.\other\keys)
  * [private.key](.\other\keys\private.key)
  * [public.key](.\other\keys\public.key)
* [handleAuth.js](.\other\handleAuth.js)
* [handleEncryption.js](.\other\handleEncryption.js)
* [handleErrors.js](.\other\handleErrors.js)
* [handleToken.js](.\other\handleToken.js)
* [handleValidation.js](.\other\handleValidation.js)


# TODO

- [X] Login, Reister API
- [X] Add JWT for token auth
- [X] Add token refresh
- [X] Seperate All handlers logic at single place
- [ ] Use .key files for public and private key
- [ ] keep tokens in db for security
- [ ] Delete, Disable User
- [ ] Write a good MarkDown file
