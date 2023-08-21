import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import { MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';


export const AddProduct = ({ onDataUpdate }) => {
    const [openModal, setOpenModal] = useState(false)
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState(0)
    const [options, setOptions] = useState([])
    const [name, setName] = useState('')
    const [errorProduct, setErrorProduct] = useState('')
    const [errorPrice, setErrorPrice] = useState('')
    const [errorName, setErrorName] = useState('')

    const handleClickOpen = () => {
        setOpenModal(true)
        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:5000/user', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const response = await res.json()
                setOptions(response.result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }
    const handleClose = () => setOpenModal(false)

    const handleChangeProduct = (event) => {
        const value = event.target.value
        setProductName(value)
        if (value.trim() === '') {
            setErrorProduct('Product name cannot be empty')
        } else {
            setErrorProduct('')
        }
    }

    const handleChangePrice = (event) => {
        const value = event.target.value
        setPrice(value)
        if (value.trim() === '') {
            setErrorPrice('Product price cannot be empty')
        } else if (parseFloat(value) === 0) {
            setErrorPrice('Product price cannot be set to 0')
        } else {
            setErrorPrice('')
        }
    }

    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const addProduct = async () => {
        const data = {
            name: productName,
            price: parseInt(price),
            user: parseInt(name)
        }

        try {
            const res = await fetch('http://localhost:5000/product', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const response = await res.json()
            if (res.ok) {
                await fetch('http://localhost:5000/product', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(response => response.json())
                    .then(response => {
                        onDataUpdate(response.result)
                    })
                setProductName('')
                setPrice(0)
                setName('')
                setOpenModal(false)
                Swal.fire({
                    title: 'created!',
                    text: `${response.message}`,
                    icon: 'success'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <Button variant='contained' color="primary" onClick={handleClickOpen} style={{ marginRight: 20, marginTop: 10 }}>
                Add
            </Button>
            <Dialog fullWidth={true} maxWidth={'md'} open={openModal} onClose={handleClose}>
                <DialogTitle>Create Product</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Product Name"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={productName}
                        onChange={handleChangeProduct}
                        error={!!errorProduct}
                        helperText={errorProduct}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Product Price"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={price}
                        onChange={handleChangePrice}
                        error={!!errorPrice}
                        helperText={errorPrice}
                    />
                </DialogContent>
                <DialogContent>
                    <InputLabel id="userId">Name</InputLabel>
                    <Select
                        labelId="userId"
                        id="userId"
                        value={name}
                        fullWidth
                        variant="standard"
                        label="Name"
                        onChange={handleChangeName}
                    >
                        <MenuItem value={''}>--Choose one--</MenuItem>
                        {options.map((item, index) =>
                            <MenuItem value={item.id} key={index * 2}>{item.firstName}</MenuItem>
                        )}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addProduct}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
