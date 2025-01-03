import React, { useEffect } from 'react';
import { getStorePurchase } from '../../../../../helpers/api';
import GoogleMapReact from 'google-map-react';
import Image from "next/legacy/image";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaShippingFast,
} from 'react-icons/fa';
import NodeGeocoder from 'node-geocoder';

export const MapComponent = () => {
  return (
    <div className='w-9 h-9 flex items-center justify-center bg-clemson ring-base-brand ring-4 shadow-md rounded-full'>
      <FaShippingFast className='text-white w-5 h-5' />
    </div>
  );
};

const Page = ({ res, coordinates }) => {
  const {
    name,
    email,
    address,
    city,
    state,
    zip,
    country,
    items,
    printfulOrderId,
    total,
    shipping,
    tax,
    subtotal,
    phone,
    paymentMethod,
    paymentLast4,
  } = res;

  const defaultProps = {
    center: {
      lat: coordinates.lat,
      lng: coordinates.lng,
    },
    zoom: 15,
  };

  const paymentIcons = {
    visa: <FaCcVisa />,
    mastercard: <FaCcMastercard />,
    amex: <FaCcAmex />,
    // Add more mappings as needed
  };

  return (
    <div className='w-full max-w-7xl mx-auto py-10 lg:py-20'>
      <div className='grid lg:grid-cols-5 gap-10 border border-gray-200 rounded-lg'>
        <div className='lg:col-span-3 flex flex-col gap-10 p-5 lg:p-10'>
          <div className='flex flex-col gap-2'>
            <div className='text-lg text-gray-600'>
              <p>Order ID: {printfulOrderId}</p>
            </div>
            <h3 className='h3-base font-bold'>Thank You, {name}!</h3>
          </div>
          <div className='aspect-[16/9] w-full bg-gray-400 rounded-lg overflow-hidden'>
            <div className='h-full w-full'>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                <MapComponent lat={coordinates.lat} lng={coordinates.lng} />
              </GoogleMapReact>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 gap-5'>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-1'>
                <div className='font-bold'>Contact Information:</div>
                <div className='text-gray-600'>{email}</div>
                <div className='text-gray-600'>{phone}</div>
              </div>
              <div className='flex flex-col gap-1'>
                <div className='font-bold'>Shipping Address:</div>
                <div className='flex flex-col gap-1'>
                  <div className='text-gray-600'>{address}</div>
                  <div className='text-gray-600'>
                    {city}, {state}, {zip}
                  </div>
                  <div className='text-gray-600'>{country}</div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-1'>
                <div className='font-bold'>Payment Information:</div>
                <div className='flex items-center gap-2 text-gray-600'>
                  {paymentIcons[paymentMethod]} - {paymentLast4}
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <div className='font-bold'>Billing Address:</div>
                <div className='flex flex-col gap-1 text-gray-600'>
                  <div>{address}</div>
                  <div>
                    {city}, {state}, {zip}
                  </div>
                  <div>{country}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:col-span-2 w-full border-l border-gray-200 rounded-lg flex flex-col gap-4 p-5 lg:p-10'>
          <h2 className='h4-base'>Order Details</h2>
          <ul className='mt-4 flex flex-col gap-4'>
            {items.map((item, index) => {
              let parsedItem;
              try {
                parsedItem = JSON.parse(item);
              } catch (error) {
                console.error(`Error parsing item at index ${index}:`, error);
                return (
                  <li key={index} className='mb-2'>
                    Invalid item format
                  </li>
                );
              }

              return (
                <li key={parsedItem.id}>
                  <div className='flex items-center space-x-4'>
                    <div className='w-16 h-16 bg-gray-200 rounded'>
                      {parsedItem.files?.find((file) => file.type === 'preview')
                        ?.thumbnail_url && (
                        <Image
                          src={
                            parsedItem.files?.find(
                              (file) => file.type === 'preview'
                            )?.thumbnail_url ||
                            parsedItem.product?.image ||
                            '/fallback-image.jpg'
                          }
                          alt={parsedItem.name}
                          width={64}
                          height={64}
                          className='object-cover rounded'
                        />
                      )}
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-medium max-w-[200px]'>
                        {parsedItem.name}
                      </h3>
                      <p className='text-gray-600 text-sm'>
                        Quantity: {parsedItem.quantity} /{' '}
                        {parsedItem.retail_price}
                      </p>
                    </div>
                    <div>
                      $
                      {(parsedItem.retail_price * parsedItem.quantity).toFixed(
                        2
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className='flex flex-col gap-2'>
            <hr className='border-gray-300 py-2' />
            <div className='flex justify-between'>
              <p>Subtotal:</p>
              <p>${parseFloat(subtotal).toFixed(2)}</p>
            </div>
            <div className='flex justify-between'>
              <p>Shipping:</p>
              <p>${shipping}</p>
            </div>
            <div className='flex justify-between'>
              <p>Tax:</p>
              <p>${tax}</p>
            </div>
            <hr className='border-gray-300 py-2' />
            <div className='flex justify-between text-lg font-bold'>
              <p>Total:</p>
              <p>${total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await getStorePurchase(id);

  const options = {
    provider: 'google',
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Your Google Maps API key
  };

  const geocoder = NodeGeocoder(options);

  let coordinates = { lat: 0, lng: 0 }; // Default coordinates

  try {
    const address = `${res.address}, ${res.city}, ${res.state}, ${res.zip}, ${res.country}`;
    const geoRes = await geocoder.geocode(address);
    if (geoRes.length > 0) {
      coordinates = {
        lat: geoRes[0].latitude,
        lng: geoRes[0].longitude,
      };
    }
  } catch (error) {
    console.error('Error geocoding address:', error);
  }

  return { props: { res, coordinates } };
}
