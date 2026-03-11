const Food=require("../models/Food");
const express=require("express");
const router=express.Router();
const auth=require("../middleware/auth");

router.post("/add", auth,async (req,res)=>{
    try{
        const {foodName,quantity,location,expiryAt,description}=req.body;
        if(!foodName || !quantity || !location || !expiryAt){
            return res.status(404).json({message :"Fillup the required Credentials"});
        }

        if(req.user.role!=="donor"){
            return res.status(403).json({message:"Only donor can donate food"});
        }

        const newFood=await Food.create({foodName,quantity,location,expiryAt, donor: req.user.id});
        res.status(200).json({message:"Food Added Successfully!"});
    }
    catch(err){
         res.status(500).json({message:"Server Error!"});
    }
});

router.get("/allFoods", auth,async (req,res)=>{
    try{
        const foods=await Food.find({
            status:"available",
            expiryAt:{$gt:new Date()}
        }).sort({createdAt:-1}).populate("donor", "name email");
        res.json(foods);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"});
    }
});

router.put("/accept/:id",auth, async (req,res)=>{
    try{
        if(req.user.role!=="ngo"){
            return res.status(403).json({message:"Only NGO'S allowed to claim food"});
        }
        const food=await Food.findById(req.params.id);
        if(!food) {
            return res.status(404).json({message:"Food not found"});
        }
        if(food.status!=="available"){
            return res.status(404).json({message:"Food not available"});
        }
        if(food.expiryAt< new Date()){
            return res.status(400).json({message:"Food Expired"});
        }
        food.status="claimed";
        food.claimedBy=req.user.id;
        await food.save();
        const updatedFood = await Food.findById(food._id)
        .populate("donor", "name email")
        .populate("claimedBy", "name email");
        res.status(200).json({message:"Food claimed successfully!", food :updatedFood});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"});
    }
});

router.put("/edit/:id",auth,async (req,res)=>{
    try{
        const food=await Food.findById(req.params.id);
        if(!food) {
            return res.status(404).json({message:"Food not found"});
        }
        if(req.user.role!=="donor"){
            return res.status(403).json({message:"Only Donor's can edit post"});
        }
        if(food.donor.toString()!=req.user.id){
            return res.status(403).json({message:"Not your post"});
        }
         const { foodName, quantity, location, description, expiryAt } = req.body;
        if (foodName) food.foodName = foodName;
        if (quantity) food.quantity = quantity;
        if (location) food.location = location;
        if (description) food.description = description;
        if (expiryAt) food.expiryAt = expiryAt;

        await food.save();
        res.json({ message: "Food updated successfully", food });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"});
    }
});

router.delete("/delete/:id",auth,async (req,res)=>{
    try{
        const food = await Food.findById(req.params.id);
        if (!food){
            return res.status(404).json({ message: "Food not found" });
        } 
        if (req.user.role !== "donor") {
            return res.status(403).json({ message: "Only donors can delete" });
        }
        if (food.donor.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not your food post" });
        }
        await food.deleteOne();
        res.json({ message: "Food deleted successfully" });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"});
    }
});

router.get("/my-donations", auth, async (req, res) => {
  try {
    if (req.user.role !== "donor") {
      return res.status(403).json({ message: "Only donors allowed" });
    }

    const foods = await Food.find({ donor: req.user.id })
      .sort({ createdAt: -1 })
      .populate("donor", "name email")
      .populate("claimedBy", "name email");

    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});



module.exports=router;
