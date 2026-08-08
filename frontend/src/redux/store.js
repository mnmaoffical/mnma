import {configureStore} from "@reduxjs/toolkit"
import authreducer from "./slices/authslice.js"  // confused will it be authreducer or authReducer .. 
import productreducer from "./slices/productslice.js"
import cartreducer from "./slices/cartslice.js"
import checkoutreducer from "./slices/checkoutslice.js"
import orderreducer from "./slices/orderslice.js"
import adminreducer from "./slices/adminslice.js"
import adminproductreducer from "./slices/adminproductslice.js"
import adminordersreducer from "./slices/adminorderslice.js"
const store = configureStore({  // create  redux store 
    reducer:{             //changes state  
        auth: authreducer , 
        product: productreducer,
        cart:cartreducer,
        checkout:checkoutreducer,
        orders: orderreducer,
        admin:adminreducer ,
        adminproduct:adminproductreducer,
       adminorders: adminordersreducer
    }  
})
export default store