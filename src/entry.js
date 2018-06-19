import React from 'react'
import ReactDOM from 'react-dom'

// 2、reset css
require("./styles/base.styl")

require("./styles/comments.styl")

// import App from "./components/App"

class Main extends Component {
	render() {
		return (
			<div className="App">
				<h3 className = "index-title">简单的评论</h3>
			</div>
		);
	}
}


ReactDOM.render(<Main />, document.getElementById('app'))

