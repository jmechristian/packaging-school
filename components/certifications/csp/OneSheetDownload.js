import React, { useState } from 'react';
import { MdArrowOutward, MdSend, MdCheckCircle } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';

const OneSheetDownload = () => {
  const [isShown, setIsShown] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isEmail, setIsEmail] = useState('');
  const [isError, setIsError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const automateAndUnlock = async () => {
    if (isEmail && isEmail.match(validRegex)) {
      setIsSending(true);

      const user = await fetch(`/api/get-ac-user?email=${isEmail}`).then(
        (response) => response.json()
      );
      if (user.data.contacts[0]) {
        //Create Deal
        const deal = await fetch('/api/create-csp-deal', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            contactId: user.data.contacts[0].id,
            title: 'CSP prospect',
          }),
        }).then((response) => response.json());
      } else {
        const newUser = await fetch('/api/create-ac-user', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email: isEmail,
          }),
        }).then((res) => res.json());

        if (newUser.data.contact) {
          //Create Deal
          const deal = await fetch('/api/create-csp-deal', {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              contactId: newUser.data.contact.id,
              title: 'CSP prospect',
            }),
          }).then((response) => response.json());
        }
      }
      setIsSuccess(true);
      setIsEmail('Success!');
      window.open(
        'https://packschool.s3.amazonaws.com/Cert_of_Sust._Info_Sheet_Comp.pdf',
        '_blank'
      );
    } else {
      setIsError('Please Enter Email to Continue!');
    }

    setIsSending(false);
  };

  return (
    <div className='relative'>
      <div
        className='relative z-20 bg-white ring-4 ring-black rounded-2xl flex flex-col gap-6 md:gap-12 h-full items-center px-5 py-4 shadow-xl cursor-pointer hover:bg-brand-yellow transition-all ease-in group bg-cover bg-bottom'
        id='csp-download'
        onClick={() => setIsShown(!isShown)}
      >
        <div className='flex items-center justify-between w-full'>
          <div className='font-bold text-2xl flex flex-col items-start w-full tracking-tight'>
            <div>Download The One-Pager</div>
          </div>
          <div>
            <MdArrowOutward color='black' size={'50'} />
          </div>
        </div>
      </div>
      <AnimatePresence>
        <motion.div
          className='absolute inset-x-0 h-20 bg-base-brand shadow-lg rounded-2xl z-10 bottom-0 flex gap-4 justify-center items-center px-4'
          key={isShown}
          initial={{ y: 0 }}
          animate={isShown && { y: 80 }}
          exit={{ y: 0 }}
        >
          <motion.div className='flex-1'>
            <input
              type='email'
              id='email'
              value={isEmail}
              onChange={(e) => setIsEmail(e.target.value)}
              placeholder={isError ? isError : 'Enter Email to Download'}
              className='rounded-lg border-0 ring-0 bg-white/60 w-full'
            />
          </motion.div>
          <motion.div
            className={`cursor-pointer ${isSending ? 'animate-ping' : ''}`}
            onClick={automateAndUnlock}
          >
            {isSuccess ? (
              <MdCheckCircle size={28} color='white' />
            ) : (
              <MdSend size={28} color='white' />
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OneSheetDownload;
