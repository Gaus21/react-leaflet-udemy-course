import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { fetchBreakPoints } from './features/breakpoints/breakPointsSlice'
import { fetchMun } from './features/mun/munSlice'
import { fetchWwLin } from './features/wwLin/wwLinSlice'
//import { fetchWwLineQuery } from './features/wwLin/wwLineQuerySlice'
import { fetchConePolygon } from './features/tcForecast/conePolygonSlice'
import { fetchLinForecast } from './features/tcForecast/tcLinForecastSlice.js'


store.dispatch(fetchBreakPoints())
store.dispatch(fetchMun('-1'))
store.dispatch(fetchWwLin({ id: store.getState().wwLineQuery.stormid }))
store.dispatch(fetchConePolygon({ id: store.getState().wwLineQuery.stormid, advis: store.getState().wwLineQuery.advisnum }))
store.dispatch(fetchLinForecast({ id: store.getState().wwLineQuery.stormid, advis: store.getState().wwLineQuery.advisnum }))


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
