const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

const loginAdmin = asyncHandler (async (req,res)=>{
    const{userName, Password} = req.body;
    console.log("typeof username",typeof userName);
    console.log("typeof password", typeof Password);
    if(!userName || !Password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
      // Retrieve credentials from environment variables
      const envUsername = process.env.user;
      const envPassword = process.env.pass;

      //console.log("envpass is",typeof envPassword);
      //console.log("envusername is",typeof envUsername);
      // Compare credentials
      console.log(`comparing ${userName} with ${envUsername} and ${envPassword} with ${Password}`)
      if (userName.trim() === envUsername.trim() && Password.trim() === envPassword.trim()) {
        // Credentials match - provide access token
         // console.log("creds match");
          const accessToken = jwt.sign({
            admin :{
                userName,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1d"}
          );
          res.status(200).json({accessToken});
          //const token = jwt.sign({ userName }, process.env.JWT_SECRET, { expiresIn: '1d' });
        }else{
            //console.log("creds dont match");
            res.status(404)
            throw new Error("username or password is not valid");
        }
    //res.json({message : "login user"});
});

module.exports = { loginAdmin };