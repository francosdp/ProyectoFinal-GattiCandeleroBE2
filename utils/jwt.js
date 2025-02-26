import jwt from 'jsonwebtoken'

let secretKey = "usersecret"

export const createToken = (user) => {
    const jwtToken = jwt.sign({ user }, secretKey, { expiresIn: '24h' })
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