import { Router } from "express";
import User from "../model/user.js";
import List from "../model/list.js";
const router = Router();

router.post("/addTask" , async (req,res) => {
    try {
          const {title , body , email} = req.body;
    const existingUser = await User.findOne({ email });
    if(existingUser){
        const list = new List({title,body,user: existingUser})
        await list.save().then(() => res.status(200).json({list}))
        existingUser.list.push(list)
         existingUser.save();
    }
    } catch (error) {
       console.log(error);
       
        
    }

})


















export default router;