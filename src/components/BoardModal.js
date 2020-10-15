import React from 'react'
import Modal from './Modal'

export default class TaskModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: ''
        }
    
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.onSubmit(this.state)
        this.props.onClose()

        this.setState({
            value: ''
        })
    }

    render () {
        return <Modal show={this.props.show} onClose={this.props.onClose}>
            <div className="w-64 shadow rounded bg-white p-4 relative">
                <form onSubmit={this.handleSubmit}>
                    <label className="font-bold">Title</label>
                    <input type="text" className="w-full bg-gray-200 px-2 py-1" value={this.state.value} onChange={this.handleChange} />

                    <div className="mt-4">
                        <button className="mt-3 w-full bg-blue-400 rounded px-3 py-2 text-white">
                            Add Board
                        </button>
                    </div>
                </form>
            </div>
      </Modal>
    }
}
