import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './assets/main.css';
import InitialState from './InitialState'
import Board from './components/Board'
import BoardModal from './components/BoardModal'
import TaskModal from './components/TaskModal'

const taskMap = {
  title: '',
  description: '',
  comments: []
}

const boardMap = {
  title: '',
  tasks: []
}

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = Object.assign({
      addingBoard: false,
      addingTask: false,
    }, InitialState)

    this.openBoardModal = this.openBoardModal.bind(this);
    this.closeBoardModal = this.closeBoardModal.bind(this);

    this.openTaskModal = this.openTaskModal.bind(this);
    this.closeTaskModal = this.closeTaskModal.bind(this);
  }

  onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) {
      return
    }
    
    const fromBoard = this.state.boards.find((board) => source.droppableId === board.id.toString())
    const toBoard = this.state.boards.find((board) => destination.droppableId === board.id.toString())
    const draggedTask = fromBoard.tasks.find((task) => task.id.toString() === draggableId);

    if (fromBoard.id === toBoard.id) {
      const updateToBoard = this.reorderBoard(fromBoard, draggedTask, source.index, destination.index)

      this.updateBoards(updateToBoard)
    } else {
      const updateToBoard = this.addTaskToBoard(toBoard, draggedTask, destination.index)
      const updateFromBoard = this.removeTaskFromBoard(fromBoard, source.index)

      this.updateBoards(updateToBoard, updateFromBoard)
    } 
  }

  reorderBoard = (board, task, sourceIndex, destinationIndex) => {
    let newTasks = Array.from(board.tasks)

    newTasks.splice(sourceIndex, 1)
    newTasks.splice(destinationIndex, 0, task)

    return {
      ...board,
      tasks: newTasks
    }
  }

  removeTaskFromBoard = (board, sourceIndex) => {
    let newTasks = Array.from(board.tasks)

    newTasks.splice(sourceIndex, 1)

    return {
      ...board,
      tasks: newTasks
    }
  }

  addTaskToBoard = (board, task, destinationIndex) => {
    let newTasks = Array.from(board.tasks)

    newTasks.splice(destinationIndex, 0, task)

    return {
      ...board,
      tasks: newTasks
    }
  }

  updateBoards = (toBoard, fromBoard) => {
    const toBoardIndex = this.state.boards.findIndex((filteredBoard) => filteredBoard.id === toBoard.id)

    let newBoards = [...this.state.boards]
    newBoards[toBoardIndex] = toBoard

    if (fromBoard) {
      const fromBoardIndex = this.state.boards.findIndex((filteredBoard) => filteredBoard.id === fromBoard.id)
      newBoards[fromBoardIndex] = fromBoard
    }

    this.setState({
      ...this.state,
      boards: newBoards
    })
  }

  makeBoard = ({ value }) => {
    this.setState((state) => {
      const index = state.boardsIndex++
      const boards = [...state.boards, Object.assign(boardMap, {
        id: index,
        title: value
      })]

      return {
        ...this.state,
        boardsIndex: index,
        boards
      }
    })
  }

  makeTask = ({ title, description }, board) => {
    const index = this.state.tasksIndex + 1
    const updateToBoard = this.addTaskToBoard(board, Object.assign(taskMap, {
      id: index,
      title,
      description
    }))

    this.updateBoards(updateToBoard)
  }

  openTaskModal(result) {
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
            {this.state.boards.map((board, index) => {
              return <Board key={index} board={board} addTask={this.openTaskModal}/>
            })}
          </DragDropContext>
        </div>

        <BoardModal show={this.state.addingBoard} onSubmit={this.makeBoard} onClose={this.closeBoardModal} />

        <TaskModal show={this.state.addingTask} onSubmit={this.makeTask} onClose={this.closeTaskModal} />
      </div>
    );
  }
}
