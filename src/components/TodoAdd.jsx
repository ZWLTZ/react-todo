import React from "react"

class TodoAdd extends React.Component {
    constructor(props) {
        super(props)
        this.submitClick = this.submitClick.bind(this)
    }
    submitClick(event) {
        // 通过：refs 集合获取指定的值
        let content = this.refs.content.value.trim()
        // 1、调用父组件的回调函数，传递参数.es6结构赋值
        if (!content) {
            alert("评论不能为空")
            return
        } else {
            let newItem = {
                title: content,
                isFinished: false
            }
            console.log(newItem,"111")
            this.props.onAddSubmit(newItem)
            // // 置空
            this.refs.content.value = ""
        }
    }
    render() {
        return (
            <div className="todo-wrap">
                <input type="text" ref="content" maxLength="15" placeholder="输入...." />
                <a onClick={this.submitClick} href="javascript:;">添加</a>
            </div>
        )
    }
}

export default TodoAdd