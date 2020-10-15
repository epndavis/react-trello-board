import React from 'react'
import Modal from './Modal'

export default class TaskModal extends React.Component {
    render () {
        return <Modal show={this.props.show} onClose={this.props.onClose}>
            <div className="w-64 shadow rounded bg-white p-4 w-full max-w-xl h-full relative">
                <h2 className="text-lg font-bold">
                    <input className="w-full focus:bg-gray-200 py-1" defaultValue="Task" placeholder="Add Title" />
                </h2>
                
                <div className="mt-4">
                    <textarea rows="10" className="w-full focus:bg-gray-200" placeholder="Add task description..."></textarea>
                </div>
            </div>
      </Modal>
    }
}
