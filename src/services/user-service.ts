import { storageService } from './async-storage-service'
import { store, load } from './storage-service'
// import { httpService } from './http-service'
// import { utilService } from './util-service'
// import { store } from '../store/store'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
const USER_STORAGE_KEY = 'user'
const USER_URL = 'user/'

// _createUser()

export const userService = {
  login,
  logout,
  signup,
  setLoggedInUser,
  getLoggedInUser,
  getUsers,
  getById,
  saveUser,
  remove,
  createEmptyUser,
  // update,
  // saveLocalUser,
  // getEmptyUser,
  //   loginViaGoogle,
  //   signupViaGoogle,
}


export interface User {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  _id: string,
  imgUrl: string,
}

export interface MiniUser {
  firstName: string,
  lastName: string,
  _id: string,
  imgUrl: string,
}

// window.userService = userService

function getUsers() {
  return storageService.query(USER_STORAGE_KEY)
}


function getById(userId: string) {
  return storageService.get(USER_STORAGE_KEY, userId)
  //   return storageService.get(USER_URL , userId)
}

function remove(userId: string) {
  return storageService.remove(USER_STORAGE_KEY, userId)
  //   return storageService.remove(USER_URL , userId)
}

async function login(userCred: any) {
  const userToFind = await getUsers()
    .then((entities: any) => entities.find((entity: any) => entity.email === userCred.email))
  console.log(userToFind);
  if (userToFind  && userToFind.password === userCred.password) {

    // const user = await storageService.post(USER_STORAGE_KEY, userCred)
    //   const user = await storageService.post('auth/login', userCred)
    // if (user) {
    // return setLoggedInUser(user)
    // }
    return setLoggedInUser(userToFind)
  }
  
}
// async function login(userCred:any) {
//   const user = await storageService.post(USER_STORAGE_KEY, userCred)
// //   const user = await storageService.post('auth/login', userCred)
//   if (user) {
//     return setLoggedInUser(user)
//   }
// }

// async function loginViaGoogle(userCred) {
//   const user = await httpService.post('auth/loginViaGoogle', userCred)
//   if (user) {
//     return setLoggedInUser(user)
//   }
// }

async function signup(user: User) {
  if (!user.imgUrl)
    user.imgUrl =
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b0b4c759-ad9c-4425-a9f4-ab89e2fd9837/de8cefl-35c0bc59-59b9-42ab-b19f-5c73828bb78e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IwYjRjNzU5LWFkOWMtNDQyNS1hOWY0LWFiODllMmZkOTgzN1wvZGU4Y2VmbC0zNWMwYmM1OS01OWI5LTQyYWItYjE5Zi01YzczODI4YmI3OGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.81ixeN9b4cfDmfBlskK9CUyAMDtRhYNU7lfwTI8WI5Q'

  const response = await storageService.post(USER_STORAGE_KEY, user)
  //   const response = await storageService.post('auth/signup', user)

  if (response) {
    return setLoggedInUser(response)
  }
}



async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  //   return await storageService.post('auth/logout')
}

function setLoggedInUser(user: User) {
  const userToSave = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    imgUrl: user.imgUrl
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
  return userToSave
}

// function getLoggedInUser() {
//   const storageItem = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER);

//   if (!storageItem) {
//     console.log('No logged in user found in sessionStorage.');
//     return;
//   }
//   const miniUser: MiniUser | undefined = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) ?? "")
//   // const miniUser:MiniUser | undefined = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)||'')
//   console.log(miniUser);

//   if (!miniUser) return
//   return getById(miniUser._id)
// }

function getLoggedInUser() {
  const storageItem: string | null = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER);

  if (!storageItem) {
    console.log('No logged in user found in sessionStorage.');
    return null;
  }

  const miniUser: MiniUser | undefined = JSON.parse(storageItem);
  if (!miniUser) return;
  return getById(miniUser._id);
}


function saveUser(user: User) {
  if (user._id) return storageService.put(USER_URL + user._id, user)
  return storageService.post(USER_URL, user)
}

function createEmptyUser(): User {
  return {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    _id: '',
    imgUrl:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b0b4c759-ad9c-4425-a9f4-ab89e2fd9837/de8cefl-35c0bc59-59b9-42ab-b19f-5c73828bb78e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IwYjRjNzU5LWFkOWMtNDQyNS1hOWY0LWFiODllMmZkOTgzN1wvZGU4Y2VmbC0zNWMwYmM1OS01OWI5LTQyYWItYjE5Zi01YzczODI4YmI3OGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.81ixeN9b4cfDmfBlskK9CUyAMDtRhYNU7lfwTI8WI5Q',
  }
}


