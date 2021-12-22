import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Receipt = props => (
  <tr>
    <td>{props.receipt.username}</td>
    <td>{props.receipt.receiptname}</td>
    <td>{props.receipt.link}</td>
    <td>{props.receipt.like}</td>

    <td>{props.receipt.duration}</td>
    <td>{props.receipt.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.receipt._id}>edit</Link> | <a href="#" onClick={() => { props.deleteReceipt(props.receipt._id) }}>delete</a>
    </td>
  </tr>
)

export default class ReceiptsList extends Component {
  constructor(props) {
    super(props);

    this.deleteReceipt = this.deleteReceipt.bind(this)

    this.state = {receipts: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5001/receipts/')
      .then(response => {
        this.setState({ receipts: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteReceipt(id) {
    axios.delete('http://localhost:5001/receipts/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      receipts: this.state.receipts.filter(re => re._id !== id)
    })
  }

  receiptList() {
    return this.state.receipts.map(currentreceipt => {
      return <Receipt receipt={currentreceipt} deleteReceipt={this.deleteReceipt} key={currentreceipt._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Receipts</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>External Link</th>
              <th>likes</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.receiptList() }
          </tbody>
        </table>
      </div>
    )
  }
}