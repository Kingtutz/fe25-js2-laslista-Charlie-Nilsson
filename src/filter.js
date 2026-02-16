const filterFavorites = games => games.filter(game => game.favorit)
console.log(filterFavorites)

const filterAll = games => games

const createFilter = filterType =>
  filterType === 'favorits' ? filterFavorites : filterAll

const sortAÖ = (a, b) => a.localeCompare(b, 'sv')

const sortÖA = (a, b) => b.localeCompare(a, 'sv')

const createComparator = (getValue, order) => (a, b) => {
  const aValue = getValue(a)
  const bValue = getValue(b)
  return order === 'aö' ? sortAÖ(aValue, bValue) : sortÖA(aValue, bValue)
}
const getTitle = game => game.title
const getCreator = game => game.creater

const createSorter = (sortBy, sortOrder) => {
  if (!sortBy || !sortOrder) return games => games

  const getValue = sortBy === 'title' ? getTitle : getCreator
  const comparator = createComparator(getValue, sortOrder)

  return games => [...games].sort(comparator)
}

const pipe =
  (...fns) =>
  x =>
    fns.reduce((acc, fn) => fn(acc), x)

const createPipeline = (filterType, sortBy, sortOrder) => {
  const filterFn = createFilter(filterType)
  const sortFn = createSorter(sortBy, sortOrder)

  return pipe(filterFn, sortFn)
}

const render = (games, container) => {
  container.innerHTML = ''
  games.forEach(game => game.render(container))
}

export const filterAndRender = (
  games,
  container,
  filterType = 'all',
  sortBy = null,
  sortOrder = null
) => {
  const pipeline = createPipeline(filterType, sortBy, sortOrder)
  const processedGames = pipeline(games)
  render(processedGames, container)
}

const showFilterBtns = document.querySelector('#showfilterbtn')
const filterDiv = document.querySelector('#filterDiv')
showFilterBtns.addEventListener('click', () => {
  filterDiv.classList.toggle('hidden')
})

export function setupFilters (games, container) {
  const showAllBtn = document.querySelector('#showAll')
  const showFavoritsBtn = document.querySelector('#showFavorits')
  const resetBtn = document.querySelector('#reset')
  const sortCreaterSelect = document.querySelector('#sortCreater')
  const sortTitleSelect = document.querySelector('#sortTitle')

  const initialState = {
    filterType: 'all',
    sortBy: null,
    sortOrder: null
  }

  let currentState = { ...initialState }

  const updateState = changes => ({ ...currentState, ...changes })

  const applyState = newState => {
    currentState = newState
    filterAndRender(
      games,
      container,
      currentState.filterType,
      currentState.sortBy,
      currentState.sortOrder
    )
  }

  showAllBtn.addEventListener('click', () => {
    applyState(updateState({ filterType: 'all' }))
  })

  showFavoritsBtn.addEventListener('click', () => {
    applyState(updateState({ filterType: 'favorits' }))
  })

  resetBtn.addEventListener('click', () => {
    sortCreaterSelect.value = ''
    sortTitleSelect.value = ''
    applyState({ ...initialState })
  })

  sortCreaterSelect.addEventListener('change', e => {
    const value = e.target.value
    sortTitleSelect.value = ''

    applyState(
      updateState({
        sortBy: value ? 'creater' : null,
        sortOrder: value || null
      })
    )
  })

  sortTitleSelect.addEventListener('change', e => {
    const value = e.target.value
    sortCreaterSelect.value = ''

    applyState(
      updateState({
        sortBy: value ? 'title' : null,
        sortOrder: value || null
      })
    )
  })
}
