import React from 'react';

export default class Comments extends React.Component {
    state = {
        comment: '',
        comments: this.props.comments
    }

    onChange = (e) => {
        this.setState({ 
            comment: e.target.value
        })
    }

    addComment = () => {
        this.props.addComment(this.state.comment)
    }

    render () {
        return (
            <div>
                <h3 className="font-bold">
                    Add comment
                </h3>

                <div className="mt-4">
                    <textarea rows="4" name="comment" className="w-full focus:bg-gray-200" placeholder="Add a comment" value={this.state.comment} onChange={this.onChange}></textarea>
                </div>

                <div className="mt-3">
                    <button className="px-3 py-2 rounded bg-gray-500 text-white" onClick={this.addComment}>
                        Add comment
                    </button>
                </div>

                <div className="mt-4">
                    {this.state.comments.map((comment, index) => {
                        return <div key={index} className="w-full">
                            <p className="w-full bg-gray-100 p-2 mt-2">
                                {comment}
                            </p>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}
