const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validationToken = asyncHandler (async (req,res,next)=>{
    let token;
    let authHeader  = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(404);
                throw new Error("User is not authorized");
            }
            console.log(decoded);
            req.admin = decoded.admin;
            next();
        });
        if(!token){
            res.status(404);
            throw new Error("User is not authorized / token missing");
        }
    }
});

module.exports = validationToken;