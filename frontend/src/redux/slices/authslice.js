import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
// slice - piece of store , createAsyncThunk -- involved in API call ,  axios takes time , redux need to handle loading 
// succcess , errro so it is used for async opertaion 
import axios from "axios"

const userfromstorage = localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null
// if userinfo exist .. convert that string to obj else null ... 

const initialguestid = localStorage.getItem("guestId")|| `guest_${new Date().getTime()}`
// if guestid is present okay else generate 
localStorage.setItem("guestId" , initialguestid)

const initialState = {
    user:userfromstorage,
    guestId:initialguestid,
    loading:false,
    error:null
}

export const loginuser = createAsyncThunk("auth/loginUser" , async(userData, {rejectWithValue})=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login/` , userData) // sending userdata coming from 
        // login form 
        localStorage.setItem("userInfo" , JSON.stringify(response.data.user))  // storing data 
        localStorage.setItem("userToken" , response.data.token) // storing token 
        return response.data.user
    } 
    catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const registeruser = createAsyncThunk("auth/registerUser" , async(userData, {rejectWithValue})=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register` , userData) // sending userdata coming from 
        // register form 
        localStorage.setItem("userInfo" , JSON.stringify(response.data.user))  // storing data 
        localStorage.setItem("userToken" , response.data.token) // storing token 
        return response.data.user
    } 
    catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})

// reducers sirf synchronous state updates ke liye hain.
// loginUser aur registerUser async API calls karte hain,
// isliye unke pending, fulfilled aur rejected actions extraReducers me handle kiye jate hain.

const authslice = createSlice({
    name:"auth" , 
    initialState,
    reducers:{    
        logout:(state)=>{
            state.user=null,
            state.guestId=`guest_${new Date().getTime()}`,
            localStorage.removeItem("userInfo"),
             localStorage.removeItem("userToken"),
              localStorage.setItem("guestId" , state.guestId) // set new guestid 

        },
        generateNewGuestId:(state)=>{
            state.guestId=`guest_${new Date().getTime()}`
            localStorage.setItem("guestId" , state.guestId)
        }
    },
    
    extraReducers:(builder)=>{
        builder
        .addCase(loginuser.pending, (state)=>{
            state.loading=true,
            state.error = null
        })
        .addCase(loginuser.fulfilled, (state , action)=>{
            state.loading=false,
            state.user = action.payload
        })
        .addCase(loginuser.rejected, (state, action)=>{
            state.loading=false,
            state.error = action.payload.message
        })
        .addCase(registeruser.pending, (state)=>{
            state.loading=true,
            state.error = null
        })
        .addCase(registeruser.fulfilled, (state , action)=>{
            state.loading=false,
            state.user = action.payload
        })
        .addCase(registeruser.rejected, (state, action)=>{
            state.loading=false,
            state.error = action.payload.message
        })
    }
})


export const {logout , generateNewGuestId} = authslice.actions;
export default authslice.reducer
