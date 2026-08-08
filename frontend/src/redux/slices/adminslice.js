import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"


      export const fetchusers = createAsyncThunk("admin/fetchusers", async (_, { rejectWithValue }) => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("userToken")}`
            }
          });
          return response.data;
        } catch (error) {
          console.error("Fetch users error:", error);
          return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
        }
      })


      
      export const adduser = createAsyncThunk("admin/adduser" , async( userdata, 
    {rejectWithValue}
)=>{
        try {
           const response =  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users` , userdata
         ,
           {
  headers:{
                Authorization:`Bearer ${localStorage.getItem("token") || localStorage.getItem("userToken")}`
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

       export const updateuser = createAsyncThunk("admin/updateuser" , async( {id , name , email, role} 
    
)=>{
           const response =  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}` , {name , email , role}
         ,
           {
  headers:{
                Authorization:`Bearer ${localStorage.getItem("token") || localStorage.getItem("userToken")}`
            }
           }
        )
        return   response.data     
    })

  export const deleteuser = createAsyncThunk(
  "admin/deleteuser",
  async (id) => {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("userToken")}`,
        },
      }
    );

    return id;
  }
);

  const adminslice = createSlice({
            name:"admin" , 
            initialState:{
               users:[],
                loading:false ,
                error:null
            } ,
            reducers:{},
            extraReducers:(builder)=>{
      builder
            .addCase(fetchusers.pending , (state)=>{
                state.loading = true 
                
            })
            .addCase(fetchusers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Handle both plain array and wrapped object responses
                state.users = Array.isArray(action.payload)
                  ? action.payload
                  : action.payload?.users || [];
            })
            .addCase(fetchusers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })


              .addCase(updateuser.fulfilled , (state , action)=>{
              const updateduser = action.payload.user
              const userindex  = state.users.findIndex((user)=>user._id ===updateduser._id)
              if(userindex !==-1){
                state.users[userindex] = updateduser
              }
                 
            })


                       .addCase(deleteuser.fulfilled , (state , action)=>{
            state.users= state.users.filter((user)=>user._id !==action.payload)
                 
            })

         
                       .addCase(adduser.pending , (state)=>{
            state.loading = true
            state.error = null
                 
            })
    
                  .addCase(adduser.fulfilled , (state , action)=>{
            state.loading = false 
            state.users.push(action.payload.specificadmin)
                 
            })
                 .addCase(adduser.rejected , (state , action)=>{
            state.loading = false 
            state.error = action.payload?.message
                 
            })




            }
    
        })

        export default adminslice.reducer
    
