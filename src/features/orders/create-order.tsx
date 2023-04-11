import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase.config";
import { firebaseLooper } from "../../tools/firebase.utils";
import { toastMessageSuccess } from "../../tools/toasts";

const CreateOrder = ({closeModal} : any) => {

    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [order, setOrder] = useState({customerId : '', productId : '', orderDate : '', orderStatus: 'ORDERED'})

    useEffect(() => {
        db.collection('inventory').onSnapshot(snapshot => {
           const data = firebaseLooper(snapshot);
           setProducts(data);
        })

        db.collection('customers').onSnapshot(snapshot => {
            const data = firebaseLooper(snapshot);
            setCustomers(data);
         })
    }, [])

    const handleSubmit = (e : any) => {
        e.preventDefault();
        const data = {...order, orderDate: (new Date()).toISOString()}
        db.collection('orders').add(data).then(() => {
            toastMessageSuccess({message: "Order Placed Successfully !"})
            closeModal();
        })
    }

  return (
    <form onSubmit={handleSubmit}>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Select an option
      </label>
      <select
      onChange={(e) => setOrder({...order, customerId: e.target.value})}
        id="countries"
        className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Choose a Customer</option>
        {customers.map((c: any) => (
            <option value={c.id}>{c.name}</option>
        ))}
      </select>
      <select
       onChange={(e) => setOrder({...order, productId: e.target.value})}
        id="countries"
        className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Choose a Product</option>
        {products.map((c: any) => (
            <option value={c.id}>{c.name}</option>
        ))}
      </select>

      <button
        style={{ backgroundColor: "#5d93cb" }}
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Continue
      </button>
    </form>
  );
};

export default CreateOrder;
