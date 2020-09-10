import React, { Component, Fragment } from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import Header from './components/Header';
import Products from './components/Products';
import Axios from 'axios';
import AddDialog from './components/DialogForm';


class App extends Component {

  /*const products = [
    { "_id": 1, "name": "AC1 Phone1", "type": "phone", "price": 200.05, "rating": 3.8, "warranty_years": 1, "available": true },
    { "_id": 2, "name": "AC2 Phone2", "type": "phone", "price": 147.21, "rating": 1, "warranty_years": 3, "available": false },
    { "_id": 3, "name": "AC3 Phone3", "type": "phone", "price": 150, "rating": 2, "warranty_years": 1, "available": true },
    { "_id": 4, "name": "AC4 Phone4", "type": "phone", "price": 50.20, "rating": 3, "warranty_years": 2, "available": true }
  ]*/


  constructor(props) {
    super(props)

    this.state = {
      products: [],
      dialog: false
    }
  
    this.openAddDialog = this.openAddDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.rechargeProducts = this.rechargeProducts.bind(this)
  }
  


  componentDidMount() {
    this.rechargeProducts()
  }

  openAddDialog() {
    this.setState({
      dialog: true
    })
  }

  closeDialog() {
    this.rechargeProducts()
    this.setState({
      dialog: false
    })
  }

  rechargeProducts() {
    Axios.get('http://localhost:4000/product/')
    .then(response => {
        this.setState({
          products: response.data
        })
    })
    .catch(err => {
        console.log(err)
    })
  }

  render() {
    return (
      <Fragment>
        <Grid container direction='column' spacing={10}>
        <Grid item>
          <Header openAddDialog={this.openAddDialog}/>
        </Grid>
        <Grid item container>
          <Grid item xs={0} sm={2} />
          <Grid item xs={12} sm={8}>
            <Products products={this.state.products} rechargeProducts={this.rechargeProducts}/>
          </Grid>
          <Grid item xs={0} sm={2} />
        </Grid>
      </Grid>
      {this.state.dialog &&
        <AddDialog closeDialog={this.closeDialog}/>
      }
      </Fragment>
      
    );
  }
}


export default App;
