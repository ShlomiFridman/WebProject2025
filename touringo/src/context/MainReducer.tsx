import { Action, State } from "@/utils/classes"

export const initialState = {
    data: null,
    selectedEvent: null,
    loggedAccount: null
}

export function reducer(state: State, action: Action) {
        switch (action.type) {
            case "SET_DATA":
                return {...state, data: action.payload};
            
            case "SET_EVENT":
                return {...state, selectedEvent: action.payload};
            
            case "SET_ACCOUNT":
                return {...state, loggedAccount: action.payload};
            
            default:
                return state;
        }
}