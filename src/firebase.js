const url =
  'https://realtime-database-d9932-default-rtdb.europe-west1.firebasedatabase.app/games.json'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js'
import {
  getDatabase,
  ref
} from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js'

const firebaseConfig = {
  apiKey: 'AIzaSyDSE0LSQG8IY7RdN7V9aQgsT2AMaQ7fQKs',
  authDomain: 'realtime-database-d9932.firebaseapp.com',
  databaseURL:
    'https://realtime-database-d9932-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'realtime-database-d9932',
  storageBucket: 'realtime-database-d9932.firebasestorage.app',
  messagingSenderId: '160805321072',
  appId: '1:160805321072:web:7a1be307241826aab237b5'
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const usersRef = ref(db, '/games')

export const getAll = async () => {
  const response = await fetch(url)
  if (!response.ok) throw new Error(response.status)

  const games = await response.json()

  return games
}

export const postGame = async game => {
  const newGame = { title: game.title, favorit: false, creater: game.creater }
  console.log(newGame)
  const options = {
    method: 'POST',
    body: JSON.stringify(newGame),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }

  const response = await fetch(url, options)
  if (!response.ok) throw new Error(response.status)
  const newID = await response.json()
  console.log(newID.name)
  console.log(newGame)

  return { id: newID.name, game, favorit: false }
}
