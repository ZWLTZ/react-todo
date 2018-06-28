import React from "react"

class TodoList extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this._onChangeChecked = this._onChangeChecked.bind(this)
    }
    _onChangeChecked(e) {
        let target = e.target
        let index = target.getAttribute("data-index")
        let changeItem = {
            title: this.props.data[index].title,
            isFinished: target.checked
        }
        console.log(index)
        console.log(changeItem)
        this.props.onChangeIsfinish(index, changeItem)
    }
    render() {
        return (
            <div className="todo-list">
                <ul>
                    {this.props.data.map((item, index) =>
                        <li key={index}>
                            <label>
                                <input className="is-hide" type="checkbox"
                                    data-index={index}
                                    onChange={this._onChangeChecked}
                                    checked={item.isFinished} />
                            </label>
                            <span className="list-title">{item.title}</span>
                            <a className="delete-btn" href="javascript:;">✖</a>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default TodoList