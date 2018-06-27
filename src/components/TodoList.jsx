import React from "react"

class TodoList extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }

    render() {
        return (
            <div className="todo-list">
                <ul>
                    {this.props.data.map((item, index) =>
                        <li key={index}>
                            <span>{item.title}</span>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default TodoList