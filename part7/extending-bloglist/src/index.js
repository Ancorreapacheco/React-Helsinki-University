import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

//Using redux
import store from './reducers/store'
import { Provider } from 'react-redux'

//Router
import { BrowserRouter as Router } from 'react-router-dom'


//store.subscribe(() => console.log(store.getState()))
//console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router>

		<Provider store={store}>
			<App />
		</Provider>

	</Router>
)
