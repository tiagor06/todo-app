const INITIAL_STATE = {
    description: 'Teste de description', list: [{
        _id: 1,
        description: 'qualquer coisa 1',
        done: true
    },{
        _id: 2,
        description: 'qualquer coisa 2',
        done: false
    },{
        _id: 3,
        description: 'qualquer coisa 3',
        done: false
    }]
}

export default (state = INITIAL_STATE, action) => {  
    console.log(action.type)   
    switch(action.type) {
        case 'DESCRIPTION_CHANGED':
            return { ...state, description: action.payLoad }
        case 'TODO_SEARCHED':
            console.log(action.payLoad)
            return { ...state, list: action.payLoad.data }
        default:
            return state
    }
}