import 'dotenv/config'
import express from 'express'
import path from 'path'
import { __dirname } from './path.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import passport from 'passport'
import inizializatePassport from './config/passport.config.js'
import { create } from 'express-handlebars'
import indexRouter from './routes/index.routes.js'
import cookieParser from 'cookie-parser'









const app = express()
const PORT = 9090
const hbs=create()



app.use(express.json())
app.use(cookieParser(process.env.SECRET_COOKIE))
app.use(session({
store:MongoStore.create({
    mongoUrl: process.env.URL_MONGO,
    mongoOptions:{},
    ttl:15000000 // El TTL lo dejé asi para realizar tests sin la necesidad de relogear cada 2 min
}),
secret:process.env.SECRET_SESSION,
resave:true,
saveUninitialized:true
}))

mongoose.connect(process.env.URL_MONGO)
.then(()=>console.log("DB ON"))
.catch((e)=>console.log("Error to DB: ", e))


inizializatePassport()
app.use(passport.initialize())
app.use(passport.session())





app.engine(`handlebars`, hbs.engine)
app.set('view engine','handlebars')
app.set(`views`, path.join(__dirname,'views'))





app.use(express.static(path.join(__dirname ,"public")))
app.use('/',indexRouter)




app.get('/', (req,res)=>{
    res.status(200).render("templates/landing")
})

app.listen(PORT, ()=>{
    console.log(`Servidor ejecutado en puerto ${PORT}`)
})