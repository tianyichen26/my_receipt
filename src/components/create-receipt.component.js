import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateReceipt extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeReceiptname = this.onChangeReceiptname.bind(this);
    this.onChangeLink = this.onChangeLink.bind(this);
    this.onChangeLike = this.onChangeLike.bind(this);

    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      receiptname: '',
      link:'',
      like:0,
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5001/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeReceiptname(e) {
    this.setState({
      receiptname: e.target.value
    })
  }

  onChangeLink(e) {
    this.setState({
      link: e.target.value
    })
  }
  onChangeLike(e) {
    this.setState({
      like: e.target.value
    })
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const receipt = {
      username: this.state.username,
      receiptname: this.state.receiptname,
      link: this.state.link,
      like: this.state.like,
      duration: this.state.duration,
      date: this.state.date
    }

    axios.post('http://localhost:5001/receipts/add', receipt)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Receipt</h3>
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
          <label>Receiptname: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.receiptname}
              onChange={this.onChangeReceiptname}
              />
        </div>
        <div className="form-group">
          <label>External link: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.link}
              onChange={this.onChangeLink}
              />
        </div>
        <div className="form-group">
          <label>Time taken (in minutes): </label>
          <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
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
          <input type="submit" value="Create Receipt" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}