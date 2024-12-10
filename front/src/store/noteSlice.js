import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchFunc } from './fetchFunc'

export const fetchNote = createAsyncThunk(
    'note/fetchNote',
    async (id = '', thunkApi) => {
        try {
            const result = await fetchFunc({ url: 'note/' + id })
            if (!result.ok) {
                if (result.status === 403) {
                    throw new Error('Вы не авторизованы')
                }
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

export const updateNote = createAsyncThunk(
    'note/updateNote',
    async (newNote) => {
        const response = await fetchFunc({
            url: 'note/' + (newNote.id || ''),
            method: newNote.id ? 'PUT' : 'POST',
            body: {
                ...newNote
            }
        })
        const data = await response.json()
        console.log(data)
        return data
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
    reducers: {
        removeNote: (state, action) => {

            fetchFunc({
                url: 'note/' + action.payload.id,
                method: 'DELETE',
            })
            const index = state.notes.indexOf(state.notes.find(i => i._id == action.payload.id))
            if (index != -1) {
                state.notes.splice(index, 1)
            }
        }
    },
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
                console.log(action)
                state.error = action.payload.message || action.error
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.notes = [
                    ...state.notes,
                    action.payload
                ]
            })
    }
});

export const { fetchNoteSuccess, fetchNoteRequest, fetchNoteFailure, removeNote, updateNoteSuccess } = noteSlice.actions

export default noteSlice.reducer