import React from 'react'
import Modal from './Modal'
import Comments from './Comments'

export default class TaskModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = Object.assign({
            title: '',
            description: '',
            comments: []
        }, this.props.task)
    }

    handleOnChange = (e) => {
        const { value, name } = e.target
        this.setState({ [name] : value })
    }

    onSubmit = () => {
        this.props.onSubmit(this.state)
    }

    addComment = (comment) => {
        const comments = this.state.comments

        comments.push(comment)

        this.setState({
            ...this.state,
            comments
        })
    }

    render () {
        return <Modal show={this.props.show} onClose={this.props.onClose}>
            <div className="w-64 shadow rounded bg-white p-4 w-full max-w-xl h-full relative flex flex-col">
                <div>
                    <h2 className="text-lg font-bold">
                        <input className="w-full focus:bg-gray-200 py-1" name="title" value={this.state.title} onChange={this.handleOnChange} placeholder="Add Title" />
                    </h2>
                    
                    <div className="mt-4">
                        <textarea rows="5" name="description" className="w-full focus:bg-gray-200" placeholder="Add task description..." value={this.state.description} onChange={this.handleOnChange}></textarea>
                    </div>
                </div>

                <div className="flex-1 overflow-y-scroll">
                    <Comments comments={this.state.comments} addComment={this.addComment}/>
                </div>

                <div className="mt-4">
                    <button className="mt-3 w-full bg-blue-400 rounded px-3 py-2 text-white" onClick={this.onSubmit}>
                        Save
                    </button>
                </div>
            </div>
      </Modal>
    }
}
