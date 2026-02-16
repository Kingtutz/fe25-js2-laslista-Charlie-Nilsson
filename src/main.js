import { Game } from './class.js'
import { getAll, postGame } from './firebase.js'
import { setupFilters } from './filter.js'

const form = document.querySelector('form')
let games = []

const logGame = data => {
  for (const key in data) {
    games.push(
      new Game(key, data[key].title, data[key].favorit, data[key].creater)
    )
  }
  const gameWrapper = document.querySelector('#gameWrapper')
  gameWrapper.innerHTML = ''
  games.forEach(game => game.render(gameWrapper))

  setupFilters(games, gameWrapper)
}

getAll().then(logGame)

form.addEventListener('submit', event => {
  event.preventDefault()
  const formData = new FormData(form)
  const newGame = {}
  formData.forEach((value, key) => {
    newGame[key] = value.trim()
  })

  if (newGame) {
    games = []
    postGame(newGame).then(getAll).then(logGame)
  }
})
