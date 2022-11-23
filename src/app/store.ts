//Wrapper around basic redux create store function; take a reducer and creates a store
//But it automatically sets up store with right defaults (devtools, thunk middleware);

import { configureStore, } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import {apiSlice} from '../features/dogs/dogsAPISlice'

export const store = configureStore({
    //configure store combines all reducers for us if we pass an object (comibine reducers)
    //could pass in an entire reducer function here 
    reducer: {
        todos: todosReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>{
        return getDefaultMiddleware().concat(apiSlice.middleware);
    }
});

export type AppDispatch = typeof store.dispatch;
//ReturnType built in ts type 
export type RootState = ReturnType<typeof store.getState>;

