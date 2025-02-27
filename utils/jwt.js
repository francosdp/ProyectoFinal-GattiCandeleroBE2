import jwt from 'jsonwebtoken'


export const createToken = (user) => {
    const jwtToken = jwt.sign({ user }, process.env.SECRET_JWT, { expiresIn: '24h' })
    return jwtToken
}

