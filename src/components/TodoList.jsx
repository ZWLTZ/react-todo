import React from "react"

class TodoList extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = { editTitle: "", isOnFocus: true }
        this._onChangeChecked = this._onChangeChecked.bind(this)
        this._toggleAllChecked = this._toggleAllChecked.bind(this)
        this._deleteCurrent = this._deleteCurrent.bind(this)
        this._onEditing = this._onEditing.bind(this)
        this._onChangeEdit = this._onChangeEdit.bind(this)
        this._onKeyUpEnterEdit = this._onKeyUpEnterEdit.bind(this)
        this._isOnFocus = this._isOnFocus.bind(this)
        this._onBlurEdit = this._onBlurEdit.bind(this)
    }
    _onChangeChecked(e) {
        e.stopPropagation()
        let target = e.target
        let index = target.getAttribute("data-index")
        let isChecked = target.checked
        this.props.onChangeIsfinish(index, isChecked)
    }
    _toggleAllChecked(e) {
        e.stopPropagation()
        let isAllChecked = e.target.checked
        this.props.onToggleAll(isAllChecked)
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
            // 此处可以通过当前组件的状态直接更新是否要追加：editing className。
            /**
             *  if(this.state.isDoubleClick) classList.push("editing")
             *  <li className = {classList.join(" ")} >
             */
            this.doubleCliclTarget.className = "editing"
            // 指定当前的value
            this.editIndex = doubleCliclTarget.getAttribute("data-index")
            this.beforeEditValue = this.props.data[this.editIndex].title
            this.setState({ editTitle: this.beforeEditValue })
            // 當前下面input获取焦点
            let input = this.doubleCliclTarget.getElementsByClassName("edit-item")[0]
            input.focus()
        }
    }
    _onChangeEdit(e) {
        this.setState({ editTitle: e.target.value.trim() })
    }
    _onKeyUpEnterEdit(e) {
        if (e.keyCode == 13) {
            // 确认更改
            this.setState({ isOnFocus: false })
            this.confirmEditing()
        }
    }
    /**
     * 因为enter后需要input隐藏，所以enter会连带触发onBlur事件，这里通过
     * isFocus的动态改变来限制是否阻止onBlur事件
     */
    _isOnFocus(e) {
        this.setState({ isOnFocus: true })
    }
    _onBlurEdit(e) {
        console.log(this.state.isOnFocus ? "通过失去焦点完成了编辑" : "通过Enter完成了编辑")
        this.state.isOnFocus && this.confirmEditing()
    }
    confirmEditing() {
        if (this.editIndex) {
            this.doubleCliclTarget.className = ""
            this.props.onHasEdited(this.editIndex, this.state.editTitle)
        }
        this.editIndex = null
        this.setState({ editTitle: "" })
    }
    render() {
        let filterCounts = () => {
            let completedCount = 0, leftCount = 0, total = this.props.data.length
            let allTips = total > 1 ? total + " Matters" : total + " Matter"
            this.props.data.filter(item => {
                if (item.isFinished) {
                    completedCount += 1
                } else {
                    leftCount += 1
                }
            })
            return { completedCount, leftCount, allTips }
        }
        return (
            <div className="todo-list">
                <div className="toggle-all-box">
                    <label>
                        <input className="toggle-all" type="checkbox"
                            checked={filterCounts().leftCount == 0 && filterCounts().completedCount !== 0}
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
                                onFocus={this._isOnFocus}
                                onBlur={this._onBlurEdit} />
                        </li>
                    )}
                </ul>
                <div className="counts-status">
                    <span className="finished-count">Completed：{filterCounts().completedCount}</span>
                    <span className="left-count">{filterCounts().leftCount > 1 ? filterCounts().leftCount + " Matters left" : filterCounts().leftCount + " Matter left"}</span>
                    <span className="total-count">{filterCounts().allTips}</span>
                </div>
            </div>
        )
    }
}

export default TodoList