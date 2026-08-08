import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


    export const fetchallorders = createAsyncThunk("adminorders/fetchallorders" , async( _, 
    {rejectWithValue}
)=>{
        try {
           const response =  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/order`
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

    export const updateorderstatus = createAsyncThunk("adminorders/updateorderstatus" , async( {id , status}, 
    {rejectWithValue}
)=>{
        try {
           const response =  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/order/${id}` , {status}
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

        export const deleteorder = createAsyncThunk("adminorders/deleteorder" , async( id, 
    {rejectWithValue}
)=>{
        try {
             await axios.delte(`${import.meta.env.VITE_BACKEND_URL}/api/admin/order/${id}` , 
         
           {
  headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
           }
        )
        return   id
        } 
        catch (error) {
            console.error(error)
            return  rejectWithValue(error.response.data)
        }
    })


    const adminorderslice = createSlice({
                name:"adminorders" , 
                initialState:{
                   orders:[],
                   totalorders : 0,
                   totalsales:0,
                    loading:false ,
                    error:null
                } ,
                reducers:{},
                extraReducers:(builder)=>{
          builder
                .addCase(fetchallorders.pending , (state)=>{
                    state.loading = true 
                    state.error = null
                })
                .addCase(fetchallorders.fulfilled , (state , action)=>{
                    state.loading = false 
                    state.orders= action.payload
                    state.totalorders = action.payload.length

                    const totalsales = action.payload.reduce((acc, order)=>{
                        return acc+order.totalprice
                    } , 0)
                   state.totalsales = totalsales
                })

                .addCase(fetchallorders.rejected , (state, action)=>{
                    state.loading = false 
                    state.error = action.payload.message
                })
    
    
            
                .addCase(updateorderstatus.fulfilled , (state , action)=>{
                    const updatedorder = action.payload
                    const orderindex = state.order.findIndex((order)=>{
                        order._id === updatedorder._id
                    })

                    if(orderindex !==-1){
                        state.orders[orderindex] = updatedorder
                    }
                })
    
                 .addCase(deleteorder.fulfilled , (state , action)=>{
                    state.orders = state.orders.filter((order)=>order._id !==action.payload)
                })
     }
        
            })
        export default adminorderslice.reducer