import { API } from 'aws-amplify';
import { createPurchase } from '../../../src/graphql/mutations';

export default async function handler(req, res) {
  try {
    const requestData =
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const draftOrder = await API.graphql({
      query: createPurchase,
      variables: {
        input: {
          address: requestData.recipient.address1,
          city: requestData.recipient.city,
          code: requestData.recipient.zip,
          company: requestData.recipient.company,
          country: requestData.recipient.country_code,
          email: requestData.recipient.email,
          items: requestData.items.map((item) => JSON.stringify(item)),
          name: requestData.recipient.name,
          paymentConfirmation: '',
          phone: requestData.recipient.phone,
          printfulConfirmed: false,
          printfulOrderId: '',
          state: requestData.recipient.state_code,
          status: 'DRAFT',
          total: requestData.total,
          subtotal: requestData.subtotal,
          tax: requestData.tax,
          shipping: requestData.shipping_cost,
          shippingMethod: requestData.shippingMethod,
          subtotal: requestData.subtotal,
          zip: requestData.recipient.zip,
        },
      },
    });

    console.log('Draft Order:', draftOrder);

    const externalId = draftOrder.data.createPurchase.id.replace(/[-\s]/g, '');

    const printfulPayload = {
      external_id: externalId,
      shipping: requestData.shipping,
      recipient: {
        name: requestData.recipient.name,
        address1: requestData.recipient.address1,
        city: requestData.recipient.city,
        state_code: requestData.recipient.state_code,
        country_code: requestData.recipient.country_code,
        zip: requestData.recipient.zip,
        email: requestData.recipient.email,
        phone: requestData.recipient.phone,
      },
      items: requestData.items.map((item) => ({
        variant_id: item.variant_id,
        quantity: item.quantity,
        retail_price: String(item.retail_price),
        files: item.files,
      })),
      retail_costs: {
        subtotal: requestData.subtotal,
        shipping: requestData.shipping_cost,
        tax: requestData.tax,
        total:
          requestData.subtotal + requestData.shipping_cost + requestData.tax,
      },
    };

    const response = await fetch('https://api.printful.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PRINTFUL_API_TOKEN}`,
        'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID,
      },
      body: JSON.stringify(printfulPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Printful API error:', errorText);
      return res.status(response.status).json({
        error: `Failed to create draft order: ${response.status} - ${errorText}`,
      });
    }

    const data = await response.json();

    return res
      .status(200)
      .json({ data: data.result, id: draftOrder.data.createPurchase.id });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: error.message });
  }
}
