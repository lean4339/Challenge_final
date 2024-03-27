import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { config } from '../config/index';

const initialState: Session = {
    user: { id: '', name: '', email: '', surname: '' },
    login: { token: '' },
    theme: 'default',
    language: {
        dictionary: config.spanish.dictionary,
        language: config.spanish.language
    },
    logged: false,
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            const { name, surname, email, id } = action.payload;
            state.user.surname = surname;
            state.user.name = name;
            state.user.email = email
            state.user.id = id
        },
        setLogin(state, action) {
            const { token } = action.payload;
            state.login.token = token
        },
        setTheme(state, action) {
            const { theme } = action.payload;
            state.theme = theme
        },
        setLanguage: (state, action) => {
            state.language = action.payload
         },
        setLogged(state, action) {
            const logged = action.payload;
            state.logged = logged
        },
    },
})

export const selectLanguage = (state: RootState) => state.session.language;
export const selectUser = (state: RootState) => state.session.user;
export const selectLogged = (state: RootState) => state.session.logged;
export const { setUser, setLanguage, setLogin, setLogged, setTheme } = UserSlice.actions

export default UserSlice.reducer;