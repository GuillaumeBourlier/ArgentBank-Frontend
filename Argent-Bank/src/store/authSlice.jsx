import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "../services/userServices";

// État initial du slice d'authentification
const initialState = {
  token: null,
  id: null,
  email: null,
  userName: null,
  firstName: null,
  lastName: null,
  loading: false,
  error: null,
};

// Action asynchrone pour initialiser l'authentification à partir du token stocké
export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { dispatch, rejectWithValue }) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    // Si token trouvé, on le stocke dans le state login
    if (token) {
      dispatch(login({ token }));
      try {
        const userData = await fetchUser(token);
        // Stocke les infos utilisateur dans le state Redux
        dispatch(
          setUser({
            id: userData.id,
            email: userData.email,
            userName: userData.userName,
            firstName: userData.firstName,
            lastName: userData.lastName,
          })
        );
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        return rejectWithValue(error.response.data);
      }
    }
  }
);

// Création du slice Redux pour l’authentification
const authSlice = createSlice({
  name: "auth", 
  initialState, 
  reducers: {
    // Action pour enregistrer le token dans le state
    login(state, action) {
      state.token = action.payload.token;
    },
    // Action pour enregistrer les infos utilisateur dans le state
    setUser(state, action) {
      const { id, email, userName, firstName, lastName } = action.payload;
      state.id = id;
      state.email = email;
      state.userName = userName;
      state.firstName = firstName;
      state.lastName = lastName;
    },
    // Action spécifique pour changer juste le nom d'utilisateur
    setUserName(state, action) {
      const { userName } = action.payload;
      state.userName = userName;
    },
    // Action pour déconnecter l'utilisateur (reset complet du state)
    logout(state) {
      state.token = null;
      state.id = null;
      state.email = null;
      state.userName = null;
      state.firstName = null;
      state.lastName = null;
      localStorage.removeItem("token"); // Suppression du token dans le stockage local
      sessionStorage.removeItem("token"); // Suppression dans le stockage de session aussi
    },
  },
  extraReducers: (builder) => { // Gestion de l'état de chargement et des erreurs lors de l'initialisation d’authentification de l'utilisateur à partir du token stocké
    builder
      .addCase(initializeAuth.pending, (state) => { // Indique que l'initialisation est en cours
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state) => { // L'initialisation a réussi
        state.loading = false;
      })
      .addCase(initializeAuth.rejected, (state, action) => { // L'initialisation a échoué
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { login, setUser, setUserName, logout } = authSlice.actions;
export default authSlice.reducer;
