import React from "react"
import ReactDOM from "react-dom/client"
import './assets/css/main.css'
import App from './App.jsx'

import { Provider } from "react-redux"
import store from "./store/store"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)