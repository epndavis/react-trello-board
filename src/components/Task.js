import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Task extends React.Component {
    editTask = () => {
        this.props.editTask(this.props.task)
    }

    render () {
        return (
            <Draggable draggableId={this.props.task.id.toString()} index={this.props.index}>
                {(provided) => {
                    return <div
                        className="p-4 bg-gray-200 rounded w-full mt-3"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <h2>    
                            {this.props.task.title}
                        </h2>

                        <button onClick={this.editTask}>Edit</button>

                        <p className="text-sm">
                            {this.props.task.description}
                        </p>
                    </div>
                }}
            </Draggable>
        )
    }
}
