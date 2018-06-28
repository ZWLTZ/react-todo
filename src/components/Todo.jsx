import React from "react"


import TodoAdd from "./TodoAdd.jsx"
import TodoList from "./TodoList.jsx"

// 操作
import { Storage } from "@/utils"

class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: Storage.fetch()
        }
        // 傳遞回調函數
        this.onAddSubmit = this.onAddSubmit.bind(this)
        this.onChangeIsfinish = this.onChangeIsfinish.bind(this)
        this.onDeleteItem = this.onDeleteItem.bind(this)
    }
    componentDidMount() {
        console.log("已經掛載上了")
    }
    //1 传递给子组件的回调函数
    onAddSubmit(addCurrent) {
        console.log(addCurrent, "要增加")
        let newList = this.state.list
        newList.unshift(addCurrent)
        this.setState({ list: newList })
        //1.1 保存到session Storage
        this._saveToSession()
    }
    _saveToSession() {
        Storage.save(this.state.list)
    }
    onChangeIsfinish(index, item) {
        let oldList = this.state.list
        oldList[index] = item
        this.setState({ list: oldList })
        // 
        this._saveToSession()
    }
    onDeleteItem(index) {
        let nowList = this.state.list
        nowList.splice(index, 1)
        console.log(index, nowList, "將要刪除")
        // 重置
        this.setState({ list: nowList })
        this._saveToSession()
    }
    render() {
        return (
            <div className="todo-wrap">
                <h3>react-todo</h3>
                <TodoAdd onAddSubmit={this.onAddSubmit} />
                <TodoList onDeleteItem={this.onDeleteItem} onChangeIsfinish={this.onChangeIsfinish} data={this.state.list} />
            </div>
        )
    }
}

export default Todo