import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase.config';
import { firebaseLooper } from '../../tools/firebase.utils';
import { Chip } from '@mui/material';

const OrderList = () => {

    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        db.collection('customers').onSnapshot(snapshot => {
            const data = firebaseLooper(snapshot);
            setCustomers(data)
            console.log(data)
        })
        db.collection('orders').onSnapshot(snapshot => {
            const data = firebaseLooper(snapshot);
            setOrders(data)
        })
    }, [])

  return (
   
<div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Transactions</h5>
        <a href="/orders" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
        </a>
   </div>
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {orders?.filter((item : any)=> item?.orderStatus === 'ACCEPTED').slice(0,6).map((item : any) => (
              <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                  {/* <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src={item?.avatar} alt="Neil image"/>
                  </div> */}
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {item?.customerId}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                         {item?.amount} INR
                      </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <Chip sx={{backgroundColor: '#C7E8CA', color: '#5D9C59'}} label="SUCCESS" />
                  </div>
              </div>
          </li>
          ))}
          
        </ul>
   </div>
</div>
  )
}

export default OrderList