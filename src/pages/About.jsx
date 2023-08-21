import React from 'react'
import Sidenav from '../components/Sidenav'
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import CategoryList from '../category/CategoryList'

const About = () => {
    return (
        <>
            <div className='bgcolor'>
                <Navbar />
                <Box height={70} />
                <Box sx={{ display: 'flex' }}>
                    <Sidenav />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <CategoryList />
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default About