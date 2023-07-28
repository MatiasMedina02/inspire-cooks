import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'

// Api backend
import { recipesApi } from "./services/recipesApi";
import { usersApi } from "./services/usersApi";

// Reducers
import userReducer from "./features/authSlice";

const rootReducer = combineReducers({ user: userReducer })

const persistConfig = {
	key: "root",
	storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: {
		persistedReducer,
		[recipesApi.reducerPath]: recipesApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false
		})
			.concat(recipesApi.middleware)
			.concat(usersApi.middleware)
	}
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);