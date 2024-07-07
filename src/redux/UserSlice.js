import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

// Action de déconnexion
export const Logout = createAction("user/logout");

// Thunk pour POST les informations de connexion et obtenir le token
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ userCredentials, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        userCredentials
      );
      const log = response.data.body;

      if (rememberMe) {
        localStorage.setItem("token", log.token);
      } else {
        sessionStorage.setItem("token", log.token);
      }

      return log;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk pour récupérer les informations de l'utilisateur
export const UserInformations = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue('Token not found');
      }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        config
      );
      const log = response.data.body;
      return log;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk pour modifier le nom d'utilisateur
export const changeName = createAsyncThunk(
  "updateName",
  async (userName, { rejectWithValue }) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { userName },
        config
      );
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice pour gérer les actions et les évolutions du state global
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
    token: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(UserInformations.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserInformations.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(UserInformations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(Logout, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(changeName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeName.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(changeName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default userSlice.reducer;
