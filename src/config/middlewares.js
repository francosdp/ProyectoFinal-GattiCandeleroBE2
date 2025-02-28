export const authorization = (rol) => {
    return async(req,res, next) => {
        console.log("auto", req);
        if(!req.user) return res.status(401).send("No autenticado")
        if(req.user.rol != rol) return res.status(403).send("No autorizado")
        next()
    }
}