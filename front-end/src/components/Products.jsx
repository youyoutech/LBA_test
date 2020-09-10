import React from 'react';
import { Grid } from '@material-ui/core';
import ProductCard from './ProductCard';


const Products = (props) => {

    let productList = props.products.map(product => {
        return (
            <Grid key={product._id} item xs={12} sm={4}>
                <ProductCard product={product} rechargeProducts={props.rechargeProducts}/>
            </Grid>
        )
    })

    return (
        <Grid container spacing={4}>
            {productList}
        </Grid>
    )
}

export default Products