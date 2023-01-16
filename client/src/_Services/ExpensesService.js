import queryString from 'query-string'
import auth from '../Authentication/_AuthenticationHelper'

// const baseURL = "http://54.254.184.90:3001"
const baseURL = "http://localhost:3001"

const create = async (expense) => {
  var jwt = auth.isAuthenticated()

  try {
    let response = await fetch(baseURL + '/api/expenses/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt.token
      },
      body: JSON.stringify(expense)
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const currentMonthPreview = async () => {
  var jwt = auth.isAuthenticated()

  try {
    let response = await fetch(baseURL + '/api/expenses/current/preview', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + jwt.token
      }
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const expenseByCategory = async (credentials, signal) => {
  var jwt = auth.isAuthenticated()

  try {
    let response = await fetch(baseURL + '/api/expenses/by/category', {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + jwt.token
      }
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const averageCategories = async (params) => {
  var jwt = auth.isAuthenticated()

  const query = queryString.stringify(params)
  try {
    let response = await fetch(baseURL + '/api/expenses/category/averages?' + query, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + jwt.token
      }
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}
const yearlyExpenses = async (params, credentials, signal) => {
  var jwt = auth.isAuthenticated()

  const query = queryString.stringify(params)
  try {
    let response = await fetch(baseURL + '/api/expenses/yearly?' + query, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + jwt.token
      }
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const read = async (query) => {
  var jwt = auth.isAuthenticated()

  try {
    let response = await fetch(baseURL + '/api/expenses/' + query, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + jwt.token
      }
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const update = async (params, credentials, expense) => {
  try {
    let response = await fetch(baseURL + '/api/expenses/' + params.expenseId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(expense)
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const remove = async (id) => {
  var jwt = auth.isAuthenticated()

  try {
    let response = await fetch(baseURL + '/api/expenses/' + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt.token
      }
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export {
  create,
  currentMonthPreview,
  expenseByCategory,
  averageCategories,
  yearlyExpenses,
  read,
  update,
  remove
}
