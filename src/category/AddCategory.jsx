import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';

export const AddCategory = ({ onDataUpdate }) => {
    const [openModal, setOpenModal] = useState(false)
    const [category, setCategory] = useState('')
    const [errorCategory, setErrorCategory] = useState('')

    const handleClickOpen = () => {
        setOpenModal(true)
    }
    const handleClose = () => setOpenModal(false)

    const handleChangeCategory = (event) => {
        const value = event.target.value
        setCategory(value)
        if (value.trim() === '') {
            setErrorCategory('Category name cannot be empty')
        } else {
            setErrorCategory('')
        }
    }

    const addCategory = async () => {
        const data = {
            category: category,
        }

        try {
            const res = await fetch('http://localhost:5000/category', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const response = await res.json()
            if (res.ok) {
                await fetch('http://localhost:5000/Category', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(response => response.json())
                    .then(response => {
                        onDataUpdate(response.result)
                    })
                setCategory('')
                setOpenModal(false)
                Swal.fire({
                    title: 'created!',
                    text: `${response.result}`,
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
                <DialogTitle>Create Category</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Category"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={category}
                        onChange={handleChangeCategory}
                        error={!!errorCategory}
                        helperText={errorCategory}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addCategory}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
