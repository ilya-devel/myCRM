import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import process from 'dotenv'
process.config({ path: '../.env' })


export const fetchAuth = createAsyncThunk(
    'auth/fetchAuth',
    async (endPoint, thunkApi) => {
        try {
            const response = await fetch(`${process.env.AUTH_URL}${endPoint}`)
            if (!response.ok) {
                throw new Error('Возникла проблема при обращении к базе')
            } else {
                let result = await response.json()
                return result
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

const initialState = {
    error: null,
    loading: false,
    userInfo: {}
}

const authSlice = createSlice({
    name: authSlice,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                if (action.payload.length === 1) {
                    state.curProduct = action.payload[0]
                } else {
                    state.products = action.payload
                }
            })
            .addCase(fetchAuth.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || action.error
            })
    }
});

export const { fetchAuthSuccess, fetchAuthRequest, fetchAuthFailure } = authSlice.actions

export default authSlice.reducer