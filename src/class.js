export class Game {
  #id
  #title
  #isFavorit
  #creater
  #url

  constructor (id, title, favorit, creater) {
    this.#id = id
    this.#title = title
    this.#isFavorit = favorit
    this.#creater = creater
    this.#url = `https://realtime-database-d9932-default-rtdb.europe-west1.firebasedatabase.app/games/${
      this.#id
    }.json`
  }

  get title () {
    return this.#title
  }

  get creater () {
    return this.#creater
  }

  get favorit () {
    return this.#isFavorit
  }

  render (container) {
    const gameDiv = document.createElement('div')
    const title = document.createElement('h1')
    const creater = document.createElement('h2')
    const delBtn = document.createElement('button')
    gameDiv.id = this.#id
    gameDiv.classList.add('gamediv')
    title.innerText = 'Game title: ' + this.#title
    creater.innerText = 'Game creater: ' + this.#creater
    delBtn.innerText = 'X'

    if (this.#isFavorit) gameDiv.classList.add('favorit')

    gameDiv.addEventListener('click', () => {
      gameDiv.classList.toggle('favorit')
      this.toggleFavorit()
    })

    delBtn.addEventListener('click', () => {
      gameDiv.remove()
      this.deleteTask()
    })

    gameDiv.append(title, creater, delBtn)
    container.append(gameDiv)
  }
  async toggleFavorit () {
    this.#isFavorit = !this.#isFavorit
    const options = {
      method: 'PATCH',
      body: JSON.stringify({ favorit: this.#isFavorit }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }
    const response = await fetch(this.#url, options)
    if (!response.ok) throw new Error(response.status)
    const data = await response.json()
    console.log(data)
  }
  async deleteTask () {
    const options = {
      method: 'DELETE'
    }
    const response = await fetch(this.#url, options)
    if (!response.ok) throw new Error(response.status)
    const data = await response.json()
    console.log(data)
  }
}
