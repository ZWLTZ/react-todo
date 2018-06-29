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
        this.onToggleAll = this.onToggleAll.bind(this)
        this.onHasEdited = this.onHasEdited.bind(this)
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
    onToggleAll(allList) {
        if (allList.length) {
            console.log(allList, "全部切换为")
            // 重置
            this.setState({ list: allList })
            this._saveToSession()
        }
    }
    // 重新编辑回调
    onHasEdited(index, value) {
        let editList = this.state.list
        console.log(editList, "重新编辑了第" + index + value)
        // 直接删除
        if (!value || value == undefined) {
            editList.splice(index, 1)
        } else if (index && value) {
            editList[index].title = value
        }
        // 重置
        this.setState({ list: editList })
        this._saveToSession()
    }
    render() {
        return (
            <div className="todo-wrap">
                <h3>react-todo</h3>
                <TodoAdd onAddSubmit={this.onAddSubmit} />
                <TodoList
                    onToggleAll={this.onToggleAll}
                    onDeleteItem={this.onDeleteItem}
                    onChangeIsfinish={this.onChangeIsfinish}
                    onHasEdited={this.onHasEdited}
                    data={this.state.list} />
                <p className="icon-tips">Double-click to edit a todo</p>
            </div>
        )
    }
}

export default Todo