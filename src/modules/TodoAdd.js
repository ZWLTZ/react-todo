// TodoAdd.js 新增子模块

class TodoAdd {
    constructor({
        resetList,
    }) {
        this.resetList = resetList
    }
    _onSubmit(str) {
        if (str) {
            // 1、告诉父模块新增了
            this.resetList(str)
        }
    }
}

module.exports = TodoAdd