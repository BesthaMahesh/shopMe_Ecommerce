import React from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const Subscribe = () => {
  const [email, setEmail] = React.useState("");

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter an email address");
      return;
    }

    try {
      await addDoc(collection(db, "subscriptions"), {
        email: email,
        subscribedAt: serverTimestamp()
      });

      alert("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.error(error);
      alert("Failed to subscribe: " + error.message);
    }
  };

  return (
    <div
      data-aos="zoom-in"
      className="mb-20 bg-slate-700 dark:bg-gray-800 text-white "
    >
      <div className="container backdrop-blur-sm py-10">
        <div className="space-y-6 max-w-xl mx-auto">
          <h1 className="text-2xl !text-center sm:text-left sm:text-4xl font-semibold">
            Get Notified About New Products
          </h1>
          <div className="flex gap-4">
            <input
              data-aos="fade-up"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 text-black"
            />
            <button
              onClick={handleSubscribe}
              data-aos="fade-up"
              className="bg-primary hover:bg-primary/80 transition text-white px-6 py-3 font-semibold rounded"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
