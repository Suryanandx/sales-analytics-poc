import React, { useState } from "react";
import { db } from "../../config/firebase.config";
import { toastMessageSuccess } from "../../tools/toasts";
import { useStorage } from "../../tools/useStorage";
import { LinearProgress } from "@mui/material";

const AddInventory = ({closeModal}: any) => {
  const [product, setProduct] = useState({
    name: "",
    qty: "0",
    image: "",
    price: "0",
  });
  const [file, setFile] = useState(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = { ...product, image: url ? url : "" };
    db.collection("inventory")
      .add(data)
      .then(() => {
        toastMessageSuccess({ message: "Product Added to Inventory" });
        setProduct({ name: "", qty: "0", image: "", price: "0" });
        closeModal();
      });
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const { progress, url } = useStorage(file);

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Name
          </label>
          <input
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Price (INR)
          </label>
          <input
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="100"
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Quantity Available
        </label>
        <input
          type="number"
          value={product.qty}
          onChange={(e) => setProduct({ ...product, qty: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="john.doe@company.com"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Image
        </label>
        <input
          type="file"
          onChange={handleImage}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="B 205 , xyz street"
          required
        />
      </div>
      <br />
      <LinearProgress variant="determinate" value={progress} />
      <br />
      <b>{progress} % Uploaded</b>
      <br />
      {url && <img src={url} />}
      <br />

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

export default AddInventory;
