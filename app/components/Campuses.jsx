import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Campuses extends Component {

  constructor() {
    super();
    this.state = {
      campuses: [],
      campusName: '',
      campusImage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        this.setState({campuses});
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { campusName, campusImage, campuses } = this.state;

    axios.post(`/api/campuses`, {name: campusName, image: campusImage})
      .then(res => {
        const { id, name, image } = res.data;
        const newCampus = {id, name, image};
        this.setState({campuses: [...campuses, newCampus]});
      });
  }

  render() {

    const { campuses } = this.state;
    console.log(this.state)
    return (
      <div className="campuses">
        <h1>Campuses</h1>
        <h3>Create Campus</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="campusName" placeholder="Enter a name" onChange={this.handleChange} />
          </label>
          <label>
            Image:
            <input type="text" name="campusImage" placeholder="Enter an image url" onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </label>
        </form>
        <ul value={campuses}>
          {
            campuses.map(campus => (
              <li key={campus.id}>
                <Link to={`/campuses/${campus.id}`}>
                  <h2>{campus.name}</h2>
                  <img src={campus.image} />
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
