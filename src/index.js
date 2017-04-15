import React from 'react'
import ReactDOM from 'react-dom'
import router from './router'
import history from './history'
import App from './components/App'

const scrollPositionsHistory = new Map()
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

let isInitialRenderComplete = true
const onRenderComplete = (location) => {
  if (isInitialRenderComplete) {
    isInitialRenderComplete = false
    return
  }

  let scrollX = 0
  let scrollY = 0
  const pos = scrollPositionsHistory[location.key]
  if (pos) {
    scrollX = pos.scrollX
    scrollY = pos.scrollY
  } else {
    const targetHash = location.hash.slice(1)
    if (targetHash) {
      const target = document.getElementById(targetHash)
      if (target) {
        scrollY = window.pageYOffset + target.getBoundingClinetRect().top
      }
    }
  }

  window.scrollTo(scrollX, scrollY)
}

const mountNode = document.getElementById('root')
let currentLocation = history.location

const onLocationChange = async (location, action) => {
  scrollPositionsHistory.set(currentLocation.key, {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  })
  if (action === 'PUSH') {
    scrollPositionsHistory.delete(location.key)
  }
  currentLocation = location

  try {
    const component = await router.resolve({
      path: location.pathname,
    })

    if (currentLocation.key !== location.key) {
      return
    }

    ReactDOM.render(
      <App>{component}</App>,
      mountNode,
      () => onRenderComplete(location)
    )
  } catch (error) {
    document.title = `Error: ${error.message}`
    throw error
  }
}

history.listen(onLocationChange)
onLocationChange(currentLocation)
