import { Router } from "express";
import User from "../model/user.js";
import List from "../model/list.js";

const router = Router();
//create
router.post("/addTask" , async (req,res) => {
    try {
          const {title , body , id } = req.body;
    const existingUser = await User.findById(id)
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

//update
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const list = await List.findByIdAndUpdate(
        req.params.id,
        { title, body },
        { new: true } // updated document return karega
      );

      if (!list) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json({ message: "Task Updated", list });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOneAndUpdate({email},{$pull:{list:req.params.id}})

    if (existingUser) {
      await List.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Task Deleted" });
    }
  } catch (error) {
    console.error(error);
   
  }
});


//get Task
router.get("/getTasks/:id", async (req,res) => {
  const list =  await List.find({user: req.params.id}).sort({createdAt: -1})
  if(list.length !== 0){
    res.status(200).json({ list: list})
  }
  else{
 res.status(200).json({ message: "No Tasks" })
  }
});







export default router;