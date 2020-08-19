/*
  To render meal list
  on: componentDidMount(), make a request to localhost:5000/meals/
  * Append the data to state: meals
  
  display meals in Meal format



    {
    "foodEaten": [],
    "_id": "5f3b256e74470d159fc13cd1",
    "username": "Daniel",
    "description": "blah",
    "date": "2020-08-18T00:48:30.848Z",
    "createdAt": "2020-08-18T00:48:46.701Z",
    "updatedAt": "2020-08-18T00:48:46.701Z",
    "__v": 0
  },



*/


import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



const Meal = props => (
  <tr>
    <td>{props.meal.username}</td>
    <td>{props.meal.mealType}</td>
    <td>{props.meal.foodEaten}</td>
    <td>{props.meal.bodyAffect}</td>
    <td>{props.meal.time}</td>

    <td>{props.meal.date.substring(0,10)}</td>
    <td>
    <Link to={"/edit/"+props.meal._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMeal(props.meal._id) }}>delete</a>
    </td>
  </tr>
)

export default class mealsList extends Component {
  constructor(props) {
    super(props);

    this.deleteMeal = this.deleteMeal.bind(this)

    this.state = {meals: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/meals/')
      .then(response => {
        this.setState({ meals: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteMeal(id) {
    axios.delete('http://localhost:5000/meals/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      meals: this.state.meals.filter(el => el._id !== id)
    })
  }

  mealList() {
    return this.state.meals.map(currentMeal => {
      return <Meal meal={currentMeal} deleteMeal={this.deleteMeal} key={currentMeal._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged meals</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
            <th>Username</th>
               <th>Meal Type</th>
               <th>Food Ate</th>
               <th>How it made me feel</th>
               <th>Time</th>
               <th>Date</th>
               <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.mealList() }
          </tbody>
        </table>
      </div>
    )
  }
}