import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './assets/main.css';
import List from './components/List'
import BoardModal from './components/BoardModal'
import TaskModal from './components/TaskModal'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      listsIndex: 2,
      addingBoard: false,
      addingTask: false,
      lists: [
        {
          id: 1,
          title: 'To do',
          tasks: [
            {
              id: 1,
              title: 'Build app'
            },
  
            {
              id: 2,
              title: 'Build frontend'
            }
          ]
        },
  
        {
          id: 2,
          title: 'Adhoc',
          tasks: []
        }
      ]
    }

    this.openBoardModal = this.openBoardModal.bind(this);
    this.closeBoardModal = this.closeBoardModal.bind(this);

    this.openTaskModal = this.openTaskModal.bind(this);
    this.closeTaskModal = this.closeTaskModal.bind(this);
  }

  onDragEnd = result => {

  }

  makeBoard = ({ value }) => {
    this.setState((state) => {
      const index = state.listsIndex++;
      const lists = [...state.lists, {
        id: index,
        title: value,
        tasks: []
      }]

      return {
        listsIndex: index,
        lists
      }
    })
  }

  openTaskModal(result) {
    console.log(result) 

    this.setState((state) => ({
      addingTask: true
    }))
  }

  closeTaskModal() {
    this.setState((state) => ({
      addingTask: false
    }))
  }

  openBoardModal() {
    this.setState((state) => ({
      addingBoard: true
    }))
  }

  closeBoardModal() {
    this.setState((state) => ({
      addingBoard: false
    }))
  }

  render() {
    return (
      <div className="App bg-gray-400 flex flex-col px-2 h-screen overflow-y-hidden">
        <header className="px-2 py-1 w-full">
          <button className="mt-3 bg-blue-400 rounded px-3 py-2 text-white" onClick={this.openBoardModal}>
            Add board
          </button>
        </header>

        <div className="flex-1 flex">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.lists.map((list, index) => {
              return <List key={index} list={list} addTask={this.openTaskModal}/>
            })}
          </DragDropContext>
        </div>

        <BoardModal show={this.state.addingBoard} onSubmit={this.makeBoard} onClose={this.closeBoardModal} />

        <TaskModal show={this.state.addingTask} onClose={this.closeTaskModal} />
      </div>
    );
  }
}
