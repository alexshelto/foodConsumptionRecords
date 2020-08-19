


import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateMeal extends Component {
  constructor(props){
    super(props);

    //Binding 'this' to the methods
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeMealType = this.onChangeMealType.bind(this);
    this.onChangeFoodEaten = this.onChangeFoodEaten.bind(this);
    this.onChangeBodyAffect = this.onChangeBodyAffect.bind(this);

    this.onchangeDate = this.onchangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


      this.state = {
        username : '',
        mealType : '',
        foodEaten : [],
        bodyAffect: '',
        date: new Date(),
        users: [],
        types: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Desert']
      }
    }

    componentDidMount() {
      axios.get('http://localhost:5000/meals/' + this.props.match.params.id)
        .then(response => {
          this.setState({
            username: response.data.username,
            mealType: response.data.mealType,
            foodEaten: response.data.foodEaten,
            bodyAffect: response.data.bodyAffect,
            data: new Date(response.data.date)
          })
        })
        .catch(error => console.log(error));

        //Grabbing users and putting them in this.state.users
        axios.get('http://localhost:5000/users/').then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username)
          })
        }
      })
    .catch(error => console.log(error));
    }




  onChangeUsername(e){
    this.setState({username: e.target.value});
    }

  onChangeMealType(e){
    this.setState({mealType: e.target.value});
    }

  onChangeFoodEaten(e){
    this.setState({foodEaten: e.target.value.split(',')});
  }

  onChangeBodyAffect(e){
    this.setState({bodyAffect: e.target.value});
  }

  onchangeDate(date){
    this.setState({date: date});
    }

  onSubmit(e){
    e.preventDefault(); //not to behave like normal onSubmi
    const meal = {
      username: this.state.username,
      mealType: this.state.mealType,
      foodEaten: this.state.foodEaten,
      bodyAffect: this.state.bodyAffect,
      date: this.state.date
    }
    console.log(meal);

    //sending the POST request
    axios.post('http://localhost:5000/meals/update/'+this.props.match.params.id, meal)
      .then(res => { console.log(res.data); //response message from server 
    })

    window.location = '/'; //sends user to homepage
}


    render(){
        return (
            <div>
            <h3>Edit Meal</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                      this.state.users.map(function(user) {
                        return <option 
                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>

              <div className="form-group"> 
                <label>Meal Type: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.mealType}
                    onChange={this.onChangeMealType}>
                    {
                      this.state.types.map(function(type) {
                        return <option 
                          key={type}
                          value={type}>{type}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Food Eaten: <p>seperate with commas</p> </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.foodEaten}
                    onChange={this.onChangeFoodEaten}
                    />
              </div>

              <div className="form-group"> 
                <label>How it made you feel: </label>
                <input  type="text"
                    className="form-control"
                    value={this.state.bodyAffect}
                    onChange={this.onChangeBodyAffect}
                    />
              </div>
              
              <div className="form-group">
                <label>Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>
      
              <div className="form-group">
                <input type="submit" value="Edit Meal Log" className="btn btn-primary" />
              </div>
            </form>
          </div>
        );
    }
}