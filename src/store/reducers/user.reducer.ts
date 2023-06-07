import { User , userService} from "../../services/user-service";

interface INITIAL_STATE {
    users: User[] | [];
    loggedInUser: Promise<User> | null;
}

const INITIAL_STATE: INITIAL_STATE = {
    users: [],
    loggedInUser: userService.getLoggedInUser() || null
}

export function userReducer(state = INITIAL_STATE, action:any) {
    
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: { ...state.users }
            }

        default:
            return state;
    }

}