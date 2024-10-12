import React from 'react'
import { Check, Trash2 } from 'lucide-react'
import { Todo } from '../api/todo'

interface TodoItemProps {
	todo: Todo
	onToggle: () => void
	onDelete: () => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
	return (
		<li className="flex items-center bg-gray-50 p-3 rounded-md">
			<button
				onClick={onToggle}
				className={`mr-2 p-1 rounded-full ${todo.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
					}`}
			>
				<Check size={16} />
			</button>
			<span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
				{todo.text}
			</span>
			<button
				onClick={onDelete}
				className="text-red-500 hover:text-red-700"
			>
				<Trash2 size={20} />
			</button>
		</li>
	)
}

export default TodoItem
