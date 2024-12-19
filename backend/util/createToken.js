
const jwt=require('jsonwebtoken')

const createToken=(payload)=>{
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "23h" });
    return token; 
}

module.exports=createToken; 