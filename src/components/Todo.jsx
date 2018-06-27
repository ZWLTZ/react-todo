import React from "react"


import TodoAdd from "./TodoAdd.jsx"
import TodoList from "./TodoList.jsx"

class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                {
                    title: "阿里巴巴呼啦呼啦啦啦",
                    isFinished: true,
                },
                {
                    title: "腾讯唧唧复唧唧唧唧",
                    isFinished: false,
                }
            ],
            text: ""
        }
    }
    //1 传递给子组件的回调函数
    onAddSubmit(addCurrent) {
        console.log(addCurrent, "222")
        let newList = this.state.list
        newList.unshift(addCurrent)
        this.setState({ list: newList })
    }

    render() {
        return (
            <div className="todo-wrap">
                <h3>Todo</h3>
                <TodoAdd onAddSubmit={this.onAddSubmit.bind(this)} />
                <TodoList data={this.state.list} />
            </div>
        )
    }
}

export default Todo