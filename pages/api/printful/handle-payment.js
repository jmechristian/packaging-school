import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency, customer, items } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description: 'Campus Store Purchase',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: customer.orderId,
        customerName: customer.name,
        customerEmail: customer.email,
        items: items.map((item) => `${item.name} x${item.quantity}`).join(', '),
      },
      shipping: customer.shipping,
      payment_method_options: {
        card: {
          // billing_details: {
          //   email: customer.email,
          // },
        },
      },
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment error:', error);
    return res.status(500).json({ error: error.message });
  }
}
