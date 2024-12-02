import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchAuth = createAsyncThunk(
    'auth/fetchAuth',
    async (endPoint = '', thunkApi) => {
        try {
            const response = await fetch('http://localhost:10666/auth/' + endPoint, {
                credentials: 'include'
            })
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
    name: 'authSlice',
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
                state.userInfo = action.payload
            })
            .addCase(fetchAuth.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || action.error
            })
    }
});

export const { fetchAuthSuccess, fetchAuthRequest, fetchAuthFailure } = authSlice.actions

export default authSlice.reducer