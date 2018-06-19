import React, { Component } from 'react';

// AJAX api
import Ajax from "../api/Api"

let Api = Ajax("GET","https://api.github.com/gists").then( res => {
	// console.log(res)
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

// 五、评论
import Comments from "./Comments.jsx"

class App extends Component {
	render() {
		return (
			<div className="App">
				<h3 className = "index-title">五、简单的评论</h3>
				<Comments />
			</div>
		);
	}
}

export default App
