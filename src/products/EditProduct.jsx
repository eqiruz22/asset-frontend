import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
export const EditProduct = ({ id, onDataUpdate }) => {
    const [openModal, setOpenModal] = useState(false)
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState(0)

    const handleClickOpen = async () => {
        setOpenModal(true);
        try {
            const response = await fetch(`http://localhost:5000/product/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setProductName(data.result['name'])
            setPrice(data.result['price'])
        } catch (error) {
            console.log(error);
        }
    }
    const handleClose = () => setOpenModal(false)

    const updateProduct = async () => {
        const data = {
            name: productName,
            price: parseInt(price)
        }
        try {
            const res = await fetch(`http://localhost:5000/product/${id}`, {
                method: "PATCH",
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
                setOpenModal(false)
                Swal.fire({
                    title: 'updated!',
                    text: `${response.message}`,
                    icon: 'success'
                })
            } else {
                Swal.fire({
                    title: 'Something wrong?',
                    text: `${response.message}`,
                    icon: 'error'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <EditIcon style={{ fontSize: '20px', color: 'orange', cursor: 'pointer' }} onClick={handleClickOpen} />
            <Dialog fullWidth={true} maxWidth={'md'} open={openModal} onClose={handleClose}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Product Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
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
                        variant="standard"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateProduct}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
