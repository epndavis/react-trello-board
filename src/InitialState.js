const store = localStorage.getItem('store')

export default Object.assign({
    boardsIndex: 0,
    tasksIndex: 0,
    boards: []
}, JSON.parse(store) ?? {})
