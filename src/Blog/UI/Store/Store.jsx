import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice"
const store=configureStore({
    reducer:{
        addblogs:UserSlice,
    }
})
 export default store