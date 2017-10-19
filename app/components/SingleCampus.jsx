import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SingleCampus extends Component {

  constructor() {
    super();
    this.state = {
      allStudents: [],
      campus: {},
      campusName: '',
      campusImage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteCampus = this.deleteCampus.bind(this);
  }

  componentDidMount() {
    const campusId = this.props.match.params.campusId;
    console.log(campusId)
    let returnedCampus;
    axios.get(`/api/campuses/${campusId}`)
      .then(res => res.data)
      .then(campus => {
        returnedCampus = campus;
        return axios.get('/api/students');
      })
      .then(res => res.data)
      .then(students => {
        return this.setState({
          allStudents: students,
          campus: returnedCampus
      });
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { campusName, campusImage } = this.state;

   axios.put(`/api/campuses/${this.state.campus.id}`, {name: campusName, image: campusImage})
    .then(res => {
      const { id, name, image } = res.data;
      const updatedCampus = { id, name, image };
      this.setState({campus: updatedCampus});
    });
  }

  deleteCampus(event) {
    event.preventDefault();
    const campusId = Number(event.target.value);
    const campusName = event.target.name;

    axios.delete(`/api/campuses/${campusId}`, {campusId})
      .then(res => {
        this.setState({campuses: [...this.state.campuses]});
        res.send(`${campusName} has been defunded`);
      });
  }

  render() {

    const { campus, allStudents } = this.state;
    const students = campus.students;
console.log('INSIDE RENDER', allStudents)
    return (
      <div>
        <h1>{campus.name}</h1>
        <form onSubmit={this.handleSubmit}>
          <h3>Update Campus</h3>
          <label>
            Name:
          <input type="text" name="campusName" placeholder="Enter a name" onChange={this.handleChange} />
            Image:
          <input type="text" name="campusImage" placeholder="Enter an image url" onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </label>
        </form>
        <img src={campus.image} />
        <button onClick={this.deleteCampus} value={campus.id} name={campus.name}>Delete Campus</button>
        <div>
          {
            students && Object.keys(students).map(student => (
              <li key={students[student].id}>
                <Link to={`/students/${students[student].id}`}>
                  {`Name: ${students[student].name} -- Email: ${students[student].email}`}
                </Link>
              </li>
            ))
          }
        </div>
      </div>
    );
  }
}

