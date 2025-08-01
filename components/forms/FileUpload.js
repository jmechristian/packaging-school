import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MdUpload, MdDelete, MdFilePresent } from 'react-icons/md';

const FileUpload = ({
  name,
  label,
  required = false,
  accept = '.pdf,.jpg,.jpeg,.png,.gif',
  maxSize = 10 * 1024 * 1024, // 10MB default
  placeholder = 'Upload a file...',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const currentValue = watch(name);

  const uploadToS3 = async (file) => {
    setIsUploading(true);
    setError('');
    setUploadProgress(0);

    console.log(`FileUpload ${name}: Starting upload for file:`, file.name);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fieldName', name);

      const response = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      console.log(
        `FileUpload ${name}: Upload successful, URL:`,
        result.fileUrl
      );
      setValue(name, result.fileUrl);
      setUploadProgress(100);
    } catch (err) {
      setError('Failed to upload file. Please try again.');
      console.error(`FileUpload ${name}: Upload error:`, err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log(`FileUpload ${name}: Processing file:`, file.name, file.size);

    // Validate file type
    const allowedTypes = accept.split(',').map((type) => type.trim());
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    const isValidType = allowedTypes.some((type) =>
      type.startsWith('.')
        ? type === fileExtension
        : file.type.match(type.replace('*', '.*'))
    );

    if (!isValidType) {
      setError(`Invalid file type. Please upload: ${accept}`);
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setError(
        `File too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`
      );
      return;
    }

    await uploadToS3(file);
  };

  const handleRemoveFile = () => {
    setValue(name, '');
    setError('');
    setUploadProgress(0);
  };

  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex justify-between'>
        <label
          htmlFor={name}
          className='block text-sm md:text-base font-greycliff font-semibold leading-6 text-slate-700'
        >
          {label}
        </label>
        {required && (
          <span className='text-sm leading-6 text-red-500'>Required</span>
        )}
      </div>

      <div className='mt-1 md:mt-2'>
        {!currentValue ? (
          <div className='flex items-center justify-center w-full'>
            <label
              htmlFor={`file-${name}`}
              className='flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors'
            >
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <MdUpload className='w-8 h-8 mb-2 text-slate-400' />
                <p className='mb-2 text-sm text-slate-500'>
                  <span className='font-semibold'>Click to upload</span> or drag
                  and drop
                </p>
                <p className='text-xs text-slate-500'>
                  {accept} (Max {Math.round(maxSize / 1024 / 1024)}MB)
                </p>
              </div>
              <input
                id={`file-${name}`}
                type='file'
                className='hidden'
                accept={accept}
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </label>
          </div>
        ) : (
          <div className='flex items-center justify-between p-3 border border-slate-300 rounded-lg bg-slate-50'>
            <div className='flex items-center gap-2'>
              <MdFilePresent className='w-5 h-5 text-slate-600' />
              <span className='text-sm text-slate-700'>
                {currentValue.split('/').pop()}
              </span>
            </div>
            <button
              type='button'
              onClick={handleRemoveFile}
              className='text-red-500 hover:text-red-700 transition-colors'
              disabled={isUploading}
            >
              <MdDelete className='w-5 h-5' />
            </button>
          </div>
        )}
      </div>

      {isUploading && (
        <div className='w-full bg-slate-200 rounded-full h-2'>
          <div
            className='bg-blue-600 h-2 rounded-full transition-all duration-300'
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {error && <div className='text-sm text-red-600 mt-1'>{error}</div>}

      {errors[name] && (
        <div className='text-sm text-red-600 mt-1'>
          {errors[name].message || 'This field is required'}
        </div>
      )}

      <input
        {...register(name, { required: required && 'This field is required' })}
        type='hidden'
      />
    </div>
  );
};

export default FileUpload;
