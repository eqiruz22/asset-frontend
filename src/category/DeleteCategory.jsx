import React from 'react'
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteCategory = ({ id, onDataUpdate }) => {
    const deleteCategory = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`http://localhost:5000/category/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    const response = await res.json();
                    if (res.ok) {
                        await fetch('http://localhost:5000/category', {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then(response => response.json())
                            .then(response => {
                                onDataUpdate(response.result)
                            })
                        Swal.fire({
                            title: 'deleted!',
                            text: `${response.result}`,
                            icon: 'success'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }
    return (
        <>
            <DeleteIcon style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }} sx={{ marginLeft: 1 }} onClick={deleteCategory} />
        </>
    )
}
