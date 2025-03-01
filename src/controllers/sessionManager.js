import { createToken } from "../utils/jwt.js"
import { PassValidation } from "../utils/bcrypt.js";


export const login = async (req, res) => {
    try {
        if (!req.user) {  
            return res.status(401).send({ message: "Incorrect" });
    }
        const jwtToken = createToken(req.user)
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }
       



        res.status(200).cookie('UserLog', jwtToken, {
            httpOnly: true,
            secure: false,
            maxAge: 864000000
        }).send({message:"Logueado"})


    } catch (e) {
        console.log("Error en Manager Login", e)
        res.status(500).send("Error al loguear")
    }
}

export const register = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send({message:"El usuario ya se encuentra registrado"})
        }
        return res.status(201).send({message:"Te has registrado con éxito"})
    } catch (e) {
        console.log("Error en Manager Register", e)
        res.status(500).send({message:"Error al registrar el usuario"})
    }
}

export const gitHubLogin = (req, res) => {
    try {
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }
        const jwtToken=createToken()
        res.status(200).cookie('UserLog', jwtToken, {
            httpOnly: true,
            secure: false,
            maxAge: 8640000
        }).redirect('/api/products')
    } catch (e) {
        console.log("Error en Manager GitHub", e)
        res.status(500).send("Error al ingresar vía GitHub")
    }
}


export const viewRegister = (req, res) => {
    res.status(200).render('templates/register', {
        title:"Registrarse",
        url_js: "/js/register.js",
        url_css: "/css/main.css"
    })
}

export const viewLogin = (req, res) => {
    res.status(200).render('templates/login', {
        title:"Iniciar Sesion",
        url_js: "/js/login.js",
        url_css: "/css/main.css"
    })
}

export const userPlatform =(req,res)=>{
res.status(200).render('templates/userplatform',{
    title:"BackOffice",
    url_js:"/js/userplatform",
    url_css:"/css/main.css"
})
}