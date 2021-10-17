import { ApiClient } from './ApiClient';

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export async function displayRazorpay(orderId, amount) {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        console.error("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const options = {
        key: "rzp_test_HwygC9FrX26ndC", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: "INR",
        name: "STORE.",
        description: "Payment for an order.",
        image: { logo: null },
        order_id: orderId,
        handler: async function (response) {
            const data = {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
            };

            console.log(data);

            const result = await ApiClient.post("/razorpay/payment", data);
            console.log(result);
        },
        prefill: {
            name: "STORE.",
            email: "admin@store.com",
            contact: "9999999999",
        },
        notes: {
            address: "Store Office",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}