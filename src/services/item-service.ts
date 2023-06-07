import { store, load } from './storage-service'
import { makeId } from './util-service'

export const itemService = {
    query,
    save,
    remove,
    getById,
    getEmptyItem,
}

export interface Item { 
    // define the type for the item parameters
    _id: string,
    title: string | undefined,

    // add other properties as needed
}

const STORAGE_KEY = 'Items'
const gDefaultItems: Item[] = [ 
    {_id: '1', title: 'baba'},
    {_id: '2', title: 'lala'},
    {_id: '3', title: 'lala'},
    {_id: '4', title: 'lolo'},
    {_id: '5', title: 'bobo'},
    {_id: '6', title: 'toto'},
    {_id: '7', title: 'soso'},
    {_id: '8', title: 'nono'},
];

let gItems: Item[] = _loadItems()

function query() {
    const itemsToReturn = gItems
    return ([...itemsToReturn])
}

// function query(filterBy: any) {
//     let itemsToReturn = gItems
//     if (filterBy) {
//         itemsToReturn = gItems.filter(c => c)
//     }
//     return Promise.resolve([...itemsToReturn])
// }

function getById(id: string) {
    const currItem = gItems.find(item => item._id === id)
    return Promise.resolve({ ...currItem })
}

function remove(id: string): Promise<void> {
    const idx = gItems.findIndex(item => item._id === id)
    gItems.splice(idx, 1)
    if (!gItems.length) gItems = gDefaultItems.slice()
    store(STORAGE_KEY, gItems)
    return Promise.resolve()
}

function save(itemToSave: Item) {
    if (itemToSave._id.length) {
        const idx = gItems.findIndex(item => item._id === itemToSave._id)
        gItems.splice(idx, 1, itemToSave)        
    } else {
        itemToSave._id = makeId()
        gItems.push(itemToSave)
    }
    store(STORAGE_KEY, gItems)
    return Promise.resolve(itemToSave)
}

function getEmptyItem() {
    return {
        _id: '',
        title: ''
    }
}


function _loadItems(): Item[] {
    let items: Item[] | null = load(STORAGE_KEY)
    if (!items || !items.length) items = gDefaultItems
    store(STORAGE_KEY, items)
    return items
}
