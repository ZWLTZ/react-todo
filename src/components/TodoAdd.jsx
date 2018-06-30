import React from "react"

class TodoAdd extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = { title: "" }
        this._changeValueHandle = this._changeValueHandle.bind(this)
        this._onKeyUpEnter = this._onKeyUpEnter.bind(this)
        this._onBlurEnter = this._onBlurEnter.bind(this)
        this.confirmAddItem = this.confirmAddItem.bind(this)
    }
    componentDidMount() {
        document.getElementById("type-input").focus()
    }
    // 1、只要值改變就獲取并重置
    _changeValueHandle(e) {
        this.setState({
            title: e.target.value.trim()
        })
    }
    // 2、點擊enter鍵：有值就確認增加
    _onKeyUpEnter(e) {
        if (e.keyCode == 13) {
            this.confirmAddItem()
        }
    }
    // 3、失去焦點：有值就確認增加
    _onBlurEnter(e) {
        this.confirmAddItem()
    }
    // 4、確認增加，调用父组件的回调函数，传递参数
    confirmAddItem() {
        if (this.state.title) {
            this.props.onAddSubmit(this.state.title)
            // 置空當前
            this.setState({
                title: ""
            })
        }
    }
    render() {
        return (
            <div className="todo-add">
                <input type="text"
                    id="type-input"
                    value={this.state.title}
                    onChange={this._changeValueHandle}
                    onKeyUp={this._onKeyUpEnter}
                    onBlur={this._onBlurEnter}
                    ref="content"
                    maxLength="20"
                    placeholder="Please type...." />
            </div>
        )
    }
}

export default TodoAdd