// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
//
// const API_URL = 'http://localhost:8080/api/games'; // возможно придется поменять
//
// /**
//  * Определяем типы для возвращаемых данных и для аргументов функций.
//  */
// interface AuthResponse {
//     token: string;
// }
//
// interface RegisterArgs {
//     username: string;
//     password: string;
//     role: string;
// }
//
// interface LoginArgs {
//     username: string;
//     password: string;
// }
//
// /**
//  * Опционально определяем тип структуры ошибки,
//  * которую возвращает сервер (например, { error: string }).
//  */
// interface ServerError {
//     error: string;
// }
//
// /**
//  * Определим, какие данные у нас хранятся о пользователе.
//  * В вашем случае на бекенде может быть другая структура.
//  */
// interface User {
//     userId: number;
//     username: string;
//     // Добавьте и другие поля, если нужны
// }
//
// /**
//  * Общий интерфейс для состояния auth-среза.
//  */
// interface AuthState {
//     user: User | null;
//     token: string | null;
//     loading: boolean;
//     error: string | null; // Здесь будем хранить текст ошибки
// }
//
//
//
// // /**
// //  * Thunk для логина.
// //  * Первый generic (AuthResponse) — то, что возвращается при успешном resolve,
// //  * второй (LoginArgs) — аргументы, которые мы передаем при вызове login,
// //  * третий — доп. настройки, где мы указываем, что используем rejectWithValue со значением ServerError | string.
// //  */
// // export const login = createAsyncThunk<AuthResponse, LoginArgs, { rejectValue: ServerError | string }>(
// //     'auth/login',
// //     async ({ username, password }, { rejectWithValue }) => {
// //         try {
// //             const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, { username, password });
// //             // Сохраняем токен
// //             if (typeof window !== 'undefined') {
// //                 localStorage.setItem('token', response.data.token);
// //             }
// //             return response.data; // { token: "..." }
// //         } catch (error: any) {
// //             // Если сервер присылает { error: "Some message" } или строку
// //             if (error.response?.data) {
// //                 return rejectWithValue(error.response.data);
// //             }
// //             return rejectWithValue('Login failed (unknown error)');
// //         }
// //     }
// // );
//
// /**
//  * Thunk для регистрации.
//  */
// export const register = createAsyncThunk<AuthResponse, RegisterArgs, { rejectValue: ServerError | string }>(
//     'auth/register',
//     async ({ username, password, role }, { rejectWithValue }) => {
//         try {
//             const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, {
//                 username,
//                 password,
//                 role,
//             });
//             if (typeof window !== 'undefined') {
//                 localStorage.setItem('token', response.data.token);
//             }
//             return response.data; // { token: "..." }
//         } catch (error: any) {
//             if (error.response?.data) {
//                 return rejectWithValue(error.response.data);
//             }
//             return rejectWithValue('Registration failed (unknown error)');
//         }
//     }
// );
//
// /**
//  * Thunk для получения текущего профиля пользователя.
//  * Возвращаем объект User (или тот объект, который приходит с бэка).
//  */
// export const fetchUserProfile = createAsyncThunk<User, void, { rejectValue: ServerError | string }>(
//     'auth/fetchProfile',
//     async (_, { rejectWithValue }) => {
//         try {
//             const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
//             const response = await axios.get<User>(`${API_URL}/auth/me`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             return response.data; // { userId: 1, username: "...", ... }
//         } catch (error: any) {
//             if (error.response?.data) {
//                 return rejectWithValue(error.response.data);
//             }
//             return rejectWithValue('Failed to fetch user profile');
//         }
//     }
// );
//
//
//
//
//
//
//
// /**
//  * Начальное состояние среза.
//  */
// const initialState: AuthState = {
//     user: null,
//     loading: false,
//     error: null,
// };
//
// /**
//  * Создаем slice.
//  */
// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         logout(state) {
//             state.user = null;
//         },
//         clearError(state) {
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // ============== LOGIN ==============
//             .addCase(login.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
//                 state.loading = false;
//                 state.token = action.payload.token;
//             })
//             .addCase(login.rejected, (state, action) => {
//                 state.loading = false;
//                 // Если это ServerError, то берем action.payload.error
//                 if (action.payload && typeof action.payload === 'object' && 'error' in action.payload) {
//                     state.error = action.payload.error;
//                 } else if (typeof action.payload === 'string') {
//                     state.error = action.payload;
//                 } else {
//                     state.error = 'Login failed (unknown error)';
//                 }
//             })
//
//             // ============== REGISTER ==============
//             .addCase(register.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
//                 state.loading = false;
//                 state.token = action.payload.token;
//             })
//             .addCase(register.rejected, (state, action) => {
//                 state.loading = false;
//                 if (action.payload && typeof action.payload === 'object' && 'error' in action.payload) {
//                     state.error = action.payload.error;
//                 } else if (typeof action.payload === 'string') {
//                     state.error = action.payload;
//                 } else {
//                     state.error = 'Registration failed (unknown error)';
//                 }
//             })
//
//             // ============== FETCH USER PROFILE ==============
//             .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
//                 state.user = action.payload;
//             });
//     },
// });
//
// /**
//  * Экспортируем экшены и редьюсер.
//  */
// export const { logout, clearError } = authSlice.actions;
// export default authSlice.reducer;
