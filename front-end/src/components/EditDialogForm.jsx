import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { DialogContent, TextField, MenuItem } from '@material-ui/core';
import Axios from 'axios';

const availability = [
    {
      value: 'true',
      label: 'Disponible',
    },
    {
      value: 'false',
      label: 'Non Disponible',
    }
  ];

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditDialog(props) {
    const classes = useStyles();

    const [name, setName] = useState(props.product.name);
    const [type, setType] = useState(props.product.type);
    const [price, setPrice] = useState(props.product.price);
    const [rating, setRating] = useState(props.product.rating);
    const [warranty_years, setWarrantyYears] = useState(props.product.warranty_years);
    const [available, setAvailable] = useState(props.product.available);



    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeType = (e) => {
        setType(e.target.value)
    }

    const onChangePrice = (e) => {
        setPrice(e.target.value)
    }

    const onChangeRating = (e) => {
        setRating(e.target.value)
    }

    const onChangeWarrantyYears = (e) => {
        setWarrantyYears(e.target.value)
    }

    const onChangeAvailable = (e) => {
        setAvailable(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const product = {
            name: name,
            type: type,
            price: price,
            rating: rating,
            warranty_years: warranty_years,
            available: available
        }

        if (checkValidateForm()) {
            Axios.put('http://localhost:4000/product/' + props.product._id, product)
                .then(response => {
                    if (response.status === 200) {
                        alert(response.data.message)
                        props.rechargeProducts()
                        props.closeDialog()
                    } else {
                        alert(response.data.message)
                    }
                })
        }

    }

    const checkValidateForm = () => {
        if (name.length < 5) {
            alert("Le nom du produit doit contenir 5 caractères minimum")
            return false
        }
        else if (type === "") {
            alert("Veuillez choisir un type pour votre produit")
            return false
        }
        else if (price < 0) {
            alert("Veuillez choisir un nombre positif pour le prix de votre produit")
            return false
        }
        else if (rating < 0 || rating > 5) {
            alert("Veuillez choisir un nombre entre 0 et 5 pour la notation")
            return false
        }
        else if (warranty_years < 0) {
            alert("Le nombre d'années de garantie ne peut pas être négatif")
            return false
        }
        else
            return true
    }

    return (
        <Fragment>
            <Dialog fullScreen open={true} onClose={props.closeDialog} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.closeDialog} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Modifier {props.product.name}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={onSubmit}>
                            Valider
            </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nom du produit"
                        type="text"
                        fullWidth
                        required
                        onChange={onChangeName}
                        value={name}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="type"
                        label="Type du produit"
                        type="text"
                        fullWidth
                        onChange={onChangeType}
                        required
                        value={type}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Prix (€)"
                        type="number"
                        fullWidth
                        onChange={onChangePrice}
                        required
                        value={price}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="rating"
                        label="Notation"
                        type="number"
                        fullWidth
                        onChange={onChangeRating}
                        required
                        value={rating}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="warranty_years"
                        label="Garantie (en années)"
                        type="number"
                        fullWidth
                        onChange={onChangeWarrantyYears}
                        required
                        value={warranty_years}
                    />
                    <TextField
                        id="available"
                        select
                        label="Diponibilité"
                        value={available}
                        onChange={onChangeAvailable}
                    >
                        {availability.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}