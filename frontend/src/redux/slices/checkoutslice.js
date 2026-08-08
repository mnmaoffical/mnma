import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

  export const createcheckout = createAsyncThunk("checkout/createcheckout" , async({ 
        checkoutdata 
    } , 
    {rejectWithValue}
)=>{
        try {
           const response =  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`, checkoutdata
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

    const checkoutslice = createSlice({
        name:"checkout" , 
        initialState:{
            checkout:null,
            loading:false ,
            error:null
        } ,
        reducers:{},
        extraReducers:(builder)=>{
  builder
        .addCase(createcheckout.pending , (state)=>{
            state.loading = true 
            state.error = null
        })
        .addCase(createcheckout.fulfilled , (state , action)=>{
            state.loading = false 
            state.checkout = action.payload
        })
        .addCase(createcheckout.rejected , (state, action)=>{
            state.loading = false 
            state.error =  action.payload?.message || "Something went wrong"
        })

        }

    })

    export default checkoutslice.reducer