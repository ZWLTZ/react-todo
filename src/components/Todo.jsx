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

    }
    //1 传递给子组件的回调函数
    onAddSubmit(addTitle) {
        console.log("增加了：" + addTitle)
        let addItem = {
            title: addTitle,
            isFinished: false
        }
        this.state.list.unshift(addItem)
        this.setState({ list: this.state.list })
        this._saveToSession()
    }
    //1.1 保存到session Storage
    _saveToSession() {
        Storage.save(this.state.list)
    }
    onChangeIsfinish(index, isChecked) {
        console.log(isChecked ? "第：" + index + " 个被选中了" : "第：" + index + " 被取消了")
        this.state.list[index].isFinished = isChecked
        this.setState({ list: this.state.list })
        this._saveToSession()
    }
    onDeleteItem(index) {
        console.log(`删除了第：${index} 个`)
        this.state.list.splice(index, 1)
        this.setState({ list: this.state.list })
        this._saveToSession()
    }
    onToggleAll(isAllChecked) {
        console.log(isAllChecked ? "全部选中" : "全部取消")
        this.state.list.map(item => {
            item.isFinished = isAllChecked
        })
        this.setState({ list: this.state.list })
        this._saveToSession()
    }
    // 重新编辑回调
    onHasEdited(index, value) {
        console.log(value ? "重新编辑了第：" + index + "个" : "删除了第：" + index + "个")
        // 直接删除
        if (!value) {
            this.state.list.splice(index, 1)
        } else if (index && value) {
            this.state.list[index].title = value
        }
        // 重置
        this.setState({ list: this.state.list })
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