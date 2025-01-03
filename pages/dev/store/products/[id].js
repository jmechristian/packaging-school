import { useEffect, useState } from 'react';
import Image from "next/legacy/image";
import { useRouter } from 'next/router';

const ProductPage = ({ params }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log('id', id);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/printful/get-product-by-id?id=${id}`);
      const data = await response.json();
      setProduct(data.data);
    };
    fetchProduct();
  }, [id]);

  return (
    product && (
      <div className='flex flex-col gap-10 lg:gap-16 py-10 lg:py-20'>
        <div className='grid grid-cols-2 border border-neutral-400 max-w-7xl mx-auto'>
          <div>
            <Image
              src={product.sync_product.thumbnail_url}
              alt={product.sync_product.name}
              width={500}
              height={500}
            />
          </div>
          <div className='flex flex-col gap-5'>
            <h1>{product.sync_product.name}</h1>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductPage;
