import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase.config";
import { firebaseLooper } from "../../tools/firebase.utils";
import { Chip, Dialog, DialogContent, DialogTitle } from "@mui/material";
import CreateOrder from "./create-order";
import { toastMessage, toastMessageSuccess } from "../../tools/toasts";

const OrderItem = ({ order }: any) => {
  const [product, setProduct] = useState<any | null>(null);
  const [customer, setCustomer] = useState<any | null>(null);

  useEffect(() => {
    db.collection("inventory")
      .doc(order?.productId)
      .onSnapshot((snap) => {
        const data = snap.data();
        setProduct(data);
        console.log(data);
      });
    db.collection("customers")
      .doc(order?.customerId)
      .onSnapshot((snap) => {
        const data = snap.data();
        setCustomer(data);
        console.log(data);
      });
  }, []);

  const updateStatusAccepted = () => {
    db.collection("orders")
      .doc(order?.id)
      .update({ ...order, orderStatus: "ACCEPTED", amount: product?.price })
      .then(() => {
        toastMessageSuccess({ message: " ACCEPTED ORDER" });
      });
  };

  const updateStatusARejected = () => {
    db.collection("orders")
      .doc(order.id)
      .update({ ...order, orderStatus: "REJECTED", amount: product?.price })
      .then(() => {
        toastMessage({ message: "REJECTED ORDER" });
      });
  };

  return (
    <div className="w-full m-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          style={{ width: "350px", height: "350px" }}
          className="p-8 rounded-t-lg"
          src={product?.image}
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product?.name}
          </h5>
        </a>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">
          Order by {customer?.name}
        </span>
        <div className="flex items-center mt-2 justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            INR {product?.price}
          </span>
          {order.orderStatus === "ACCEPTED" && <Chip sx={{backgroundColor: '#C7E8CA', color: '#5D9C59'}} label="ACCEPTED" />}
          {order.orderStatus === "REJECTED" && <Chip sx={{backgroundColor: '#FFABAB', color: '#D21312'}} label="REJECTED" />}
          {order.orderStatus === "ORDERED" && (
            <>
              <a
                onClick={() => updateStatusAccepted()}
                className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Accept Order
              </a>
              <a
                onClick={() => updateStatusARejected()}
                className="text-white cursor-pointer bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Reject Order{" "}
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    db.collection("orders").onSnapshot((snap) => {
      const data = firebaseLooper(snap);
      setOrders(data);
    });
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between p-4 bg-white mb-2 dark:bg-gray-900">
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
          Create Sale
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {orders.map((item: any) => (
          <OrderItem key={item?.id} order={item} />
        ))}
      </div>

      <Dialog
        maxWidth="md"
        fullWidth
        onClose={() => setOpen(false)}
        open={open}
      >
        <DialogTitle>Create Sale</DialogTitle>
        <DialogContent>
          <CreateOrder closeModal={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default OrdersList;
