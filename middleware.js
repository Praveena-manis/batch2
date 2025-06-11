import jwt from 'jsonwebtoken';
const SECRETKEY='1234567890abcdefgh'

//verify using HTTP headers
const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token)
        return res.status(403).send({message:"Unauthorized access"})
    const ogToken=token.split(' ')[1];
    if(!ogToken)
        return res.status(403).send({message:"Unauthorized access"})
    try {
        const decodedData=jwt.verify(ogToken,SECRETKEY)
        req.user=decodedData
        req.id=req.params.id
        next();
    } catch (error) {
        return res.status(403).send({message:"Unauthorized access"})
    }
}
export default auth;