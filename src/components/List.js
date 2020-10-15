import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

export default class List extends React.Component {
    render () {
        return <div className="flex h-screen py-4 px-2">
            <div className="p-4 bg-white rounded shadow w-64 flex flex-col">
                <h2 className="text-lg font-bold">    
                    {this.props.list.title}
                </h2>

                <Droppable droppableId={this.props.list.id}>
                    {(provided) => {
                        return <div 
                            className="mt-4 flex-1"
                            ref={provided.innerRef}
                            {...provided.droppableProps}   
                        >
                            {this.props.list.tasks.map((task, index) => {
                                return <Task key={task.id} task={task} index={index} />
                            })}
                            {provided.placeholder}
                        </div>
                    }}
                </Droppable>

                <div className="mt-4">
                    <button className="w-full rounded shadow bg-blue-400 px-3 py-2 text-white hover:bg-blue-300">
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    }
}
