import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

export default class Board extends React.Component {
    addTask = () => {
        this.props.addTask(this.props.board)
    }

    editTask = (task) => {
        this.props.addTask(this.props.board, task)
    }

    render () {
        return <div className="flex py-4 px-2">
            <div className="p-4 bg-white rounded shadow w-64 flex flex-col">
                <h2 className="text-lg font-bold">    
                    {this.props.board.title}
                </h2>

                <Droppable droppableId={this.props.board.id.toString()}>
                    {(provided) => {
                        return <div 
                            className="mt-4 flex-1"
                            ref={provided.innerRef}
                            {...provided.droppableProps}   
                        >
                            {this.props.board.tasks.map((task, index) => {
                                return <Task key={task.id} task={task} index={index} editTask={this.editTask}/>
                            })}
                            {provided.placeholder}
                        </div>
                    }}
                </Droppable>

                <div className="mt-4">
                    <button className="w-full rounded shadow bg-blue-400 px-3 py-2 text-white hover:bg-blue-300" onClick={this.addTask}>
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    }
}
