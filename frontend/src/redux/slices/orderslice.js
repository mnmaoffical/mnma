import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

  export const fetchuserorders = createAsyncThunk("orders/fetchuserorders" , async( _,
    {rejectWithValue}
)=>{
        try {
           const response =  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`, 
           {
  headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
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

    // fetch order details by id 

      export const fetchorderdetails = createAsyncThunk("orders/fetchorderdetails" , async( orderId , 
    {rejectWithValue}
)=>{
        try {
           const response =  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`
         ,
           {
  headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
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


      const orderslice = createSlice({
            name:"orders" , 
            initialState:{
               orders:[],
               totalorders:0,
               orderdetails:null,
                loading:false ,
                error:null
            } ,
            reducers:{},
            extraReducers:(builder)=>{
      builder
            .addCase(fetchuserorders.pending , (state)=>{
                state.loading = true 
                state.error = null
            })
            .addCase(fetchuserorders.fulfilled , (state , action)=>{
                state.loading = false 
                state.orders = action.payload
                 state.totalorders = action.payload.length
            })
            .addCase(fetchuserorders.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.payload.message
            })


            
              .addCase(fetchorderdetails.pending , (state)=>{
                state.loading = true 
                state.error = null
            })
            .addCase(fetchorderdetails.fulfilled , (state , action)=>{
                state.loading = false 
                state.orderdetails = action.payload
            })
            .addCase(fetchorderdetails.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.payload.message
            })
    
            }
    
        })
    
        export default orderslice.reducer;