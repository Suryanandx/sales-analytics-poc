import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase.config";
import { firebaseLooper } from "../../tools/firebase.utils";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import AddInventory from "./add-inventory.form";
import { toastMessageSuccess } from "../../tools/toasts";

const InventoryItem = ({item} : any) => {

  const deleteItem = () => {
    db.collection('inventory').doc(item.id).delete().then(() => {
      toastMessageSuccess({message: "deleted item successfully !"})
    })
  }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="w-32 p-4">
          <img
            src={item?.image}
            alt="Apple Watch"
          />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item?.name}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <button
              className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <span className="sr-only">Quantity button</span>
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div>
              <input
              value={item?.qty}
                type="number"
                id="first_product"
                className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <span className="sr-only">Quantity button</span>
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         INR {item?.price}
        </td>
        <td className="px-6 py-4">
          <a
            onClick={deleteItem}
            className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
          >
            Remove
          </a>
        </td>
      </tr>
    )
}

const InventoryList = () => {

    const [inventory, setInventory] = useState([]);
    const [open, setOpen] = useState(false)
    const [search , setSearch] = useState("");

    useEffect(() => {
        db.collection('inventory').onSnapshot(snapshot => {
           const data = firebaseLooper(snapshot);
           setInventory(data);
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
            placeholder="Search for products"
          />
        </div>
        <button
        onClick={() => setOpen(true)}
          id="dropdownActionButton"
          data-dropdown-toggle="dropdownAction"
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
        >
          Add Inventory
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
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
         {inventory?.filter((item : any) => {
          if(search === ''){
            return item
          }else if (item.name.toLowerCase().includes(search.toLocaleLowerCase())){
            return item
          }
         }).map((item : any) => (
            <InventoryItem key={item?.id} item={item}/>
         ))}
        </tbody>
      </table>
      <Dialog fullWidth maxWidth="md" open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Inventory</DialogTitle>
        <DialogContent>
             <AddInventory closeModal={() => setOpen(false)}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryList;
