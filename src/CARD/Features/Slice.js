import { createSlice } from "@reduxjs/toolkit";
import Product from "../../Api/product";
const initialState={
    cart:[],
    items:Product,
    totalQuantity:0,
    totalPrice:0,
}
 export const cardSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{}
 })
export default cardSlice.reducer
