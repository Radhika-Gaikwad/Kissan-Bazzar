
import userModel from "../models/userModel.js"

//add item to use cart
const addToCart = async(req, res)=>{
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if(!cartData[req.body.itemId])
    {
      cartData[req.body.itemId] = 1;
    }
    else{
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, {cartData});
    res.json({success:true, messeage: "Added To Cart"})
  } catch (error) {
    console.log(error);
    res.json({success:false, messeage: "Error"})
  }
}

// remove items from the cart
const removeFromCart = async (req, res)=>{
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId]>0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true, messeage:"Removed From the Cart"})
  } catch (error) {
    console.log(error);
    res.json({success:false, messeage:"Error"})
  }
}

//fetch user cart data
const getCart = async (req, res)=>{
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({success: true, cartData})
  } catch (error) {
    console.log(error);
    res.json({success:false,messeage:"Error"})
  }

}

export {addToCart, removeFromCart, getCart}