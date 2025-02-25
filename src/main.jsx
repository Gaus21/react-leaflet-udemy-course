import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'

import { fetchBreakPoints } from './features/breakpoints/breakPointsSlice'
import { fetchMun } from './features/mun/munSlice'

store.dispatch(fetchBreakPoints())
store.dispatch(fetchMun('-1'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
