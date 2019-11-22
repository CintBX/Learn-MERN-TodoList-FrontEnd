import React from 'react';
import axios from 'axios';

export default class EditTodo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			description: '',
			responsible: '',
			priority: '',
			completed: false,
		};

		this.onChange = this.onChange.bind(this);
		this.onChangeCompleted = this.onChangeCompleted.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	};

	componentDidMount() {
		axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
			.then(res => {
				this.setState({
					description: res.data.description,
					responsible: res.data.responsible,
					priority: res.data.priority,
					completed: res.data.completed
				});
			})
			.catch(err => console.log(err));
	};

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	};

	onChangeCompleted(){
		this.setState({ completed: !this.state.completed })
	};

	onSubmit(e) {
		e.preventDefault();

		const object = {
			description: this.state.description,
			responsible: this.state.responsible,
			priority: this.state.priority,
			completed: this.state.completed
		}

		axios.post('http://localhost:4000/todos/edit/' + this.props.match.params.id, object)
			.then(res => console.log(object))
			.catch(err => console.log(err));

		this.props.history.push('/');
	};

	render() {
		return (
			<div>
				<h3>Update Todo</h3>
				<form onSubmit={this.onSubmit}>
					{/*Description field*/}
					<div className="form-group">
						<label>Description: </label>
						<input 
							type="text"
							className="form-control"
							name="description"
							value={this.state.description}
							onChange={this.onChange}
						/>
					</div>

					{/*Responsible field*/}
					<div className="form-group">
						<label>Responsible: </label>
						<input 
							type="text"
							className="form-control"
							name="responsible"
							value={this.state.responsible}
							onChange={this.onChange}
						/>
					</div>

					{/*Priority radio buttons*/}
					<div className="form-group">
						<div className="form-check form-check-inline">
							<input 
								className="form-check-input"
								type="radio"
								name="priority"
								id="priorityLow"
								value="Low"
								checked={this.state.priority === 'Low'}
								onChange={this.onChange}
							/>
							<label className="form-check-label">Low</label>
						</div>

						<div className="form-check form-check-inline">
							<input 
								className="form-check-input"
								type="radio"
								name="priority"
								id="priorityMedium"
								value="Medium"
								checked={this.state.priority === 'Medium'}
								onChange={this.onChange}
							/>
							<label className="form-check-label">Medium</label>
						</div>

						<div className="form-check form-check-inline">
							<input 
								className="form-check-input"
								type="radio"
								name="priority"
								id="priorityHigh"
								value="High"
								checked={this.state.priority === 'High'}
								onChange={this.onChange}
							/>
							<label className="form-check-label">High</label>
						</div>
					</div>

					{/*Completed checkbox*/}
					<div className="form-check">
						<input 
							type="checkbox"
							className="form-check-input"
							id="completedCheckbox"
							name="completedCheckbox"
							onChange={this.onChangeCompleted}
							checked={this.state.completed}
							value={this.state.completed}
						/>
						<label className="form-check-label" htmlFor="completedCheckbox">
							Completed
						</label>
					</div>
					<br/>

					{/*Submit*/}
					<div className="form-group">
						<input 
							type="submit" 
							value="Update Todo" 
							className="btn btn-primary btn-block" 
						/>
					</div>
				</form>
			</div>
		);
	};
};