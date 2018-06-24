import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// 2、reset css
require("./styles/base.styl")

require("./styles/comments.styl")

import App from "./components/App"


ReactDOM.render(<App />, document.getElementById('app'))

