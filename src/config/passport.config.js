import 'dotenv/config'
import passport from "passport";
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import jwt from 'passport-jwt'
import { hash, PassValidation } from '../utils/bcrypt.js';
import userModel from "../models/user.model.js";



const localStrat = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieReader = (req) => {
    let jwtToken = null
    if (req && req.cookies) {
        jwtToken = req.cookies['UserLog']
        console.log(req.cookies)
    }
    return jwtToken
}

const inizializatePassport = () => {

    passport.use('register', new localStrat({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
        try {
            const { first_name, last_name, email, password, age } = req.body
            const findUser = await userModel.findOne({ email: email })
            if (!findUser) {
                const user = await userModel.create({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hash(password),
                    age: age
                })
                return done(null, user)
            } else {
                return done(null, false, { message: "El usuario ya existe" })
            }
        } catch (e) {
            console.log("Error de registro", e)
            return done(e)
        }
    }))



    passport.use('login', new localStrat({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username })
            if (user && PassValidation(password, user.password)) {
                return done(null, user)
            } else {
                return done(null,false,{ message: 'Correo o contraseña incorrectos' })
            }
        } catch (e) {
            console.log("Error de Login", e)
            return done(e)
        }
    }))


    passport.use('github', new GitHubStrategy({
        clientID: 'Iv23lieub4qiDEushTBh',
        clientSecret: process.env.SECRET_GITHUB,
        callbackURL: "http://localhost:9090/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {

            let user = await userModel.findOne({ email: profile._json.email })
            if (!user) {
                const user = await userModel.create({
                    first_name: profile._json.name,
                    last_name: " ",
                    email: profile._json.email,
                    password: 'LoggedByGitHub2025',
                    age: 18
                })
                done(null, user)

            } else {
                done(null, user)
            }
        } catch (e) {
            console.log("Error de GitStrat", e)
            done(e)
        }
    }
    ))



    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieReader]),
        secretOrKey: process.env.SECRET_JWT,
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (e) {
            return done(e)
        }
    }))



    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })

}



export default inizializatePassport