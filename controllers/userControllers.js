const User = require("../models/usermodel");
const bcrypt = require("bcrypt");

exports.LoginUser = async (req, resp) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return resp.status(400).send({
        success: false,
        message: "User not found",
      });
    }
    if(user){
      bcrypt.compare(password, user.password,(err,res)=>{
        if(res){
          return resp.status(200).send({
            success:true,
            message:"Login Successfull",
            user,
          });
        }
        else{
          return resp.status(200).send({
            success:false,
            message:"Inavalid i'd or password",
            user
          });
        }
      })
    }
    else{
      return resp.status(400).send({
        success:false,
        message:"Invalid Account",
        user
      });
    }
    
  } catch (error) {
    return resp.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

exports.RegisterUser = async (req, resp) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return resp.status(400).send({
        success: false,
        message: "Every Field is required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return resp.status(200).send({
        success: false,
        account: "exist",
        message: "User already exist",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hash });
    await newUser.save();
    return resp.status(200).send({
      success: true,
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    return resp.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
