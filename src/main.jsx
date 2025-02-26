import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { fetchBreakPoints } from './features/breakpoints/breakPointsSlice'
import { fetchMun } from './features/mun/munSlice'
import { fetchWwLin } from './features/wwLin/wwLinSlice'
import { fetchWwLineQuery } from './features/wwLin/wwLineQuerySlice'


store.dispatch(fetchBreakPoints())
store.dispatch(fetchMun('-1'))
store.dispatch(fetchWwLin({ id: 'al022024' }))
store.dispatch(fetchWwLineQuery())


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
