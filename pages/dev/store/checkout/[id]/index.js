import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
const CheckoutPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { cart, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    shippingAddress: {
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    billingAddress: {
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    sameAsShipping: false,
  });

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');

    setFormData((prev) => ({
      ...prev,
      [section]:
        section === 'sameAsShipping'
          ? value
          : section === 'email'
          ? value
          : {
              ...prev[section],
              [field]: value,
            },
    }));
  };

  const handleSameAsShipping = (e) => {
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      sameAsShipping: isChecked,
      billingAddress: isChecked
        ? { ...prev.shippingAddress }
        : prev.billingAddress,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Handle submission logic here
  };

  const handleApplyCoupon = () => {
    console.log('Applying coupon:', couponCode);
    // Example:
    // setAppliedCoupon({ code: couponCode, discount: 10 });
  };

  // Country codes array
  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    // Add more countries as needed
  ];

  return (
    <div className='container mx-auto px-4 py-8 lg:py-16'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Left Column - Forms */}
        <div className='space-y-6'>
          {/* Express Checkout Section */}
          <section className='border rounded-lg p-4'>
            <h2 className='text-xl font-semibold mb-4'>Express Checkout</h2>
            {/* Add payment buttons here */}
          </section>

          {/* Contact Section */}
          <section className='border rounded-lg p-4'>
            <h2 className='text-xl font-semibold mb-4'>Contact</h2>
            <div className='flex justify-between items-center mb-4'>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email'
                className='flex-1 p-2 border rounded mr-4'
              />
              <button className='bg-blue-600 text-white px-4 py-2 rounded'>
                Login
              </button>
            </div>
          </section>

          {/* Shipping Address Section */}
          <section className='border rounded-lg p-4'>
            <h2 className='text-xl font-semibold mb-4'>Shipping Address</h2>
            <form className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <input
                  type='text'
                  name='shippingAddress.firstName'
                  value={formData.shippingAddress.firstName}
                  onChange={handleChange}
                  placeholder='First Name'
                  className='p-2 border rounded'
                />
                <input
                  type='text'
                  name='shippingAddress.lastName'
                  value={formData.shippingAddress.lastName}
                  onChange={handleChange}
                  placeholder='Last Name'
                  className='p-2 border rounded'
                />
              </div>
              <input
                type='text'
                name='shippingAddress.company'
                value={formData.shippingAddress.company}
                onChange={handleChange}
                placeholder='Company (optional)'
                className='w-full p-2 border rounded'
              />
              <input
                type='text'
                name='shippingAddress.address'
                value={formData.shippingAddress.address}
                onChange={handleChange}
                placeholder='Address'
                className='w-full p-2 border rounded'
              />
              <input
                type='text'
                name='shippingAddress.apartment'
                value={formData.shippingAddress.apartment}
                onChange={handleChange}
                placeholder='Apartment, suite, etc. (optional)'
                className='w-full p-2 border rounded'
              />
              <div className='grid grid-cols-2 gap-4'>
                <input
                  type='text'
                  name='shippingAddress.city'
                  value={formData.shippingAddress.city}
                  onChange={handleChange}
                  placeholder='City'
                  className='p-2 border rounded'
                />
                <select
                  name='shippingAddress.state'
                  value={formData.shippingAddress.state}
                  onChange={handleChange}
                  className='p-2 border rounded'
                >
                  <option value=''>Select State</option>
                  {/* Add state options here */}
                </select>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <input
                  type='text'
                  name='shippingAddress.postalCode'
                  value={formData.shippingAddress.postalCode}
                  onChange={handleChange}
                  placeholder='Postal Code'
                  className='p-2 border rounded'
                />
                <select
                  name='shippingAddress.country'
                  value={formData.shippingAddress.country}
                  onChange={handleChange}
                  className='p-2 border rounded'
                >
                  <option value=''>Select Country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </section>

          {/* Billing Address Section */}
          <section className='border rounded-lg p-4'>
            <h2 className='text-xl font-semibold mb-4'>Billing Address</h2>
            <div className='mb-4'>
              <label className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  checked={formData.sameAsShipping}
                  onChange={handleSameAsShipping}
                  className='form-checkbox'
                />
                <span>Same as shipping address</span>
              </label>
            </div>
            {!formData.sameAsShipping && (
              <form className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <input
                    type='text'
                    name='billingAddress.firstName'
                    value={formData.billingAddress.firstName}
                    onChange={handleChange}
                    placeholder='First Name'
                    className='p-2 border rounded'
                  />
                  <input
                    type='text'
                    name='billingAddress.lastName'
                    value={formData.billingAddress.lastName}
                    onChange={handleChange}
                    placeholder='Last Name'
                    className='p-2 border rounded'
                  />
                </div>
                <input
                  type='text'
                  name='billingAddress.company'
                  value={formData.billingAddress.company}
                  onChange={handleChange}
                  placeholder='Company (optional)'
                  className='w-full p-2 border rounded'
                />
                <input
                  type='text'
                  name='billingAddress.address'
                  value={formData.billingAddress.address}
                  onChange={handleChange}
                  placeholder='Address'
                  className='w-full p-2 border rounded'
                />
                <input
                  type='text'
                  name='billingAddress.apartment'
                  value={formData.billingAddress.apartment}
                  onChange={handleChange}
                  placeholder='Apartment, suite, etc. (optional)'
                  className='w-full p-2 border rounded'
                />
                <div className='grid grid-cols-2 gap-4'>
                  <input
                    type='text'
                    name='billingAddress.city'
                    value={formData.billingAddress.city}
                    onChange={handleChange}
                    placeholder='City'
                    className='p-2 border rounded'
                  />
                  <select
                    name='billingAddress.state'
                    value={formData.billingAddress.state}
                    onChange={handleChange}
                    className='p-2 border rounded'
                  >
                    <option value=''>Select State</option>
                    {/* Add state options here */}
                  </select>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <input
                    type='text'
                    name='billingAddress.postalCode'
                    value={formData.billingAddress.postalCode}
                    onChange={handleChange}
                    placeholder='Postal Code'
                    className='p-2 border rounded'
                  />
                  <select
                    name='billingAddress.country'
                    value={formData.billingAddress.country}
                    onChange={handleChange}
                    className='p-2 border rounded'
                  >
                    <option value=''>Select Country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            )}
          </section>

          <button
            onClick={handleSubmit}
            className='w-full bg-blue-600 text-white py-3 rounded'
          >
            Pay Now
          </button>
        </div>

        {/* Right Column - Order Summary */}
        <div className='border rounded-lg p-4'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold'>Order Summary</h2>
            <button
              className='text-base-brand hover:text-base-brand-dark text-sm font-semibold'
              onClick={() => router.push(`/store/cart/${id}`)}
            >
              Edit Cart
            </button>
          </div>

          {/* Items List */}
          <div className='space-y-5 mb-6'>
            {cart?.items?.map((item) => (
              <div key={item.id} className='flex items-center space-x-4'>
                <div className='w-16 h-16 bg-gray-200 rounded'>
                  {item.files?.find((file) => file.type === 'preview')
                    ?.thumbnail_url && (
                    <Image
                      src={
                        item.files?.find((file) => file.type === 'preview')
                          ?.thumbnail_url ||
                        item.product?.image ||
                        '/fallback-image.jpg'
                      }
                      alt={item.name}
                      width={64}
                      height={64}
                      className='object-cover rounded'
                    />
                  )}
                </div>
                <div className='flex-1'>
                  <h3 className='font-semibold max-w-md'>{item.name}</h3>
                  <p className='text-gray-500 text-sm'>
                    Quantity: {item.quantity} / {item.retail_price}
                  </p>
                </div>
                <div className='font-medium text-sm'>
                  ${(item.retail_price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Order Calculations */}
          <div className='space-y-3 py-4 border-t'>
            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span>
                $
                {cart?.items
                  ?.reduce(
                    (acc, item) => acc + item.retail_price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            {appliedCoupon && (
              <div className='flex justify-between text-green-600'>
                <span>Discount ({appliedCoupon.code})</span>
                <span>-${appliedCoupon.discount}</span>
              </div>
            )}
            <div className='flex justify-between'>
              <span>Shipping</span>
              <span>Enter Shipping Address</span>
            </div>
            <div className='flex justify-between'>
              <span>Tax</span>
              <span>Enter Billing Address</span>
            </div>
            <div className='flex justify-between font-semibold text-lg pt-4 border-t'>
              <span>Total</span>
              <span>
                $
                {cart?.items
                  ?.reduce(
                    (acc, item) => acc + item.retail_price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>

          <div className='border-t py-4 mb-4'>
            <div className='flex gap-2'>
              <input
                type='text'
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder='Discount code'
                className='flex-1 p-2 border rounded'
              />
              <button
                onClick={handleApplyCoupon}
                className='bg-gray-800 text-white px-4 py-2 rounded'
              >
                Apply
              </button>
            </div>
            {appliedCoupon && (
              <div className='text-green-600 text-sm mt-2'>
                Coupon {appliedCoupon.code} applied!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
