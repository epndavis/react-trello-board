import React from 'react'
import Modal from './Modal'

export default class TaskModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = Object.assign({
            title: '',
            description: ''
        }, this.props.task)
    }

    handleOnChange = (e) => {
        const { value, name } = e.target
        this.setState({ [name] : value })
    }

    changeDesciprtion = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    render () {
        return <Modal show={this.props.show} onClose={this.props.onClose}>
            <div className="w-64 shadow rounded bg-white p-4 w-full max-w-xl h-full relative">
                <h2 className="text-lg font-bold">
                    <input className="w-full focus:bg-gray-200 py-1" name="title" value={this.state.title} onChange={this.handleOnChange} placeholder="Add Title" />
                </h2>
                
                <div className="mt-4">
                    <textarea rows="10" name="description" className="w-full focus:bg-gray-200" placeholder="Add task description..." value={this.state.description} onChange={this.handleOnChange}></textarea>
                </div>
            </div>
      </Modal>
    }
}
