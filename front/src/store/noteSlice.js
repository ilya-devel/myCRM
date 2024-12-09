import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchNote = createAsyncThunk(
    'note/fetchAuth',
    async (id = '', thunkApi) => {
        try {
            const result = await fetch(
                import.meta.env.VITE_ROOT_URL + 'note/' + id,
                {
                    credentials: 'include'
                })
            if (!result.ok) {
                throw new Error('Возникла проблема при обращении к базе')
            } else {
                // let result = await response.json()
                return await result.json()
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

const initialState = {
    error: null,
    loading: false,
    notes: []
}

const noteSlice = createSlice({
    name: 'noteSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNote.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchNote.fulfilled, (state, action) => {
                state.loading = false,
                state.error = null,
                state.notes = action.payload.notes
            })
            .addCase(fetchNote.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || action.error
            })
    }
});

export const { fetchNoteSuccess, fetchNoteRequest, fetchNoteFailure } = noteSlice.actions

export default noteSlice.reducer