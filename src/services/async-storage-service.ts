import {load , store} from './storage-service'
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}


interface Window {
  localStorage: Storage;
}

const user = { name: 'John', age: 30 };
load('user');

async function query(entityType:string, delay = 600) {
    const entities:any = await load(entityType) || [] 
    // var entities:any = JSON.parse(load('user')||'') || []
    
    // return new Promise((resolve, reject)=>{
    //     setTimeout(()=>{
    //         // reject('OOOOPs')
    //         resolve(entities)
    //     }, delay)   
    // })
    store(entityType, entities)
    return entities
}

async function get(entityType:string, entityId:string) {
    const entities = await query(entityType)
    return  entities.find((entity:any) => entity._id === entityId)
 
}

function post(entityType:string, newEntity:any) {
    newEntity._id = _makeId()
    console.log('new entity:',newEntity);
    
    return query(entityType)
        .then((entities:any) => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType:string, updatedEntity:{_id:string}) {
    return query(entityType)
        .then((entities:any) => {
            const idx = entities.findIndex((entity:any) => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType:string, entityId:string) {
    return query(entityType)
        .then((entities:any) => {
            const idx = entities.findIndex((entity:any) => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

function _save(entityType:string, entities:object[]) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function postMany(entityType:string, newEntities:object[]) {
    return query(entityType)
        .then((entities:any) => {
            newEntities = newEntities.map(entity => ({...entity, _id: _makeId()}))
            entities.push(...newEntities)
            _save(entityType, entities)
            return entities
        })
}