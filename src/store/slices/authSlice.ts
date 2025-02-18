import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Определяем типы API-ответов
interface AuthResponse {
    token: string;
}

interface UserProfile {
    userId: number;
    username: string;
}

interface AuthState {
    user: UserProfile | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const API_URL = 'http://localhost:8080';

// Определяем типы аргументов для login/register
interface AuthArgs {
    username: string;
    password: string;
}

// Создаём асинхронные экшены
export const login = createAsyncThunk<AuthResponse, AuthArgs, { rejectValue: string }>(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, { username, password });
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Login failed');
        }
    }
);

export const register = createAsyncThunk<AuthResponse, AuthArgs, { rejectValue: string }>(
    'auth/register',
    async ({ username, password}, { rejectWithValue }) => {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, { username, password});
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Registration failed');
        }
    }
);

// export const fetchUserProfile = createAsyncThunk<UserProfile, void, { rejectValue: string }>(
//     'auth/fetchProfile',
//     async (_, { rejectWithValue }) => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get<UserProfile>(`${API_URL}/auth/me`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.error || 'Failed to fetch profile');
//         }
//     }
// );

// Начальное состояние с типами
const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
};

// Создаём slice с типами
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.loading = false;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.loading = false;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Registration failed';
            });
            // .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
            //     state.user = action.payload;
            // });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
