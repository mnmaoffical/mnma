import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";

const loadcartfromstorage = ()=>{
    const storedcart = localStorage.getItem("cart")
    return storedcart? JSON.parse(storedcart): {products:[]}
}

const savecarttostorage = (cart)=>{
    localStorage.setItem("cart" , JSON.stringify(cart))
}

export const fetchcart = createAsyncThunk("cart/fetchcart" , async({userId , guestId} , 
    {rejectWithValue}
)=>{
        try {
           const response =  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
            params:{userId , guestId}
           })
        return   response.data
        } 
        catch (error) {
            console.error(error)
            return  rejectWithValue(error.response.data)
        }
    })

    // add new item to cart 
    export const addtocart = createAsyncThunk("cart/addtocart" , async({productid , quantity , 
        size , color , guestId , userId
    } , 
    {rejectWithValue}
)=>{
        try {
           const response =  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
           productid , quantity,size,color , guestId,userId
           })
        return   response.data
        } 
        catch (error) {
            console.error(error)
            return  rejectWithValue(error.response.data)
        }
    })

    // update quantity of an item 

    export const updatecartitemquantity = createAsyncThunk("cart/updatecartitemquantity" , async({ productid , quantity,  userId , guestId , size , color} , 
    {rejectWithValue}
)=>{
        try {
           const response =  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
            productid , quantity,  userId , guestId , size , color
           })
        return   response.data
        } 
        catch (error) {
            console.error(error)
            return  rejectWithValue(error.response.data)
        }
    })


    // remove an item from cart 

    export const removefromcart = createAsyncThunk(
  "cart/removefromcart",
  async ({ productid, userId, guestId, size, color }, { rejectWithValue }) => {
    try {
         console.log("Request Body:", { productid, userId, guestId, size, color });
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          data: { productid, userId, guestId, size, color }
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

        export const mergecart = createAsyncThunk("cart/mergecart" , async({ 
        guestId , user              // VIDEO - USER ,,, BUT CHECK WHAT IS COMING USER OR USERID FROM BACKEND
        
    } , 
    {rejectWithValue}
)=>{
        try {
           const response =  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/merge`, {
           guestId,user} ,
           {
  headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`
            }
           }
        )
        return   response.data
        } 
        catch (error) {
            console.error(error)
            return  rejectWithValue(error.response.data)
        }
    })

const cartslice = createSlice({
    name:"cart" , 
    initialState:{
        cart:loadcartfromstorage(),
        loading:false , error:null
    },
    reducers:{
        clearcart:(state)=>{
            state.cart = {products :[]}
            localStorage.removeItem("cart")
        }
    },
    extraReducers:(builder)=>{
builder.addCase(fetchcart.pending,(state)=>{
    state.loading = true ,
    state.error = null
})
.addCase(fetchcart.fulfilled,(state , action)=>{
    state.loading = false 
    state.cart = action.payload 
    savecarttostorage(action.payload)
})
.addCase(fetchcart.rejected,(state , action)=>{
    state.loading = false 
    state.error = action.payload?.message  || "Failed to fetch cart"
})



.addCase(addtocart.pending,(state)=>{
    state.loading = true 
    state.error = null
})
.addCase(addtocart.fulfilled,(state , action)=>{
    state.loading = false  
    state.cart = action.payload
    savecarttostorage(action.payload)
})
.addCase(addtocart.rejected,(state , action)=>{
    state.loading = false
    state.error = action.payload?.message  || "Failed to add to  cart"
})




.addCase(updatecartitemquantity.pending,(state)=>{
    state.loading = true 
    state.error = null
})
.addCase(updatecartitemquantity.fulfilled,(state , action)=>{
    state.loading = false  
    state.cart = action.payload,
    savecarttostorage(action.payload)
})
.addCase(updatecartitemquantity
    .rejected,(state , action)=>{
    state.loading = false
    state.error = action.payload?.message  || "Failed to update item quantity"
})


.addCase(removefromcart.pending,(state)=>{
    state.loading = true ,
    state.error = null
})
.addCase(removefromcart.fulfilled,(state , action)=>{
    state.loading = false  
    state.cart = action.payload,
    savecarttostorage(action.payload)
})
.addCase(removefromcart.rejected,(state , action)=>{
    state.loading = false,
    state.error = action.payload?.message  || "Failed to remove from   cart"
})


.addCase(mergecart.pending,(state)=>{
    state.loading = true ,
    state.error = null
})
.addCase(mergecart.fulfilled,(state , action)=>{
    state.loading = false  ,
    state.cart = action.payload,
    savecarttostorage(action.payload)
})
.addCase(mergecart.rejected,(state , action)=>{
    state.loading = false,
    state.error = action.payload?.message  || "Failed to merge  cart"
})
    }

})

export const {clearcart} = cartslice.actions
export default  cartslice.reducer