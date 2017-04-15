import createHistory from 'history/createBrowserHistory'

const isBrowser = typeof window !== 'undefined'

export default isBrowser && createHistory({
  basename: '/create-react-app-prerender-example'
})
