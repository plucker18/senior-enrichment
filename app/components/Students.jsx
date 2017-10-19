import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Students extends Component {
  constructor() {
    super();
    this.state = {
      campuses: [],
      students: [],
      studentName: '',
      studentEmail: '',
      selectedCampusId: '',
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let studs;
    axios.get('api/students')
      .then(res => res.data)
      .then(students => {
        studs = students;
        console.log('STUDENT', studs)
        return axios.get('api/campuses');
      })
      .then(res => res.data)
      .then(campuses => {
        console.log(`CAMPUSES: ${campuses}`)
        return this.setState({
          campuses,
          students: studs
      });
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { studentName, studentEmail, students } = this.state;
    const selectedCampusId = Number(this.state.selectedCampusId);
    axios.post(`/api/students`, {name: studentName, email: studentEmail, campusId: selectedCampusId})
      .then(res => {
        const { id, name, email, campusId } = res.data;
        const newStudent = {id, name, email, campusId};
        this.setState({students: [...students, newStudent]});
      });
  }

  render() {
    const { students, campuses } = this.state;

    return (
      <div className="students">
        <h1>Students</h1>
        <h3>Create Student</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="studentName" placeholder="Enter a name" onChange={this.handleChange} />
            Email:
            <input type="text" name="studentEmail" placeholder="Enter an email" onChange={this.handleChange} />
            <select name="selectedCampusId" onClick={this.handleChange}>
              <option selected disabled>--Select School--</option>
              {
                campuses.map(campus => (
                  <option value={campus.id} key={campus.id}>{campus.name}</option>
                ))
              }
            </select>
            <input type="submit" value="Submit" />
          </label>
        </form>
        <ul value={students}>
          {
            students.map(student => (
              <li key={student.id} value={student}>
                <Link to={`/students/${student.id}`}>{`Name: ${student.name} -- Email: ${student.email}`}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
