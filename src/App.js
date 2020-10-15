import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './assets/main.css';
import List from './components/List'

export default class App extends React.Component {
  state = {
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

  onDragEnd = result => {

  }

  render() {
    return (
      <div className="App bg-gray-400 flex px-2">
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.lists.map((list, index) => {
            return <List key={index} list={list} />
          })}
        </DragDropContext>
      </div>
    );
  }
}
