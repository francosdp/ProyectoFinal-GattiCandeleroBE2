import express from 'express'
import path from 'path'
import { __dirname } from './path.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import passport from 'passport'
import inizializatePassport from './config/passport.config.js'
import { create } from 'express-handlebars'
import cartRouter from './routes/carts.routes.js'
import sessionRouter from './routes/session.routes.js'
import productRouter from './routes/products.routes.js'
import cookieParser from 'cookie-parser'









const app = express()
const PORT = 9090
const hbs=create()



app.use(express.json())
app.use(cookieParser())
app.use(session({
store:MongoStore.create({
    mongoUrl: "mongodb+srv://Franco:fransdp.atlas@cluster0.ei50y.mongodb.net/BackEnd2?retryWrites=true&w=majority&appName=Cluster0",
    mongoOptions:{},
    ttl:15
}),
secret:'SessionSecret',
resave:true,
saveUninitialized:true
}))

mongoose.connect("mongodb+srv://Franco:fransdp.atlas@cluster0.ei50y.mongodb.net/BackEnd2?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("DB ON"))
.catch((e)=>console.log("Error to DB: ", e))


inizializatePassport()
app.use(passport.initialize())
app.use(passport.session())





app.engine(`handlebars`, hbs.engine)
app.set('view engine','handlebars')
app.set(`views`, path.join(__dirname,'views'))





app.use(express.static(path.join(__dirname ,"public")))

app.use('/api/sessions',sessionRouter)
app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)





app.get('/', (req,res)=>{
    res.status(200).send("Hola desde el Servidor")
})

app.listen(PORT, ()=>{
    console.log(`Servidor ejecutado en puerto ${PORT}`)
})