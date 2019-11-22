import React from 'react';
import axios from 'axios';

export default class CreateTodo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
			responsible: '',
			priority: '',
			completed: false
		};
		this.onChange = this.onChange.bind(this);
		this.onChangePriority = this.onChangePriority.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	};

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onChangePriority(e) {
		this.setState({
			priority: e.target.value
		})
	}

	onSubmit(e) {
		e.preventDefault();

		const newTodo = {
			description: this.state.description,
			responsible: this.state.responsible,
			priority: this.state.priority,
			completed: this.state.completed
		}

		axios.post('http://localhost:4000/todos/add', newTodo)
			.then(res => console.log(res.data))
			.catch(err => console.log(err));

		this.setState({
			description: '',
			responsible: '',
			priority: '',
			completed: false
		});
	};

	render() {
		return (
			<div style={{marginTop: '20'}}>
				<h3>Create New Todo</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Description:</label>
						<input 
							type="text"
							name="description"
							className="form-control"
							value={this.state.description}
							onChange={this.onChange}
						/>
					</div>

					<div className="form-group">
						<label>Responsible:</label>
						<input 
							type="text"
							name="responsible"
							className="form-control"
							value={this.state.responsible}
							onChange={this.onChange}
						/>
					</div>

					<div className="form-group">
						<div className="form-check form-check-inline">
							<input 
								className="form-check-input" 
								type="radio"
								name="priorityOptions"
								id="priorityLow"
								value="Low"
								checked={this.state.priority === 'Low'}
								onChange={this.onChangePriority}
							/>
							<label className="form-check-label"> Low</label>
						</div>

						<div className="form-check form-check-inline">
							<input 
								className="form-check-input" 
								type="radio"
								name="priorityOptions"
								id="priorityMedium"
								value="Medium"
								checked={this.state.priority === 'Medium'}
								onChange={this.onChangePriority}
							/>
							<label className="form-check-label"> Medium</label>
						</div>

						<div className="form-check form-check-inline">
							<input 
								className="form-check-input" 
								type="radio"
								name="priorityOptions"
								id="priorityHigh"
								value="High"
								checked={this.state.priority === 'High'}
								onChange={this.onChangePriority}
							/>
							<label className="form-check-label"> High</label>
						</div>
					</div>
					<div className="form-group">
						<input 
							type="submit" 
							value="Create Todo"
							className="btn btn-primary btn-block"
						/>
					</div>
				</form>
			</div>
		);
	};
};