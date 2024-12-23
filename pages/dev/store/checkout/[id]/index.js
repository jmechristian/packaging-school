import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
const CheckoutPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { cart, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    phoneCountryCode: '+1',
    shippingAddress: {
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      apartment: '',
      city: '',
      state: {
        code: '',
        name: '',
      },
      postalCode: '',
      country: {
        code: '',
        name: '',
      },
    },
    billingAddress: {
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      apartment: '',
      city: '',
      state: {
        code: '',
        name: '',
      },
      postalCode: '',
      country: {
        code: '',
        name: '',
      },
    },
    sameAsShipping: false,
  });

  const [isCountriesLoading, setIsCountriesLoading] = useState(true);
  const [isCountries, setIsCountries] = useState([]);
  const [states, setStates] = useState({
    shipping: [],
    billing: [],
  });
  const [shippingRates, setShippingRates] = useState([]);
  const [selectedShippingRate, setSelectedShippingRate] = useState(null);
  const [costDetails, setCostDetails] = useState(null);

  // Add new error state
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    shippingAddress: {},
    billingAddress: {},
  });

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('/api/printful/get-countries');
      const data = await response.json();
      setIsCountries(data.data);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const shippingCountry = isCountries.find(
      (c) => c.code === formData.shippingAddress.country.code
    );
    const billingCountry = isCountries.find(
      (c) => c.code === formData.billingAddress.country.code
    );

    setStates({
      shipping: shippingCountry?.states || [],
      billing: billingCountry?.states || [],
    });
  }, [
    formData.shippingAddress.country.code,
    formData.billingAddress.country.code,
    isCountries,
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');

    if (section === 'email' || section === 'phone') {
      setFormData((prev) => ({
        ...prev,
        [section]: value,
      }));
    } else if (field === 'state') {
      const selectedState = states[
        section === 'shippingAddress' ? 'shipping' : 'billing'
      ].find((state) => state.code === value);

      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          state: {
            code: selectedState?.code || '',
            name: selectedState?.name || '',
          },
        },
      }));
    } else if (field === 'country') {
      const selectedCountry = isCountries.find(
        (country) => country.code === value
      );

      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          country: {
            code: selectedCountry?.code || '',
            name: selectedCountry?.name || '',
          },
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
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

  // Add validation function
  const validateForm = () => {
    const newErrors = {
      email: '',
      phone: '',
      shippingAddress: {},
      billingAddress: {},
    };
    let isValid = true;

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }

    // Shipping address validation - excluding state and company
    const shippingFields = {
      firstName: 'First name',
      lastName: 'Last name',
      address: 'Address',
      city: 'City',
      postalCode: 'Postal code',
      country: 'Country',
    };

    Object.entries(shippingFields).forEach(([field, label]) => {
      if (field === 'country') {
        if (!formData.shippingAddress[field].code) {
          newErrors.shippingAddress[field] = `${label} is required`;
          isValid = false;
        }
      } else if (!formData.shippingAddress[field]) {
        newErrors.shippingAddress[field] = `${label} is required`;
        isValid = false;
      }
    });

    // Billing address validation (if not same as shipping)
    if (!formData.sameAsShipping) {
      Object.entries(shippingFields).forEach(([field, label]) => {
        if (field === 'country') {
          if (!formData.billingAddress[field].code) {
            newErrors.billingAddress[field] = `${label} is required`;
            isValid = false;
          }
        } else if (!formData.billingAddress[field]) {
          newErrors.billingAddress[field] = `${label} is required`;
          isValid = false;
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  };

  // Update handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data:', formData);
      // Handle submission logic here
    } else {
      console.log('Form validation failed');
    }
  };

  const handleApplyCoupon = () => {
    console.log('Applying coupon:', couponCode);
    // Example:
    // setAppliedCoupon({ code: couponCode, discount: 10 });
  };

  const isShippingComplete = (address) => {
    const requiredFields = [
      'firstName',
      'lastName',
      'address',
      'city',
      'postalCode',
    ];

    // Check all basic fields first
    const basicFieldsComplete = requiredFields.every((field) =>
      address[field]?.trim()
    );

    // Check state and country separately since they're objects
    const stateComplete = address.state?.code?.trim();
    const countryComplete = address.country?.code?.trim();

    return basicFieldsComplete && stateComplete && countryComplete;
  };

  const getFullPhoneNumber = () => {
    return formData.phone
      ? `${formData.phoneCountryCode}${formData.phone}`
      : '';
  };

  useEffect(() => {
    const calculateShipping = async () => {
      if (
        !isShippingComplete(formData.shippingAddress) ||
        !cart?.items?.length
      ) {
        return;
      }

      const response = await fetch('/api/printful/calculate-shipping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: {
            name: `${formData.shippingAddress.firstName} ${formData.shippingAddress.lastName}`,
            company: formData.shippingAddress.company,
            address1: formData.shippingAddress.address,
            address2: formData.shippingAddress.apartment,
            city: formData.shippingAddress.city,
            country_code: formData.shippingAddress.country.code,
            country_name: formData.shippingAddress.country.name,
            state_code: formData.shippingAddress.state.code,
            state_name: formData.shippingAddress.state.name,
            zip: formData.shippingAddress.postalCode,
            phone: getFullPhoneNumber(),
            email: formData.email,
          },
          items: cart.items.map((item) => ({
            variant_id: item.variant_id,
            external_variant_id: item.external_id,
            warehouse_product_variant_id: item.warehouse_product_variant_id,
            quantity: item.quantity,
            value: item.retail_price,
          })),
          currency: 'USD',
          locale: 'en_US',
        }),
      });
      const data = await response.json();
      setShippingRates(data.data);
      if (data.data && data.data.length > 0) {
        setSelectedShippingRate(data.data[0]);
      }
    };

    calculateShipping();
  }, [
    formData.shippingAddress,
    formData.phone,
    formData.phoneCountryCode,
    cart?.items,
  ]);

  useEffect(() => {
    const calculateCost = async () => {
      if (
        !selectedShippingRate ||
        !isShippingComplete(formData.shippingAddress) ||
        !cart?.items?.length
      ) {
        return;
      }

      try {
        const response = await fetch('/api/printful/estimate-cost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            shipping: selectedShippingRate.id,
            recipient: {
              name: `${formData.shippingAddress.firstName} ${formData.shippingAddress.lastName}`,
              company: formData.shippingAddress.company,
              address1: formData.shippingAddress.address,
              address2: formData.shippingAddress.apartment,
              city: formData.shippingAddress.city,
              country_code: formData.shippingAddress.country.code,
              country_name: formData.shippingAddress.country.name,
              state_code: formData.shippingAddress.state.code,
              state_name: formData.shippingAddress.state.name,
              zip: formData.shippingAddress.postalCode,
              phone: getFullPhoneNumber(),
              email: formData.email,
            },
            items: cart.items.map((item) => ({
              variant_id: item.variant_id,
              external_variant_id: item.external_id,
              warehouse_product_variant_id: item.warehouse_product_variant_id,
              quantity: item.quantity,
              value: item.retail_price,
            })),
            shipping_rate: selectedShippingRate.id,
            currency: 'USD',
            locale: 'en_US',
          }),
        });

        const data = await response.json();
        setCostDetails(data.data);
      } catch (error) {
        console.error('Error calculating costs:', error);
      }
    };

    calculateCost();
  }, [selectedShippingRate, formData.shippingAddress, cart?.items]);

  return (
    <div className='container mx-auto px-4 py-8 lg:py-16 max-w-7xl'>
      <div className='grid grid-cols-1 lg:grid-cols-5 gap-8 w-full'>
        {/* Left Column - Forms */}
        <div className='space-y-6 col-span-3 w-full'>
          {/* Contact Section */}
          <section className='border rounded-lg p-4'>
            <div className='flex items-center justify-between w-full'>
              <h2 className='text-xl font-semibold mb-4'>Contact*</h2>
              <span className='text-sm text-gray-500'>*Required</span>
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4'>
              <div className='flex flex-col'>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Email'
                  className={`p-2 border rounded ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
                )}
              </div>
              <div className='flex flex-col'>
                <div className='flex gap-2 w-full'>
                  <select
                    name='phoneCountryCode'
                    value={formData.phoneCountryCode}
                    onChange={handleChange}
                    className='p-2 border rounded w-24'
                  >
                    <option value='+1'>🇺🇸 +1</option>
                    <option value='+44'>🇬🇧 +44</option>
                    <option value='+61'>🇦🇺 +61</option>
                    <option value='+33'>🇫🇷 +33</option>
                    <option value='+49'>🇩🇪 +49</option>
                    <option value='+81'>🇯🇵 +81</option>
                    <option value='+86'>🇨🇳 +86</option>
                    <option value='+91'>🇮🇳 +91</option>
                    {/* Add more country codes as needed */}
                  </select>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='Phone number'
                    className={`flex-1 p-2 border rounded ${
                      errors.phone ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>
                )}
              </div>
            </div>
          </section>

          {/* Shipping Address Section */}
          <section className='border rounded-lg p-4'>
            <div className='flex items-center justify-between w-full'>
              <h2 className='text-xl font-semibold mb-4'>Shipping Address*</h2>
              <span className='text-sm text-gray-500'>*Required</span>
            </div>
            <form className='space-y-4'>
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col'>
                    <input
                      type='text'
                      name='shippingAddress.firstName'
                      value={formData.shippingAddress.firstName}
                      onChange={handleChange}
                      placeholder='First Name'
                      className={`p-2 border rounded ${
                        errors.shippingAddress?.firstName
                          ? 'border-red-500'
                          : ''
                      }`}
                    />
                    {errors.shippingAddress?.firstName && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.shippingAddress.firstName}
                      </p>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <input
                      type='text'
                      name='shippingAddress.lastName'
                      value={formData.shippingAddress.lastName}
                      onChange={handleChange}
                      placeholder='Last Name'
                      className={`p-2 border rounded ${
                        errors.shippingAddress?.lastName ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.shippingAddress?.lastName && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.shippingAddress.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company field - no validation needed */}
                <input
                  type='text'
                  name='shippingAddress.company'
                  value={formData.shippingAddress.company}
                  onChange={handleChange}
                  placeholder='Company (optional)'
                  className='w-full p-2 border rounded'
                />

                <div className='flex flex-col'>
                  <input
                    type='text'
                    name='shippingAddress.address'
                    value={formData.shippingAddress.address}
                    onChange={handleChange}
                    placeholder='Address'
                    className={`w-full p-2 border rounded ${
                      errors.shippingAddress?.address ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.shippingAddress?.address && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.shippingAddress.address}
                    </p>
                  )}
                </div>
              </div>
              <input
                type='text'
                name='shippingAddress.apartment'
                value={formData.shippingAddress.apartment}
                onChange={handleChange}
                placeholder='Apartment, suite, etc. (optional)'
                className='w-full p-2 border rounded'
              />
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col'>
                    <input
                      type='text'
                      name='shippingAddress.city'
                      value={formData.shippingAddress.city}
                      onChange={handleChange}
                      placeholder='City'
                      className={`p-2 border rounded ${
                        errors.shippingAddress?.city ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.shippingAddress?.city && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.shippingAddress.city}
                      </p>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <select
                      name='shippingAddress.state'
                      value={formData.shippingAddress.state.code}
                      onChange={handleChange}
                      className='p-2 border rounded'
                      disabled={!states.shipping.length}
                    >
                      <option value=''>Select State (optional)</option>
                      {states.shipping.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col'>
                    <input
                      type='text'
                      name='shippingAddress.postalCode'
                      value={formData.shippingAddress.postalCode}
                      onChange={handleChange}
                      placeholder='Postal Code'
                      className={`p-2 border rounded ${
                        errors.shippingAddress?.postalCode
                          ? 'border-red-500'
                          : ''
                      }`}
                    />
                    {errors.shippingAddress?.postalCode && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.shippingAddress.postalCode}
                      </p>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <select
                      name='shippingAddress.country'
                      value={formData.shippingAddress.country.code}
                      onChange={handleChange}
                      className={`p-2 border rounded ${
                        errors.shippingAddress?.country ? 'border-red-500' : ''
                      }`}
                    >
                      <option value=''>Select Country</option>
                      {isCountries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {errors.shippingAddress?.country && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.shippingAddress.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {shippingRates.length > 0 && (
                <div className='mt-4'>
                  <h3 className='text-lg font-semibold'>Shipping Rates</h3>
                  <div className='space-y-2 mt-2'>
                    {shippingRates.map((r) => (
                      <label
                        key={r.id}
                        className='flex items-center space-x-3 cursor-pointer'
                      >
                        <input
                          type='radio'
                          name='shippingRate'
                          value={r.id}
                          checked={selectedShippingRate?.id === r.id}
                          onChange={() => setSelectedShippingRate(r)}
                          className='form-radio'
                        />
                        <span>
                          {r.name} - $
                          {typeof r.rate === 'number'
                            ? r.rate.toFixed(2)
                            : r.rate}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </section>

          {/* Billing Address Section */}
          <section className='border rounded-lg p-4 '>
            <div className='flex items-center justify-between w-full'>
              <h2 className='text-xl font-semibold mb-4'>Billing Address*</h2>
              <span className='text-sm text-gray-500'>*Required</span>
            </div>
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
                  <div className='flex flex-col'>
                    <input
                      type='text'
                      name='billingAddress.firstName'
                      value={formData.billingAddress.firstName}
                      onChange={handleChange}
                      placeholder='First Name'
                      className={`p-2 border rounded ${
                        errors.billingAddress?.firstName ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.billingAddress?.firstName && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.billingAddress.firstName}
                      </p>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <input
                      type='text'
                      name='billingAddress.lastName'
                      value={formData.billingAddress.lastName}
                      onChange={handleChange}
                      placeholder='Last Name'
                      className={`p-2 border rounded ${
                        errors.billingAddress?.lastName ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.billingAddress?.lastName && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.billingAddress.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <input
                  type='text'
                  name='billingAddress.company'
                  value={formData.billingAddress.company}
                  onChange={handleChange}
                  placeholder='Company (optional)'
                  className='w-full p-2 border rounded'
                />

                <div className='flex flex-col'>
                  <input
                    type='text'
                    name='billingAddress.address'
                    value={formData.billingAddress.address}
                    onChange={handleChange}
                    placeholder='Address'
                    className={`w-full p-2 border rounded ${
                      errors.billingAddress?.address ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.billingAddress?.address && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.billingAddress.address}
                    </p>
                  )}
                </div>

                <input
                  type='text'
                  name='billingAddress.apartment'
                  value={formData.billingAddress.apartment}
                  onChange={handleChange}
                  placeholder='Apartment, suite, etc. (optional)'
                  className='w-full p-2 border rounded'
                />

                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col'>
                    <input
                      type='text'
                      name='billingAddress.city'
                      value={formData.billingAddress.city}
                      onChange={handleChange}
                      placeholder='City'
                      className={`p-2 border rounded ${
                        errors.billingAddress?.city ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.billingAddress?.city && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.billingAddress.city}
                      </p>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <select
                      name='billingAddress.state'
                      value={formData.billingAddress.state.code}
                      onChange={handleChange}
                      className='p-2 border rounded'
                      disabled={!states.billing.length}
                    >
                      <option value=''>Select State (optional)</option>
                      {states.billing.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col'>
                    <input
                      type='text'
                      name='billingAddress.postalCode'
                      value={formData.billingAddress.postalCode}
                      onChange={handleChange}
                      placeholder='Postal Code'
                      className={`p-2 border rounded ${
                        errors.billingAddress?.postalCode
                          ? 'border-red-500'
                          : ''
                      }`}
                    />
                    {errors.billingAddress?.postalCode && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.billingAddress.postalCode}
                      </p>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <select
                      name='billingAddress.country'
                      value={formData.billingAddress.country.code}
                      onChange={handleChange}
                      className={`p-2 border rounded ${
                        errors.billingAddress?.country ? 'border-red-500' : ''
                      }`}
                    >
                      <option value=''>Select Country</option>
                      {isCountries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {errors.billingAddress?.country && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.billingAddress.country}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            )}
          </section>
        </div>

        {/* Right Column - Order Summary */}
        <div className='border rounded-lg p-4 col-span-2 w-full'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold'>Order Summary</h2>
            <button
              className='text-base-brand hover:text-base-brand-dark text-sm font-semibold'
              onClick={() => router.push(`/dev/store/cart/${id}`)}
            >
              Edit Cart
            </button>
          </div>

          {/* Items List */}
          <div className='space-y-6 mb-6'>
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
                  <h3 className='font-semibold max-w-[200px]'>{item.name}</h3>
                  <p className='text-gray-500 text-sm'>
                    Quantity: {item.quantity} / {item.retail_price}
                  </p>
                </div>
                <div>${(item.retail_price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Order Calculations */}
          <div className='space-y-3 py-4 border-t'>
            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span>
                $
                {costDetails?.subtotal ||
                  cart?.items
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
              <span>
                {costDetails?.costs?.shipping
                  ? `$${Number(costDetails.costs.shipping).toFixed(2)}`
                  : 'Enter Shipping Address'}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Tax</span>
              <span>
                {costDetails?.costs?.tax
                  ? `$${Number(costDetails.costs.tax).toFixed(2)}`
                  : 'Enter Shipping Address'}
              </span>
            </div>
            <div className='flex justify-between font-semibold text-lg pt-4 border-t'>
              <span>Total</span>
              <span>
                {costDetails?.costs?.total
                  ? `$${Number(costDetails.costs.total).toFixed(2)}`
                  : 'Enter Shipping Address'}
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
            <button
              onClick={handleSubmit}
              className='w-full bg-blue-600 text-white py-3 rounded mt-5'
            >
              Proceed to Payment (stripe logo)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
