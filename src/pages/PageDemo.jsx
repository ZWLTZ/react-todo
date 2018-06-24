import React from "react"

class PageName extends React.Component {
    constructor(props) {
        super(props)
        this.state = []
    }
    render() {
        return (
            <div className = "page-demo">
                <p>测试@alias</p>
            </div>
        )
    }
}

module.exports = PageName