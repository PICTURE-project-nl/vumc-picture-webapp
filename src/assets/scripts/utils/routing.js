
import _reduce from 'lodash/reduce'

export const mergePagesWithRoutes = ({ routes, pages }) => {
  Object.keys(pages).map((page) => {
    routes[page].component = pages[page].component
    // routes[page].pathToRegexpOptions = { strict: true }
  })

  return routes
}

export const getRoutesAsArray = (routes) => _reduce(routes, (result, route) => {
  result.push(route)
  return result
}, [])
