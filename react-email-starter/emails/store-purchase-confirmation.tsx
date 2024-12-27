import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Row,
  Preview,
  Section,
  Text,
  Button,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

interface StorePurchaseConfirmationProps {
  data: {
    data: {
      id: string;
      name: string;
      email: string;
      address: string;
      city: string;
      state: string;
      zip: string;
      country: string;
      items: any[];
      printfulOrderId: string;
      total: string;
      shipping: string;
      shippingMethod: string;
      tax: string;
      subtotal: string;
      phone: string;
      paymentMethod: string;
      paymentLast4: string;
    };
  };
}

export const StorePurchaseConfirmation = ({
  data,
}: StorePurchaseConfirmationProps) => {
  const current = Date.now();
  const newDate = data && new Date(current).toDateString();
  console.log(data);

  const items = data.data.items.map((item: any) => {
    return item;
  });

  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className='bg-white mt-6'>
          <Container className='max-w-2xl mx-auto bg-white border  border-solid border-grey-500 w-full h-full'>
            <Section className='border-b border-b-black border-solid p-5'>
              <Row>
                <Column className='w-[20%] text-right'>
                  <Img
                    src='https://packschool.s3.amazonaws.com/PS_com+LOGO+1.png'
                    width={'125'}
                    className='mr-0'
                  />
                </Column>
                <Column className='w-[80%] text-right'>
                  <Text className='text-2xl font-[HelveticaNeue-Bold] leading-tight tracking-tight'>
                    Purchase Confirmation
                  </Text>
                  <Text className='font-[HelveticaNeue] leading-tight tracking-tight text-gray-500'>
                    Order #{data.data.printfulOrderId}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className='p-5 border-b border-b-black border-solid'>
              <Row>
                <Column>
                  <Text className='text-2xl font-[HelveticaNeue-Bold]'>
                    Thank you for your purchase!
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text className='text-lg font-[HelveticaNeue] text-gray-500'>
                    Hi {data.data.name},<br />
                    Thank you for your order! Your purchase is confirmed and is
                    now being processed for shipment. We’re excited to get your
                    campus store items to you as soon as possible.
                  </Text>
                  <Text className='text-lg font-[HelveticaNeue] text-gray-500'>
                    If you have any questions, please contact us at{' '}
                    <Link href='mailto:info@packagingschool.com'>
                      info@packagingschool.com
                    </Link>
                    .
                  </Text>
                  <Button
                    href={`https://packagingschool.com/dev/store/order-confirmation/${data.data.id}`}
                    className='bg-[#1f97bf] text-white font-[HelveticaNeue] text-lg px-4 py-3 mb-5'
                  >
                    View Order
                  </Button>
                </Column>
              </Row>
            </Section>
            <Section className='p-5 border-b border-b-black border-solid'>
              <Row>
                <Column>
                  <Text className='text-lg font-[HelveticaNeue-Bold]'>
                    Items
                  </Text>
                </Column>
              </Row>
              {items.map((item: any, index: number) => (
                <Row key={index} className='mb-5'>
                  {item.files?.find((file) => file.type === 'preview')
                    ?.thumbnail_url && (
                    <Column className='w-[20%] border border-solid border-gray-500 text-center p-2'>
                      <Img
                        src={
                          item.files?.find((file) => file.type === 'preview')
                            ?.thumbnail_url ||
                          item.product?.image ||
                          '/fallback-image.jpg'
                        }
                        width={100}
                        className='mx-auto'
                      />
                    </Column>
                  )}
                  <Column>
                    <Text className='font-[HelveticaNeue] text-gray-500 max-w-[350px] ml-5 text-lg'>
                      {item.name}
                    </Text>
                    <Text className='font-[HelveticaNeue] text-gray-500 ml-5'>
                      {item.retail_price} x {item.quantity}
                    </Text>
                  </Column>
                </Row>
              ))}
              <Row>
                <Column>
                  <Text className='font-[HelveticaNeue] text-gray-500 ml-5 text-lg'>
                    Total: {data.data.total}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className='p-5 border-b border-b-black border-solid'>
              <Row>
                <Column>
                  <Text className='text-lg font-[HelveticaNeue-Bold]'>
                    Order Summary
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column className='w-[20%]'>
                  <Text className='font-[HelveticaNeue] text-gray-500 text-lg '>
                    Subtotal:
                  </Text>
                </Column>
                <Column className='w-[50%]'>
                  <Text className='font-[HelveticaNeue] text-gray-500 text-lg'>
                    ${parseFloat(data.data.subtotal).toFixed(2)}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column className='w-[20%]'>
                  <Text className='font-[HelveticaNeue] text-gray-500 text-lg'>
                    Shipping:
                  </Text>
                </Column>
                <Column className='w-[50%]'>
                  <Text className='font-[HelveticaNeue] text-gray-500 text-lg text-left'>
                    ${parseFloat(data.data.shipping).toFixed(2)}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column className='w-[20%]'>
                  <Text className='font-[HelveticaNeue] text-gray-500 text-lg'>
                    Tax:
                  </Text>
                </Column>
                <Column className='w-[50%]'>
                  <Text className='font-[HelveticaNeue] text-gray-500 text-lg'>
                    ${parseFloat(data.data.tax).toFixed(2)}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column className='w-[20%]'>
                  <Text className='font-[HelveticaNeue-Bold] text-gray-500 text-lg'>
                    Total:
                  </Text>
                </Column>
                <Column className='w-[50%]'>
                  <Text className='font-[HelveticaNeue-Bold] text-gray-500 text-lg'>
                    ${parseFloat(data.data.total).toFixed(2)}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column className='w-[50%]'>
                  <Text className='font-[HelveticaNeue-Bold] text-lg'>
                    Shipping Address:
                  </Text>
                  <Text className='font-[HelveticaNeue] text-gray-500 text-lg'>
                    {data.data.name}
                    <br />
                    {data.data.address}
                    <br />
                    {data.data.city}, {data.data.state} {data.data.zip}
                    <br />
                    {data.data.country}
                  </Text>
                </Column>
                <Column className='w-[50%]'>
                  <Text className='font-[HelveticaNeue-Bold] text-lg'>
                    Billing Address:
                  </Text>
                  <Text className='font-[HelveticaNeue] text-gray-500 text-lg'>
                    {data.data.name}
                    <br />
                    {data.data.address}
                    <br />
                    {data.data.city}, {data.data.state} {data.data.zip}
                    <br />
                    {data.data.country}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column className='w-[50%]'>
                  <Text className='font-[HelveticaNeue-Bold] text-lg'>
                    Shipping Method:
                  </Text>
                  <Text className='font-[HelveticaNeue] text-gray-500 text-lg'>
                    {data.data.shippingMethod}
                  </Text>
                </Column>
                <Column className='w-[50%]'>
                  <Text className='font-[HelveticaNeue-Bold] text-lg'>
                    Payment Method:
                  </Text>
                  <Text className='font-[HelveticaNeue] text-gray-500 text-lg'>
                    Payment Method: {data.data.paymentMethod}
                  </Text>
                  <Text className='font-[HelveticaNeue] text-gray-500 text-lg uppercase'>
                    **** **** **** {data.data.paymentLast4}{' '}
                    {data.data.paymentMethod}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className='text-center bg-black text-white'>
              <Text className='font-[HelveticaNeue-Bold] text-[12px] text-white uppercase'>
                <Link
                  href='https://packagingschool.com'
                  className='text-[#ff9321]'
                >
                  Packaging School<sup className='text-[8px]'>&reg;</sup>{' '}
                  Powered
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

StorePurchaseConfirmation.PreviewProps = {
  data: {
    data: {
      id: '1234567890',
      name: 'Jamie Christian',
      email: 'jmechristian@gmail.com',
      printfulOrderId: '115257502',
      company: '',
      phone: '+15122893696',
      address: '1015 Atlantic Dr',
      zip: '22554',
      state: 'VA',
      city: 'Stafford',
      country: 'US',
      code: '22554',
      total: '71.49',
      subtotal: '62',
      shippingMethod: 'STANDARD',
      shipping: '9.49',
      tax: '3.46',
      items: [
        '{"name":"Official Packaging School Logo on Navy Blue / M","id":4628591526,"external_id":"4520","variant_id":10125,"quantity":1,"retail_price":"22.50","files":[{"id":350585936,"type":"default","hash":"52a14b663a6467852d16436b06fe38ac","url":null,"filename":"PS-Logo-WIDE-Orange--Red.png","mime_type":"image/png","size":833643,"width":3500,"height":804,"dpi":300,"status":"ok","created":1629394380,"thumbnail_url":"https://files.cdn.printful.com/files/52a/52a14b663a6467852d16436b06fe38ac_thumb.png","preview_url":"https://files.cdn.printful.com/files/52a/52a14b663a6467852d16436b06fe38ac_preview.png","visible":true,"is_temporary":false,"message":"","options":[{"id":"transparency_validation_result_data","value":{"validationHash":"1b6a54afa0602444b86e4c167747f0b1","isValid":true}}],"stitch_count_tier":null},{"id":346732227,"type":"back","hash":"39c8fac3fce9237b4eef286e66eba9ac","url":null,"filename":"PS-Square-White.png","mime_type":"image/png","size":77303,"width":2557,"height":2374,"dpi":300,"status":"ok","created":1628277530,"thumbnail_url":"https://files.cdn.printful.com/files/39c/39c8fac3fce9237b4eef286e66eba9ac_thumb.png","preview_url":"https://files.cdn.printful.com/files/39c/39c8fac3fce9237b4eef286e66eba9ac_preview.png","visible":true,"is_temporary":false,"message":"","options":[{"id":"transparency_validation_result_data","value":{"validationHash":"d16a0d0041904672c9b1214e67a6a0ab","isValid":true}}],"stitch_count_tier":null},{"id":350588425,"type":"preview","hash":"2714ebb6f2638ba5bfe71f324c35db7f","url":null,"filename":"unisex-long-sleeve-tee-navy-front-611e97e29568e.jpg","mime_type":"image/jpeg","size":76596,"width":1000,"height":1000,"dpi":null,"status":"ok","created":1629394918,"thumbnail_url":"https://files.cdn.printful.com/files/271/2714ebb6f2638ba5bfe71f324c35db7f_thumb.png","preview_url":"https://files.cdn.printful.com/files/271/2714ebb6f2638ba5bfe71f324c35db7f_preview.png","visible":false,"is_temporary":false,"message":"","stitch_count_tier":null}]}',
        '{"name":"It\'s Not CARDBOARD, It\'s Called CORRUGATED FIBERBOARD Comfy Tee / M","id":4628591520,"external_id":"4541","variant_id":6498,"quantity":1,"retail_price":"23.00","files":[{"id":348462230,"type":"default","hash":"868f97d2a73ff7fae531968cf2cbcece","url":null,"filename":"Not-Cardboard.png","mime_type":"image/png","size":4036743,"width":3466,"height":2192,"dpi":300,"status":"ok","created":1628783276,"thumbnail_url":"https://files.cdn.printful.com/files/868/868f97d2a73ff7fae531968cf2cbcece_thumb.png","preview_url":"https://files.cdn.printful.com/files/868/868f97d2a73ff7fae531968cf2cbcece_preview.png","visible":true,"is_temporary":false,"message":"","options":[{"id":"transparency_validation_result_data","value":{"validationHash":"ee00d8b38dce7b9d756ab234b3ef2d18","isValid":true}}],"stitch_count_tier":null},{"id":346732227,"type":"back","hash":"39c8fac3fce9237b4eef286e66eba9ac","url":null,"filename":"PS-Square-White.png","mime_type":"image/png","size":77303,"width":2557,"height":2374,"dpi":300,"status":"ok","created":1628277530,"thumbnail_url":"https://files.cdn.printful.com/files/39c/39c8fac3fce9237b4eef286e66eba9ac_thumb.png","preview_url":"https://files.cdn.printful.com/files/39c/39c8fac3fce9237b4eef286e66eba9ac_preview.png","visible":true,"is_temporary":false,"message":"","options":[{"id":"transparency_validation_result_data","value":{"validationHash":"76471b79d0dff5101b3747bf7643f733","isValid":true}}],"stitch_count_tier":null},{"id":352928873,"type":"preview","hash":"b4f0707ee85b1499fd6055071b0661a2","url":null,"filename":"unisex-tri-blend-t-shirt-brown-triblend-front-6128ef95ccc5f.jpg","mime_type":"image/jpeg","size":181511,"width":1000,"height":1000,"dpi":null,"status":"ok","created":1630072727,"thumbnail_url":"https://files.cdn.printful.com/files/b4f/b4f0707ee85b1499fd6055071b0661a2_thumb.png","preview_url":"https://files.cdn.printful.com/files/b4f/b4f0707ee85b1499fd6055071b0661a2_preview.png","visible":false,"is_temporary":false,"message":"","stitch_count_tier":null}]}',
        '{"name":"Great Outdoors Packaging School Shirt / M","id":4628591513,"external_id":"4573","variant_id":10119,"quantity":1,"retail_price":"16.50","files":[{"id":354380992,"type":"default","hash":"8029eb0b9fd1a780f34dda2ff1bc7d4c","url":null,"filename":"PS-Blaze-Orange.png","mime_type":"image/png","size":1068468,"width":3300,"height":3500,"dpi":300,"status":"ok","created":1630503138,"thumbnail_url":"https://files.cdn.printful.com/files/802/8029eb0b9fd1a780f34dda2ff1bc7d4c_thumb.png","preview_url":"https://files.cdn.printful.com/files/802/8029eb0b9fd1a780f34dda2ff1bc7d4c_preview.png","visible":true,"is_temporary":false,"message":"","options":[{"id":"transparency_validation_result_data","value":{"validationHash":"6e6268a715ea39ef5fdabb55bca78f4a","isValid":true}}],"stitch_count_tier":null},{"id":354381724,"type":"preview","hash":"4907d4c8913b55768167b7b25afa5e34","url":null,"filename":"unisex-long-sleeve-tee-military-green-front-612f81aa4a9c5.jpg","mime_type":"image/jpeg","size":97689,"width":1000,"height":1000,"dpi":null,"status":"ok","created":1630503340,"thumbnail_url":"https://files.cdn.printful.com/files/490/4907d4c8913b55768167b7b25afa5e34_thumb.png","preview_url":"https://files.cdn.printful.com/files/490/4907d4c8913b55768167b7b25afa5e34_preview.png","visible":false,"is_temporary":false,"message":"","stitch_count_tier":null}]}',
      ],

      paymentMethod: 'visa',
      paymentLast4: '4242',
    },
  },
} as StorePurchaseConfirmationProps;

export default StorePurchaseConfirmation;
