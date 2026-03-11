import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const Popup = ({ orderPopup, setOrderPopup }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill all details!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        createdAt: serverTimestamp()
      });

      alert("Order created successfully!");
      setFormData({ name: "", email: "", address: "" });
      setOrderPopup(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save order to the database: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {orderPopup && (
        <div className="popup">
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px]">
              {/* header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1>Order Now</h1>
                </div>
                <div>
                  <IoCloseOutline
                    className="text-2xl cursor-pointer "
                    onClick={() => setOrderPopup(false)}
                  />
                </div>
              </div>
              {/* form section */}
              <div className="mt-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className=" w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className=" w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className=" w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                <div className="flex justify-center">
                  <button
                    onClick={handleOrder}
                    disabled={loading}
                    className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? "Processing..." : "Order Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
