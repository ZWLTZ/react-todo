import React from "react"

class TodoList extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this._onChangeChecked = this._onChangeChecked.bind(this)
        this._deleteCurrent = this._deleteCurrent.bind(this)
    }
    _onChangeChecked(e) {
        let target = e.target
        let index = target.getAttribute("data-index")
        let changeItem = {
            title: this.props.data[index].title,
            isFinished: target.checked
        }
        this.props.onChangeIsfinish(index, changeItem)
    }
    _deleteCurrent(e) {
        let currentIndex = e.target.getAttribute("data-index")
        this.props.onDeleteItem(currentIndex)
    }
    componentDidMount() {

    }
    render() {
        let allTips = this.props.data.length > 1 ? this.props.data.length + " Matters" : this.props.data.length + " Matter"
        let finishedCount = () => {
            let count = 0
            this.props.data.filter(item => {
                if (item.isFinished) {
                    count += 1
                }
            })
            return count
        }
        return (
            <div className="todo-list">
                <div className="counts-statue">
                    <span className="total-count">{allTips}</span>
                    <span className="finished-count">Finished：{finishedCount()}</span>
                </div>
                <ul className="list-box">
                    {this.props.data.map((item, index) =>
                        <li key={index}>
                            <input className="is-hide" type="checkbox"
                                data-index={index}
                                onChange={this._onChangeChecked}
                                checked={item.isFinished} />
                            <span className="list-title">{item.title}</span>
                            <a href="javascript:;" className="delete-btn" data-index={index} onClick={this._deleteCurrent}>✖</a>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default TodoList