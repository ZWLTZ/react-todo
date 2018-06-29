import React from "react"

class TodoList extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = { editTitle: "" }
        this._onChangeChecked = this._onChangeChecked.bind(this)
        this._toggleAllChecked = this._toggleAllChecked.bind(this)
        this._deleteCurrent = this._deleteCurrent.bind(this)
        this._onEditing = this._onEditing.bind(this)
        this._onChangeEdit = this._onChangeEdit.bind(this)
        this._onKeyUpEnterEdit = this._onKeyUpEnterEdit.bind(this)
        this._onBlurEdit = this._onBlurEdit.bind(this)
    }
    _onChangeChecked(e) {
        e.stopPropagation()
        let target = e.target
        let index = target.getAttribute("data-index")
        let changeItem = {
            title: this.props.data[index].title,
            isFinished: target.checked
        }
        this.props.onChangeIsfinish(index, changeItem)
    }
    _toggleAllChecked(e) {
        e.stopPropagation()
        let allTarget = e.target
        let allList = this.props.data
        allList.map(item => {
            item.isFinished = allTarget.checked
        })
        this.props.onToggleAll(allList)
    }
    _deleteCurrent(e) {
        e.stopPropagation()
        let currentIndex = e.target.getAttribute("data-index")
        this.props.onDeleteItem(currentIndex)
    }
    componentDidMount() {

    }
    // 双击编辑
    _onEditing(e) {
        e.stopPropagation()
        let doubleCliclTarget = e.target
        if (doubleCliclTarget.nodeName.toUpperCase() === "LI") {
            this.doubleCliclTarget = doubleCliclTarget
            this.doubleCliclTarget.className = "editing"
            // 指定当前的value
            let nowIndex = doubleCliclTarget.getAttribute("data-index")
            this.beforeEditValue = this.props.data[nowIndex].title
            this.setState({ editTitle: this.beforeEditValue })
            // 當前下面input获取焦点
            let childrenList = this.doubleCliclTarget.children
            for (let i = 0, len = childrenList.length; i < len; i++) {
                if (childrenList[i].className == "edit-item") {
                    childrenList[i].focus()
                }
            }
        }
    }
    _onChangeEdit(e) {
        let editTarget = e.target
        let editValue = editTarget.value.trim()
        this.editIndex = editTarget.getAttribute("data-index")
        this.setState({ editTitle: editValue })

    }
    _onKeyUpEnterEdit(e) {
        if (e.keyCode == 13) {
            this.confirmEditing()
        }
    }
    _onBlurEdit(e) {
        this.confirmEditing()
    }
    confirmEditing() {
        let endEditValue = this.state.editTitle
        // 如果重新编辑且值变化再重新设定（暂时可以忽略）
        this.doubleCliclTarget.className = ""
        this.props.onHasEdited(this.editIndex, endEditValue)
    }
    render() {
        let allTips = this.props.data.length > 1 ? this.props.data.length + " Matters" : this.props.data.length + " Matter"
        let filterCounts = () => {
            let count = 0, left = 0
            this.props.data.filter(item => {
                if (item.isFinished) {
                    count += 1
                } else {
                    left += 1
                }
            })
            return { count, left }
        }
        return (
            <div className="todo-list">
                <div className="toggle-all-box">
                    <label>
                        <input className="toggle-all" type="checkbox"
                            checked={filterCounts().left == 0 && filterCounts().count != 0}
                            onChange={this._toggleAllChecked} />
                    </label>
                </div>
                <ul className="list-box">
                    {this.props.data.map((item, index) =>
                        <li key={index} onDoubleClick={this._onEditing} data-index={index}>
                            <input className="is-hide" type="checkbox"
                                data-index={index}
                                onChange={this._onChangeChecked}
                                checked={item.isFinished} />
                            <span className="list-title">{item.title}</span>
                            <a href="javascript:;" className="delete-btn" data-index={index} onClick={this._deleteCurrent}>✖</a>
                            <input type="text" className="edit-item"
                                maxLength="20"
                                data-index={index}
                                value={this.state.editTitle}
                                onChange={this._onChangeEdit}
                                onKeyUp={this._onKeyUpEnterEdit}
                                onBlur={this._onBlurEdit} />
                        </li>
                    )}
                </ul>
                <div className="counts-status">
                    <span className="finished-count">Completed：{filterCounts().count}</span>
                    <span className="left-count">{filterCounts().left > 1 ? filterCounts().left + " Matters left" : filterCounts().left + " Matter left"}</span>
                    <span className="total-count">{allTips}</span>
                </div>
            </div>
        )
    }
}

export default TodoList