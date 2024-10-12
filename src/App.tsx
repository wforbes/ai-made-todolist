import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import TodoItem from './components/TodoItem'
import { getTodos, createTodo, updateTodo, deleteTodo, Todo } from './api/todo'

function App() {
	const [todos, setTodos] = useState<Todo[]>([])
	const [newTodoText, setNewTodoText] = useState('')

	useEffect(() => {
		fetchTodos()
	}, [])

	const fetchTodos = async () => {
		try {
			const fetchedTodos = await getTodos()
			setTodos(fetchedTodos)
		} catch (error) {
			console.error('Error fetching todos:', error)
		}
	}

	const handleAddTodo = async (e: React.FormEvent) => {
		e.preventDefault()
		if (newTodoText.trim()) {
			try {
				const newTodo = await createTodo(newTodoText)
				setTodos([...todos, newTodo])
				setNewTodoText('')
			} catch (error) {
				console.error('Error adding todo:', error)
			}
		}
	}

	const handleToggleTodo = async (id: number) => {
		const todoToUpdate = todos.find(todo => todo.id === id)
		if (todoToUpdate) {
			try {
				const updatedTodo = await updateTodo(id, { completed: !todoToUpdate.completed })
				setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
			} catch (error) {
				console.error('Error updating todo:', error)
			}
		}
	}

	const handleDeleteTodo = async (id: number) => {
		try {
			await deleteTodo(id)
			setTodos(todos.filter(todo => todo.id !== id))
		} catch (error) {
			console.error('Error deleting todo:', error)
		}
	}

	return (
		<div className="container mx-auto p-4">
			<Helmet>
				<title>Todo List App</title>
			</Helmet>
			<h1 className="text-2xl font-bold mb-4">Todo List</h1>
			<form onSubmit={handleAddTodo} className="mb-4">
				<input
					type="text"
					value={newTodoText}
					onChange={(e) => setNewTodoText(e.target.value)}
					placeholder="Add a new todo"
					className="border p-2 mr-2"
				/>
				<button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Todo</button>
			</form>
			<ul>
				{todos.map(todo => (
					<TodoItem
						key={todo.id}
						todo={todo}
						onToggle={() => handleToggleTodo(todo.id)}
						onDelete={() => handleDeleteTodo(todo.id)}
					/>
				))}
			</ul>
		</div>
	)
}

export default App
