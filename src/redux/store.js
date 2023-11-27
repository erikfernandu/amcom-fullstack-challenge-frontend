import { configureStore } from '@reduxjs/toolkit';
import { titleReducer, sidebarReducer } from './reducer';

const store = configureStore(
    {
        reducer: {
            title: titleReducer,
            sidebar: sidebarReducer,
        },
    }
);

export default store;