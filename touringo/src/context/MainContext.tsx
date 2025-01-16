import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { Account, TR_Event } from "@/utils/classes";

const initialState: AppState = {
    selectedEvent: null,
    loggedAccount: null,
    themeMode: "light"
}

interface AppState{
    selectedEvent: TR_Event|null;
    loggedAccount: Account|null;
    themeMode: string;
}
type Action =
    | {type: "SET_SELECTED_EVENT"; payload: TR_Event}
    | {type: "SET_LOGGED_ACCOUNT"; payload: Account|null}
    | {type: "SET_THEME_MODE"; payload: string};

const tr_reducer = (state: AppState, action: Action): AppState => {
        switch (action.type) {            
            case "SET_SELECTED_EVENT":
                return {...state, selectedEvent: action.payload};
            
            case "SET_LOGGED_ACCOUNT":
                return {...state, loggedAccount: action.payload};
                
            case "SET_THEME_MODE":
              return {...state, themeMode: action.payload};
            
            default:
                return state;
        }
}

const TR_Context = createContext<{
    state:AppState,
    dispatch: React.Dispatch<Action>
} | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
  }
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(tr_reducer, initialState);
  
    return (
      <TR_Context.Provider value={{ state, dispatch }}>
        {children}
      </TR_Context.Provider>
    );
  };

export const useAppContext = () => {
    const context = useContext(TR_Context);
    if (!context) {
      throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
  };