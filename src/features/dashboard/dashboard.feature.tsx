import React from 'react'
import Chart from './chart'
import { Box, Card } from '@mui/material'
import UserList from './user-list'
import OrderList from './order-list'
import RejectedChart from './rejected-sales'

const DashboardPage = () => {
  return (
   <Box>
   
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Card sx={{width: '60%'}}>
            <Chart/>
        </Card>
        <Box sx={{width: '35%'}}>
        <UserList/>
        </Box>
    </Box>
    <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 5}}>
    <Box sx={{width: '35%'}}>
        <OrderList/>
        </Box>
        <Card sx={{width: '60%'}}>
            <RejectedChart/>
        </Card>
       
    </Box>
   </Box>
  )
}

export default DashboardPage