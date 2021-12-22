import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ReceiptsList from "./components/receipts-list.component";
import EditReceipt from "./components/edit-receipt.component";
import CreateReceipt from "./components/create-receipt.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ReceiptsList} />
      <Route path="/edit/:id" component={EditReceipt} />
      <Route path="/create" component={CreateReceipt} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
