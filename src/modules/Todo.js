
// Todo.js  父模块
import TodoAdd from "./TodoAdd"
import TodoList from "./TodoList"

class Todo {
    constructor() {
        this.list = []
        this.TodoAdd = new TodoAdd({
            // 父模块给子模块的回调
            resetList: (content) => {
                if (content) {
                    this._updateList(content)
                }
            }
        })
        this.TodoList = new TodoList({
            list: this.list,
        })
    }

    _updateList(content) {
        this.list.push(content)
        // 调用子模块的方法更新内部列表
        this.TodoList && this.TodoList._getNewList(this.list)
    }
}

module.exports = Todo