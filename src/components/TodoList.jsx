import React from "react"

class TodoList extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this._onChangeChecked = this._onChangeChecked.bind(this)
        this._toggleAllChecked = this._toggleAllChecked.bind(this)
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
    _toggleAllChecked(e) {
        let allTarget = e.target
        let allList = this.props.data
        allList.map(item => {
            item.isFinished = allTarget.checked
        })
        this.props.onToggleAll(allList)
    }
    _deleteCurrent(e) {
        let currentIndex = e.target.getAttribute("data-index")
        this.props.onDeleteItem(currentIndex)
    }
    componentDidMount() {

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
                <div className="counts-status">
                    <label>
                        <input className="toggle-all" type="checkbox"
                            checked={filterCounts().left == 0 && filterCounts().count != 0}
                            onChange={this._toggleAllChecked} />
                    </label>
                    <span className="finished-count">Completed：{filterCounts().count}</span>
                    <span className="left-count">{filterCounts().left > 1 ? filterCounts().left + " Matters left" : filterCounts().left + " Matter left"}</span>
                    <span className="total-count">{allTips}</span>
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