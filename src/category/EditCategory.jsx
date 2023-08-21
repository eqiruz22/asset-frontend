import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

export const EditCategory = ({ id, onDataUpdate }) => {
    const [openModal, setOpenModal] = useState(false)
    const [category, setCategory] = useState('')
    const [errorCategory, setErrorCategory] = useState('')

    const handleClickOpen = async () => {
        setOpenModal(true)
        try {
            await fetch(`http://localhost:5000/category/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => response.json())
                .then(response => {
                    setCategory(response.result['categoryName'])
                })
        } catch (error) {
            console.log(error)
        }
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

    const updateCategory = async () => {
        const data = {
            category: category,
        }

        try {
            const res = await fetch(`http://localhost:5000/category/${id}`, {
                method: "PATCH",
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
            <EditIcon style={{ fontSize: '20px', color: 'orange', cursor: 'pointer' }} onClick={handleClickOpen} />
            <Dialog fullWidth={true} maxWidth={'md'} open={openModal} onClose={handleClose}>
                <DialogTitle>Edit Category</DialogTitle>
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
                    <Button onClick={updateCategory}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
