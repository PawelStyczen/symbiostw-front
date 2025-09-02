import api from "../utils/api";

export const createPayUOrder = async (meetingId, price) => {
  const email = localStorage.getItem("userEmail");

  if (!email) {
    throw new Error("User email not found. Please log in again.");
  }

  const uniqueOrderId = `${meetingId}-${Date.now()}`;

  const orderData = {
    notifyUrl: "https://ecff-46-205-199-185.ngrok-free.app/api/PayU/webhook",
    continueUrl: "http://localhost:3000/payment-success",
    customerIp: "127.0.0.1",
    description: `Payment for meeting ID: ${meetingId}`,
    extOrderId: uniqueOrderId,
    merchantPosId: "488098",
    currencyCode: "PLN",
    totalAmount: (price * 100).toString(),
    buyer: {
      email: email,
      phone: "123456789",
      firstName: "John",
      lastName: "Doe",
      language: "pl",
    },
    products: [
      {
        name: "Meeting Registration",
        unitPrice: (price * 100).toString(),
        quantity: 1,
      },
    ],
  };

  console.log("📤 Sending order:", JSON.stringify(orderData, null, 2));

  const response = await api.post("/api/PayU/create-order", orderData);
  return response.data.url;
};
