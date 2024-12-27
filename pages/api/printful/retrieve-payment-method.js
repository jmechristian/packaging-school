const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { paymentMethodId } = req.body;

    try {
      const paymentMethod = await stripe.paymentMethods.retrieve(
        paymentMethodId
      );
      const last4 = paymentMethod.card.last4;
      const cardType = paymentMethod.card.brand;
      res.status(200).json({ last4, cardType });
    } catch (error) {
      console.error('Error retrieving payment method:', error);
      res.status(500).json({ error: 'Failed to retrieve payment method' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
