import { Item } from "../../services/item-service"

interface INITIAL_STATE_ {
    items: Item[];
    filterBy: {id: string}
}

const INITIAL_STATE: INITIAL_STATE_ = {
    items: [],
    filterBy: {
        id: '',
    }
}


export function itemReducer(state:any = INITIAL_STATE , action:any) {

    switch (action.type) {
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.items
            }
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items , action.item]
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter((item: Item) => item._id !== action.itemId)
            }
        case 'UPDATE_CASE':
            return {
                ...state,
                items: state.items.map((item: Item) => item._id === action.item._id ? action.item : item)
            }
        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: {...action.filterBy}
            }

        default:
            return state
    }
}