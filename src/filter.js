export function filterAndRender (
  games,
  container,
  filterType = 'all',
  sortBy = null,
  sortOrder = null
) {
  let filteredGames = [...games]

  if (filterType === 'favorits') {
    filteredGames = filteredGames.filter(game => game.favorit)
  }

  if (sortBy && sortOrder) {
    filteredGames.sort((a, b) => {
      const aValue = sortBy === 'title' ? a.title : a.creater
      const bValue = sortBy === 'title' ? b.title : b.creater

      if (sortOrder === 'aö') {
        return aValue.localeCompare(bValue, 'sv')
      } else {
        return bValue.localeCompare(aValue, 'sv')
      }
    })
  }

  container.innerHTML = ''
  filteredGames.forEach(game => game.render(container))
}

export function setupFilters (games, container) {
  const showAllBtn = document.querySelector('#showAll')
  const showFavoritsBtn = document.querySelector('#showFavorits')
  const resetBtn = document.querySelector('#reset')
  const sortCreaterSelect = document.querySelector('#sortCreater')
  const sortTitleSelect = document.querySelector('#sortTitle')

  let currentFilter = 'all'
  let currentSortBy = null
  let currentSortOrder = null

  const updateDisplay = () => {
    filterAndRender(
      games,
      container,
      currentFilter,
      currentSortBy,
      currentSortOrder
    )
  }

  showAllBtn.addEventListener('click', () => {
    currentFilter = 'all'
    updateDisplay()
  })

  showFavoritsBtn.addEventListener('click', () => {
    currentFilter = 'favorits'
    updateDisplay()
  })

  resetBtn.addEventListener('click', () => {
    currentFilter = 'all'
    currentSortOrder = null
    currentSortBy = null
    updateDisplay()
  })

  sortCreaterSelect.addEventListener('change', e => {
    const value = e.target.value
    if (value) {
      currentSortBy = 'creater'
      currentSortOrder = value
      sortTitleSelect.value = ''
    } else {
      currentSortBy = null
      currentSortOrder = null
    }
    updateDisplay()
  })

  sortTitleSelect.addEventListener('change', e => {
    const value = e.target.value
    if (value) {
      currentSortBy = 'title'
      currentSortOrder = value
      sortCreaterSelect.value = ''
    } else {
      currentSortBy = null
      currentSortOrder = null
    }
    updateDisplay()
  })
}
