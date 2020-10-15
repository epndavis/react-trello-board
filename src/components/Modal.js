import React from 'react'

export default class Modal extends React.Component {
    render () {
        return <div className={`fixed inset-0 flex p-5 items-center justify-center bg-black bg-opacity-25 ${this.props.show ? "" : "hidden"}`} >
        <div className="absolute inset-0" onClick={this.props.onClose}></div>
        
        {this.props.children}
      </div>
    }
}
