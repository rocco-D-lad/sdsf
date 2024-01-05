import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/home'
import reportWebVitals from './reportWebVitals'
import 'normalize.css'
import './assets/styles/app.scss'

const $container = document.getElementById('root')
const app = createRoot($container)
app.render(<App />)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
