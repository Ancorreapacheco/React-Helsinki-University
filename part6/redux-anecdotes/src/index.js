import React from 'react'
import ReactDOM from 'react-dom/client'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import Store from './reducers/store'
//import reducer from './reducers/anecdoteReducer'

//const store = createStore(reducer)

const store= Store
console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
