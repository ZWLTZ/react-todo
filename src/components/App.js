import React, { Component } from 'react'

/**
 * 1、组件通信
 * 2、生命周期
 * 3、路由
 * 4、redux
 */
import Todo from "./Todo.jsx"
class App extends Component {
	render() {
		return (
			<div className="App-todo">
				<Todo />
			</div>
		);
	}
}

export default App
