import { Router } from "express";
import passport from "passport";
import { login, register, gitHubLogin, viewLogin, viewRegister, userPlatform, } from '../controllers/sessionManager.js'
import { authorization } from "../config/middlewares.js"


const sessionRouter = Router()


sessionRouter.get('/viewlogin', viewLogin)
sessionRouter.get('/viewregister', viewRegister)
sessionRouter.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.user = user
        next()
        
    })(req, res, next);
},login);

sessionRouter.post('/register', passport.authenticate('register'), register)
sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })
sessionRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), gitHubLogin)
sessionRouter.get('/current', passport.authenticate('jwt'), authorization("Usuario"), async (req, res) => res.send(req.user))
sessionRouter.get('/userplatform',userPlatform)

export default sessionRouter