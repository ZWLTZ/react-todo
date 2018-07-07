
// TodoList.js 列表子模块
class TodoList {
    constructor({
        list,
    }) {
        this.list = []
        this._getNewList(list)
    }
    // 3、监听父模块是否要更新
    _getNewList(newList) {
        this.list = newList
        // 其他操作
    }
}

module.exports = TodoList