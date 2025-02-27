import jwt from 'jsonwebtoken'


export const createToken = (user) => {
    const jwtToken = jwt.sign({ user }, process.env.SECRET_JWT, { expiresIn: '24h' })
    return jwtToken
}

console.log("JWT=" , createToken(
    {
            email:"Franco@mail.com",
            password: "Franco123",
            first_name:"Franco",
            last_name:"Juez",
            age:24
    }
))