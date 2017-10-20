import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Campus extends Component {

  constructor() {
    super();
    this.state = {
      campuses: [],
      student: {},
      studentName: '',
      studentEmail: '',
      selectedCampusId: '',
      studentDeleted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  componentDidMount() {
    const studentId = this.props.match.params.id;
    let stud;

    axios.get(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(student => {
        stud = student;
        return axios.get('/api/campuses');
      })
      .then(res => res.data)
      .then(campuses => {
        return this.setState({
          campuses,
          student: stud
      });
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { studentName, studentEmail, selectedCampusId } = this.state;

    axios.put(`/api/students/${this.props.match.params.id}`, {name: studentName, email: studentEmail, campusId: selectedCampusId})
      .then(res => {
        const { id, name, email, campusId } = res.data;
        const updatedStudent = { id, name, email, campusId };
        this.setState({student: updatedStudent});
      });
  }

  deleteStudent(event) {
    event.preventDefault();
    const studentId = Number(event.target.value);
    const studentName = event.target.name;

    axios.delete(`/api/students/${studentId}`, {studentId})
      .then(res => res.data)
      .then(student => {
        this.setState({
          student: `${studentName} kicked out of the solar system!`,
          students: [...this.state.students],
          studentDeleted: true
        });
        console.log(student)
      });
  }

  render() {

    const { student, campuses } = this.state;
    console.log(this.state.studentDeleted)

    return (
      <div>
        <h1>{student.name}'s Profile</h1>
        <h3>Update Student</h3>
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
        <div>
          <button onClick={this.deleteStudent} value={student.id} name={student.name} className="delete-student">Delete Student</button>
        </div>
        <div>
          {
            student.campus &&
            <h3>{student.name} -- {student.email} --
              <Link to={`/campuses/${student.campus.id}`}>{student.campus.name}</Link>
            </h3>
          }
        </div>
      </div>
    );
  }
}
