import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// 1、引入rem
import 'lib-flexible'

// 2、css入口
require("./styles/index.styl")


import App from "./components/App"


ReactDOM.render(<App />, document.getElementById('app'))

