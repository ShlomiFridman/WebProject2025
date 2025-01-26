import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { Account, TR_Event } from "@/utils/classes";

// Initial state for the application context
const initialState: AppState = {
    selectedEvent: null,
    loggedAccount: null,
    themeMode: "light"
}

// Type definition for the application state
interface AppState {
    selectedEvent: TR_Event | null; // Selected event data
    loggedAccount: Account | null; // Logged-in account
    themeMode: string; // Current theme mode (e.g., "light" or "dark")
}

// Action types for dispatching state updates
type Action =
    | { type: "SET_SELECTED_EVENT"; payload: TR_Event }
    | { type: "SET_LOGGED_ACCOUNT"; payload: Account | null }
    | { type: "SET_THEME_MODE"; payload: string };

// Reducer function to manage state updates based on the action type
const tr_reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "SET_SELECTED_EVENT":
            return { ...state, selectedEvent: action.payload };

        case "SET_LOGGED_ACCOUNT":
            return { ...state, loggedAccount: action.payload };

        case "SET_THEME_MODE":
            return { ...state, themeMode: action.payload };

        default:
            return state;
    }
}

// Context definition for application state and dispatch
const TR_Context = createContext<{
    state: AppState;
    dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode; // Children components passed to the provider
}

// AppProvider component to wrap the application and provide context values
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(tr_reducer, initialState); // Initialize state with the reducer

    return (
        <TR_Context.Provider value={{ state, dispatch }}>
            {children} {/* Provide state and dispatch to children */}
        </TR_Context.Provider>
    );
};

// Custom hook to access the context
export const useAppContext = () => {
    const context = useContext(TR_Context);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider'); // Ensure context is used within provider
    }
    return context;
};
