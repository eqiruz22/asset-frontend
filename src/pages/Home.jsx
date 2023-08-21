import React from 'react'
import Sidenav from '../components/Sidenav'
import { Box, Grid, Stack } from '@mui/material'
import Navbar from '../components/Navbar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "../Dash.css"
import Typography from '@mui/material/Typography';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PaymentsIcon from '@mui/icons-material/Payments';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccordionView from '../components/AccordionView';
import BarCharts from '../charts/BarCharts';
const Home = () => {
    return (
        <>
            <div className='bgcolor'>
                <Navbar />
                <Box height={70} />
                <Box sx={{ display: 'flex' }}>
                    <Sidenav />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Stack spacing={2} direction='row'>
                                    <Card sx={{ minWidth: 49 + "%", height: 152 }} className='gradient'>
                                        <CardContent>
                                            <div className='iconstyle'>
                                                <PaymentsIcon />
                                            </div>
                                            <Typography sx={{ color: "#ffffff" }} gutterBottom variant="h5" component="div">
                                                $500.00
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                                                Total Earnings
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ minWidth: 49 + "%", height: 152 }} className='gradient-light'>
                                        <CardContent>
                                            <div className='iconstyle'>
                                                <ShoppingBagIcon />
                                            </div>
                                            <Typography sx={{ color: "#ffffff" }} gutterBottom variant="h5" component="div">
                                                $900.00
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                                                Total Orders
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Stack>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack spacing={2}>
                                    <Card>
                                        <Stack spacing={2} direction={'row'}>
                                            <div className='iconstyle'>
                                                <StorefrontIcon />
                                            </div>
                                            <div className='paddingall'>
                                                <span className='pricetitle'>$230K</span>
                                                <br />
                                                <span className='pricesubtitle'>Total Income</span>
                                            </div>
                                        </Stack>
                                    </Card>
                                    <Card>
                                        <Stack spacing={2} direction={'row'}>
                                            <div className='iconstyle-black'>
                                                <StorefrontIcon />
                                            </div>
                                            <div className='paddingall'>
                                                <span className='pricetitle'>$230K</span>
                                                <br />
                                                <span className='pricesubtitle'>Total Income</span>
                                            </div>
                                        </Stack>
                                    </Card>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Box height={30} />
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Card sx={{ height: 60 + "vh" }}>
                                    <CardContent>
                                        <BarCharts />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card sx={{ height: 60 + "vh" }}>
                                    <CardContent>
                                        <div className='paddingall'>
                                            <span className='pricetitle'>Popular Products</span>
                                        </div>
                                        <AccordionView />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default Home