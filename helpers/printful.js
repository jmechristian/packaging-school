const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRINTFUL_API_TOKEN}`,
  'X-PF-Store-Id': process.env.NEXT_PUBLIC_PRINTFUL_STORE_ID || '',
};

export async function fetchSyncedProducts() {
  console.log(
    'PRINTFUL_API_TOKEN:',
    process.env.NEXT_PUBLIC_PRINTFUL_API_TOKEN
  );
  console.log('PRINTFUL_STORE_ID:', process.env.NEXT_PUBLIC_PRINTFUL_STORE_ID);
  try {
    const response = await fetch('https://api.printful.com/sync/products', {
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error details: ${response.status} - ${errorText}`);
      throw new Error(
        `Failed to fetch products: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    return data.result; // Adjust based on the API response structure
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchSyncedProduct({ id }) {
  try {
    const response = await fetch(
      `https://api.printful.com/sync/products/${id}`,
      {
        headers,
      }
    );

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}
