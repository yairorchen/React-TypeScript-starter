import { itemService } from "../../services/item-service"

export function loadItems() {

    return async (dispatch:any, getState:any) => {
        try {
            const filterBy = getState().itemModule.filterBy
            const items = await itemService.query()
            dispatch({ type: 'SET_ITEMS', items })
            return 'hello'
        } catch (err) {
            console.log('err:', err)
        }
    }
}

// export function loadItems() {

//     return async (dispatch:any, getState:any) => {
//         try {
//             const filterBy = getState().itemModule.filterBy
//             const items = await itemService.query(filterBy)
//             dispatch({ type: 'SET_ITEMS', items })
//             return 'hello'
//         } catch (err) {
//             console.log('err:', err)
//         }
//     }
// }

export function removeItems(itemId: string) {

    return async (dispatch: any) => {
        try {
            const items = await itemService.remove(itemId)
            dispatch({ type: 'REMOVE_ITEM', itemId })
            return 'hello'
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setFilterBy(filterBy: object) {

    return (dispatch: any) => {
        try {
            dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy } })
        } catch (err) {
            console.log('err:', err)
        }
    }
}