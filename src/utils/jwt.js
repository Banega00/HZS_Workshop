import jwt from 'jsonwebtoken';

export const jwtSecret = 'dk23dfewe9kfosde';

export function authorizeUser(request, response, next){
    const authHeader = request.headers["authorization"];

    if(!authHeader) return response.status(401).json({message: 'Authorization header missing'});

    const token = authHeader.split(" ")[1];

    if(!token) return response.status(401).json({message: 'Invalid token'});

    try{
        const decoded = jwt.verify(token, jwtSecret);
        response.locals.user = decoded;
        next();
    }catch(error){
        console.log('Invalid JWT');
        return response.status(401).json({message: 'Invalid token'});
    }
}

export function encodeJWT(data){
    return jwt.sign(data, jwtSecret);
}