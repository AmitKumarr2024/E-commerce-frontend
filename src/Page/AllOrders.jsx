import React, { useEffect, useState } from "react";
import PaymentOrderApi from "../common/order";
import moment from "moment";
import displayINRCurrency from "../helper/displayCurrency";
import { MdDelete } from "react-icons/md";

function AllOrders(props) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null); // Initialize as null since it's a single object
  const [showModal, setShowModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [currentProductId, setCurrentProductId] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(PaymentOrderApi.allOrder.url, {
        method: PaymentOrderApi.allOrder.method,
        credentials: "include",
      });

      const dataResponse = await response.json();

      if (response.ok) {
        const { orders, user } = dataResponse.data;
        setData(orders);
        setUser(user);
      } else {
        console.error("Error fetching orders:", dataResponse.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDeleteClick = (productId) => {
    setCurrentProductId(productId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!cancelReason) {
      alert("Please provide a reason for cancellation");
      return;
    }

    try {
      const response = await fetch(PaymentOrderApi.cancelOrder.url, {
        method: PaymentOrderApi.cancelOrder.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: currentProductId,
          reason: cancelReason,
        }),
      });

      const dataResponse = await response.json();

      if (response.ok && dataResponse.success) {
        console.log(dataResponse.message);
        fetchOrderDetails(); // Refresh order list after deletion
      } else {
        console.error(
          "Failed to delete order:",
          dataResponse.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Order delete error:", error);
    }

    setShowModal(false);
    setCancelReason("");
    setCurrentProductId(null);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {data.length === 0 && (
        <p className="text-center text-gray-500">No orders available</p>
      )}
      <div className="space-y-6 border p-9  rounded-lg shadow-lg overflow-hidden">
        {user && (
          <div className="text-center border border-blue-800  rounded-full text-gray-600 mb-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-bold bg-amber-600 text-white  py-6 px-16 overflow-hidden">User Details</h2>
            <p>Name: {user.name}</p>
            <p>Role: {user.role}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
        {data.map((item) => (
          <div key={item._id} className="space-y-1">
            <div className="relative border rounded-lg shadow-lg overflow-hidden bg-white">
              <div className="lg:flex">
                <div className="grid gap-4 p-4 lg:w-2/3">
            <p className="absolute top-2 left-3 font-medium text-xs text-gray-400">
              Created At: <span className="text-xs text-gray-500">{moment(item.createdAt).format("LLLL")}</span>
            </p>
                  {item.productDetails.map((product) => (
                    <div
                      key={product.productId}
                      className="flex gap-4  p-4 rounded-md"
                    >
                      <img
                        src={product?.image.replace(/^http:\/\//i, "https://")}
                        alt={product.name}
                        className="w-24 h-32 bg-slate-300 object-scale-down mix-blend-multiply p-2 rounded-md"
                      />
                      <div className="flex flex-col justify-between">
                        <div className="font-medium text-lg text-gray-800 line-clamp-3">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-5">
                          <div className="text-lg text-green-600 font-semibold">
                            {displayINRCurrency(product.price)}
                          </div>
                          <div className="text-gray-600">
                            Quantity: {product.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 lg:w-1/3 bg-green-100 space-y-4 relative">
                  {/* Delete button */}
                  <div
                    className="absolute right-2 top-2 p-2 text-2xl text-red-600 rounded-full hover:bg-red-500 hover:text-white cursor-pointer"
                    onClick={() =>
                      handleDeleteClick(item.productDetails[0].productId)
                    }
                  >
                    <MdDelete />
                  </div>
                  <div>
                    <div className="text-lg font-medium text-gray-800">
                      Payment Details:
                    </div>
                    <div className="ml-1 text-gray-600">
                      Payment Method:{" "}
                      {item.paymentDetails.payment_method_type[0]}
                    </div>
                    <div className="ml-1 text-gray-600">
                      Payment Status: {item.paymentDetails.payment_status}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-medium text-gray-800">
                      Shipping Details
                    </div>
                    {item.shipping_options.map((shipping) => (
                      <div
                        key={shipping.shipping_rate}
                        className="ml-1 text-gray-600"
                      >
                        Shipping Amount: {shipping.shipping_amount}
                      </div>
                    ))}
                  </div>
                  <div className="text-lg font-semibold text-gray-800">
                    Total Amount: {displayINRCurrency(item.totalAmount)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Cancel Order</h2>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Please provide a reason for cancellation"
              className="w-full h-24 p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllOrders;
