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
      showBoardModal: false,
      showTaskModal: false,
      selectedBoard: {},
      selectedTask: {},
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

  updateTaskOnBoard = (board, editedTask) => {
    const taskIndex = board.tasks.findIndex((task) => task.id === editedTask.id)
    const updatedBoard = Object.assign(board, {})

    updatedBoard.tasks[taskIndex] = editedTask

    return updatedBoard
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

  makeTask = (task) => {
    if (task.id) {
      return this.updateTask(task)
    }

    const index = this.state.tasksIndex + 1
    const updateToBoard = this.addTaskToBoard(this.state.selectedBoard, Object.assign(taskMap, {
      id: index,
      title: task.title,
      description: task.description
    }))

    this.setState({
      tasksIndex: index
    }, this.updateBoards(updateToBoard))

    this.closeTaskModal()
  }

  updateTask = (task) => {
    const updatedTask = Object.assign(this.state.selectedTask, task)
    const updateToBoard = this.updateTaskOnBoard(this.state.selectedBoard, updatedTask)

    this.updateBoards(updateToBoard)
    this.closeTaskModal()
  }

  openTaskModal (board, task = {}) {
    this.setState((state) => ({
      showTaskModal: true,
      selectedBoard: board,
      selectedTask: task
    }))
  }

  closeTaskModal() {
    this.setState((state) => ({
      showTaskModal: false
    }))
  }

  openBoardModal() {
    this.setState((state) => ({
      showBoardModal: true
    }))
  }

  closeBoardModal() {
    this.setState((state) => ({
      showBoardModal: false
    }))
  }

  render() {
    let taskModal;

    if (this.state.showTaskModal) {
      taskModal = <TaskModal show={this.state.showTaskModal} task={this.state.selectedTask} onSubmit={this.makeTask} onClose={this.closeTaskModal} />
    }

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

        <BoardModal show={this.state.showBoardModal} onSubmit={this.makeBoard} onClose={this.closeBoardModal} />

        {taskModal}
      </div>
    );
  }
}
