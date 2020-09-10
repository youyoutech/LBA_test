import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CardHeader, Avatar, IconButton } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { red, green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';
import EditDialog from './EditDialogForm';


const useStyles = makeStyles({
    title: {
        fontSize: 10,
    },
    available: {
        fontSize: 15,
        color: green[500]
    },
    non_available: {
        fontSize: 15,
        color: red[500]
    },

    pos: {
        marginBottom: 12,
        fontSize: 20
    },
});

const ProductCard = (props) => {

    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)

    const handleClickOpen = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleDelete = () => {
        Axios.delete('http://localhost:4000/product/' + props.product._id)
            .then(response => {
                alert(response.data.message)
                props.rechargeProducts()
            })
            .catch(err => {
                alert(err)
            })
    }


    const classes = useStyles();
    let available;
    if (props.product.available) {
        available = <Typography className={classes.available} gutterBottom>Disponible</Typography>
    } else {
        available = <Typography className={classes.non_available} gutterBottom>Non Disponible</Typography>
    }

    return (
        <Fragment>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>
                            {props.product.rating}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={handleClickOpen}>
                            <DeleteOutlineIcon />
                        </IconButton>
                    }
                    title={props.product.type} />
                <CardContent>
                    {available}
                    <Typography align="center" variant="h5" component="h2">
                        {props.product.name}
                    </Typography>
                    <Typography align="center" className={classes.pos} color="textSecondary">
                        {props.product.price} €
                </Typography>

                    <Typography align="center" variant="body2" component="p">
                        <strong>Garantie: </strong>{props.product.warranty_years} an(s)
                </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={handleClickOpenEdit} color='primary' variant='contained' size="small">
                        Modifier...
                </Button>
                </CardActions>
            </Card>
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Suppression de " + props.product.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Voulez-vous vraiment supprimer "{props.product.name}" ?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Non
          </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Oui
          </Button>
                </DialogActions>
            </Dialog>

            {openEdit &&
                <EditDialog product={props.product} closeDialog={handleCloseEdit} rechargeProducts={props.rechargeProducts} />
            }
        </Fragment>
    )
}

export default ProductCard