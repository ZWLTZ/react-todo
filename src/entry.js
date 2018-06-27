import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// 1、reset css
require("./styles/base.styl")

require("./styles/comments.styl")

//2 全局引入moment
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

// 3、全局引入antd/dist
import "antd/dist/antd.min.css"


import App from "./components/App"


ReactDOM.render(<App />, document.getElementById('app'))

