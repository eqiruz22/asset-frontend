import React, { useState, useEffect, Fragment } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Divider, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { AddCategory } from './AddCategory';
import { EditCategory } from './EditCategory';
import { DeleteCategory } from './DeleteCategory';

const formatDate = (date) => {
    const dates = new Date(date)
    const year = dates.getFullYear();
    const month = String(dates.getMonth() + 1).padStart(2, "0");
    const day = String(dates.getDate()).padStart(2, "0");
    const hour = String(dates.getHours()).padStart(2, "0");
    const minute = String(dates.getMinutes()).padStart(2, "0");
    const second = String(dates.getSeconds()).padStart(2, "0");
    return [`${year}-${month}-${day} ${hour}:${minute}:${second}`]
}

const sleep = (delay = 0) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

export default function CategoryList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [category, setCategory] = useState([])
    const [row, setRow] = useState([])
    const [options, setOptions] = useState([])
    const [open, setOpen] = useState(false)
    const loading = open && options.length === 0

    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await fetch('http://localhost:5000/category', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await res.json()
                console.log(data)
                setCategory(data.result)
            } catch (error) {
                console.log(error)
            }
        }
        getCategory()
    }, [])

    useEffect(() => {
        let active = true
        if (!loading) {
            return undefined
        }

        (async () => {
            await sleep(3e3)
            if (active) {
                setOptions(category)
            }
        })()

        return () => {
            active = false
        }
    }, [loading, category])

    useEffect(() => {
        if (!open) {
            setOptions([])
        }
    }, [open])

    useEffect(() => {
        if (row) {
            setCategory([row])
        } else {
            const getCategory = async () => {
                try {
                    const res = await fetch('http://localhost:5000/category', {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    const data = await res.json()
                    setCategory(data.result)
                } catch (error) {
                    console.log(error)
                }
            }
            getCategory()
        }
    }, [row])

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography
                gutterBottom
                variant='h5'
                component={'div'}
                sx={{ padding: '20px' }}
            >
                Category
            </Typography>
            <Divider />
            <Box height={20} />
            <Stack direction={'row'} spacing={2}>

                <Autocomplete
                    id='Category'
                    sx={{ width: 300 }}
                    style={{ marginLeft: 20 }}
                    onChange={(event, value) => setRow(value)}
                    open={open}
                    onOpen={() => {
                        setOpen(true)
                    }}
                    onClose={() => {
                        setOpen(false)
                    }}
                    isOptionEqualToValue={(option, value) => option.categoryName === value.categoryName}
                    getOptionLabel={(option) => option.categoryName}
                    options={options}
                    noOptionsText={'No Category Found'}
                    loading={loading}
                    loadingText={'Fetching Category...'}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Category'
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <Fragment>
                                        {loading ? <CircularProgress color='inherit' size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </Fragment>
                                )
                            }}
                        />
                    )}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
                <AddCategory onDataUpdate={setCategory} />
            </Stack>
            <Box height={10} />
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`data-product`}>
                            <TableCell
                                align={'left'}
                                style={{ minWidth: '100px' }}
                            >
                                #
                            </TableCell>
                            <TableCell
                                align={'left'}
                                style={{ minWidth: '100px' }}
                            >
                                Category Name
                            </TableCell>
                            <TableCell
                                align={'left'}
                                style={{ minWidth: '100px' }}
                            >
                                Created At
                            </TableCell>
                            <TableCell
                                align={'left'}
                                style={{ minWidth: '100px' }}
                            >
                                Updated At
                            </TableCell>
                            <TableCell
                                align={'left'}
                                style={{ minWidth: '100px' }}
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {category.length > 0 ?
                            category.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={`${index + row.id}`}>
                                            <TableCell key={index * 2} align={'left'}>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell key={`category_name`} align={'left'}>
                                                {row.categoryName}
                                            </TableCell>
                                            <TableCell key={`createdAt`} align={'left'}>
                                                {formatDate(row.createdAt)}
                                            </TableCell>
                                            <TableCell key={`updatedAt`} align={'left'}>
                                                {row.updatedAt !== null ? formatDate(row.updatedAt) : 'Waiting Update'}
                                            </TableCell>
                                            <TableCell key={`category_action`} align={'left'}>
                                                <EditCategory id={row.id} onDataUpdate={setCategory} />
                                                <DeleteCategory id={row.id} onDataUpdate={setCategory} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                }) :
                            <TableRow hover>
                                <TableCell align='center' colSpan={7} style={{ fontWeight: 'bold' }}>
                                    No data Found!
                                </TableCell>
                            </TableRow>

                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={category.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}