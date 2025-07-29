import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const base_url="http://localhost:3000"; // Your backend port

export const adminLogin = createAsyncThunk("adminInfo/adminLogin",
    async (admin, { rejectWithValue }) => {
        try {
            const response = await fetch(`${base_url}/api/auth/admin`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(admin)
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login Failed");
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });


//     export const addingProduct = createAsyncThunk(
//   "addProduct/addingProduct",
//   async (product, { rejectWithValue }) => {
//     try {
//       const res_1 = await fetch(`${base_url}/api/auth/product`, {
//         method: "POST", 
//         body: product,
//       });

//       const data = await res_1.json();

//       if (!res_1.ok) {
//         throw new Error(data.message || "Add Product Failed");
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );



    export const adminSlices=createSlice({
        name:"adminInfo",
        initialState:{
            isLoading:false,
            isAuthenticated:false,
            username:"",
            error:""
        },
        reducers:
        {
            admlogout:(state)=>
            {  
                state.isAuthenticated=false,
                state.username=""
            }
        },
        extraReducers:(builder)=>
        {
            builder
            .addCase(adminLogin.pending,(state)=>
            {
                state.isLoading=true,
                state.error=""
            })
            .addCase(adminLogin.fulfilled,(state,action)=>
            {
                state.isLoading=false,
                state.isAuthenticated=true,
                state.username=action.payload.username,
                state.error=""
            })
             .addCase(adminLogin.rejected, (state, action) => 
            {
                state.isLoading = false;
                state.error = action.payload;
            });
        },
    })

    // export const productSlices=createSlice({
    //     name:"addProduct",
    //     initialState:
    //     {
    //         products:[],
    //         isLoading:false,
    //         error:"",
    //         successmessage:""
    //     },
    //     reducers:
    //     {
    //         success:(state)=>
    //         {
    //             state.successmessage=""
    //             state.error=""
    //         }
    //     },
    //     extraReducers:(builder)=>
    //     {
    //         builder
    //         .addCase(addingProduct.pending,(state)=>
    //         {
    //             state.isLoading=true;
    //             state.error=""
    //         })
    //         .addCase(addingProduct.fulfilled,(state,action)=>
    //         {
    //             state.isLoading=false;
    //             state.error=""
    //             state.products.push(action.payload);
    //             state.successmessage="Product Added Successful"
    //         })
    //         .addCase(addingProduct.rejected,(state,action)=>
    //         {
    //             state.error=action.payload;
    //             state.isLoading=false
    //         })
    //     }
    // })


    export const {admlogout}=adminSlices.actions;
    // export const {success}=productSlices.actions;
    export const adminReducer=adminSlices.reducer;
    




