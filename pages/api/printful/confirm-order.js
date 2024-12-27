import { API } from 'aws-amplify';
import { updatePurchase } from '../../../src/graphql/mutations';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      id,
      paymentConfirmation,
      printfulOrderId,
      paymentMethod,
      paymentLast4,
    } = req.body;

    // add api call to update purchase
    const response = await API.graphql({
      query: updatePurchase,
      variables: {
        input: {
          id: id,
          paymentConfirmation: paymentConfirmation,
          printfulOrderId: printfulOrderId,
          paymentMethod: paymentMethod,
          paymentLast4: paymentLast4,
        },
      },
    });

    console.log('Response:', response);

    // Confirm the order with Printful
    // const response = await fetch(
    //   `https://api.printful.com/orders/${orderId}/confirm`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${process.env.PRINTFUL_API_TOKEN}`,
    //     },
    //   }
    // );

    // if (!response.ok) {
    //   throw new Error('Failed to confirm Printful order');
    // }

    // const data = await response.json();

    // You might want to store the order details in your database here
    // await db.orders.create({ ... });

    return res
      .status(200)
      .json({ success: true, data: response.data.updatePurchase });
  } catch (error) {
    console.error('Error confirming order:', error);
    return res.status(500).json({ error: error.message });
  }
}
