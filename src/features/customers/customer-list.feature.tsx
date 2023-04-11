import React, { useEffect, useState } from "react";
import {db} from '../../config/firebase.config'
import { firebaseLooper } from "../../tools/firebase.utils";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import AddCustomer from "./add-customer.form";

const CustomerRow = ({item, orders} : any) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <img
            className="w-10 h-10 rounded-full"
            src={item?.avatar}
            alt="Jese image"
          />
          <div className="pl-3">
            <div className="text-base font-semibold">{item?.name}</div>
            <div className="font-normal text-gray-500">
              {item?.email}
            </div>
          </div>
        </th>
        <td className="px-6 py-4">
          <div className="text-base font-semibold">{orders?.filter((i : any) => item?.id === i?.customerId).length} Order(s)</div>
          {/* <div className="font-normal text-gray-500">47,000 INR </div> */}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">{item?.address}</div>
        </td>
        {/* <td className="px-6 py-4">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            View Details
          </a>
        </td> */}
      </tr>
    )
}

const CustomerList = () => {

    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('')

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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
        <label className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
          onChange={(e) => setSearch(e.target.value)}
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
          />
        </div>
        <button
       onClick={() => setOpen(true)} 
          id="dropdownActionButton"
          data-dropdown-toggle="dropdownAction"
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
        >
          Add Customers
          <svg
            className="w-3 h-3 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Total Orders
            </th>
            <th scope="col" className="px-6 py-3">
              Delivery Address
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Action
            </th> */}
          </tr>
        </thead>
        <tbody>
            {customers?.filter((item : any) => {
          if(search === ''){
            return item
          }else if (item.name.toLowerCase().includes(search.toLocaleLowerCase())){
            return item
          }
         }).map((item : any) => (
                <CustomerRow key={item?.id} orders={orders} item={item}/>
            ))}
        </tbody>
      </table>
      <Dialog fullWidth maxWidth="md" open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
             <AddCustomer closeModal={() => setOpen(false)}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerList;
