import React, { Component } from 'react';

// AJAX api
import Ajax from "../api/Api"

let Api = Ajax("GET","https://api.github.com/gists").then( res => {
	// console.log(res,"请求成功了！")
	console.log("res")
}).catch( error => {
	console.log(error)
})

/**
 * 1、组件通信
 * 2、生命周期
 * 3、路由
 * 4、redux
 */

// 一、测试路由
import HomeRouter from "./Router.jsx"
 
// 、简单的评论
import Comments from "./Comments.jsx"


class App extends Component {
	render() {
		return (
			<div className="App">
				<h3 className = "router-title">一、测试路由</h3>
				<HomeRouter />
				<h3 className = "index-title">二、简单的评论</h3>
				<Comments />
			</div>
		);
	}
}

export default App
