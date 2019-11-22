import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
	<tr>
		<td className={ props.todo.completed ? "completed" : "" }>{ props.todo.description }</td>
		<td className={ props.todo.completed ? "completed" : "" }>{ props.todo.responsible }</td>
		<td className={ props.todo.completed ? "completed" : "" }>{ props.todo.priority }</td>
		<td>
			<Link to={"/edit/" + props.todo._id}>Edit</Link>
		</td>
	</tr>
)

export default class TodosList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: []
		};
	};

	componentDidMount() {
		axios.get('http://localhost:4000/todos')
			.then(res => this.setState({ todos: res.data }))
			.catch(err => console.log(err));
	};

	componentDidUpdate() {
		axios.get('http://localhost:4000/todos')
			.then(res => this.setState({ todos: res.data }))
			.catch(err => console.log(err));
	}

	todoList() {
		return this.state.todos.map((currentTodo, i) => {
			return <Todo todo={currentTodo} key={i} />
		})
	}

	render() {
		return (
			<div>
				<h3>Todos List</h3>
				<table className="table table-striped" style={{marginTop: '20px'}}>
					<thead>
						<tr>
							<th>Description</th>
							<th>Responsible</th>
							<th>Priority</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{ this.todoList() }
					</tbody>
				</table>
			</div>
		)
	}
};