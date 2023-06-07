import { userService } from "../../services/user-service"

export function loadUsers() {

    return async (dispatch:any, getState:any) => {
        try {
            const filterBy = getState().userModule.filterBy
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
            return 'hello'
        } catch (err) {
            console.log('err:', err)
        }
    }
}

// export function loadItems() {

//     return async (dispatch:any, getState:any) => {
//         try {
//             const filterBy = getState().userModule.filterBy
//             const users = await userService.query(filterBy)
//             dispatch({ type: 'SET_ITEMS', users })
//             return 'hello'
//         } catch (err) {
//             console.log('err:', err)
//         }
//     }
// }

export function removeItems(userId: string) {

    return async (dispatch: any) => {
        try {
            const users = await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
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