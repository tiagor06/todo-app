import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            description: '',
            list: [] 
        }

        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.refresh()
    }
    
    handleAdd() {
        const parans = {
            description: this.state.description
        }
        axios.post(URL, parans)
            .then(resp => this.refresh())
    }

    handleChange(event) {
        this.setState({...this.state, description: event.target.value})  
    }

    handleRemove(item) {
        axios.delete(`${URL}/${item._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPending(item) {
        axios.put(`${URL}/${item._id}`, {...item, done: false})
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsDone(item) {
        axios.put(`${URL}/${item._id}`, {...item, done: true})
            .then(resp => this.refresh(this.state.description))
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleClear() {
        this.refresh()
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, description, list: resp.data}))
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' 
                            small='Cadastro' 
                />
                <TodoForm description={this.state.description}
                          handleAdd={this.handleAdd}
                          handleChange={this.handleChange} 
                          handleSearch={this.handleSearch}
                          handleClear={this.handleClear}
                />
                <TodoList list={this.state.list} 
                          handleRemove={this.handleRemove}
                          handleMarkAsPending={this.handleMarkAsPending}
                          handleMarkAsDone={this.handleMarkAsDone}
                />
            </div>
        )
    }
}