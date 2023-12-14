// MultiStepForm.tsx
'use client'
import Navbar from '@/components/navbar';
import React, { useState } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';


const MultiStepForm: React.FC = () => {
  const skillsOptions = [
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'content-writing', label: 'Content Writing' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'video-editing', label: 'Video Editing' },
    { value: 'music-production', label: 'Music Production' },
    { value: 'social-media-management', label: 'Social Media Management' },
    { value: 'translation', label: 'Translation' },
    { value: 'voice-over', label: 'Voice Over' },
    { value: 'illustration', label: 'Illustration' },
  ];
  const animatedComponents = makeAnimated();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className='bg-bodywhite h-screen'>
    <Navbar/>
    <div className=" bg-white mt-5 border-black rounded-2xl max-w-md mx-auto p-4">
      <h1 className='text-2xl font-bold mb-5'>Create New Gig  </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <div>
            <div className='mb-3'>
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Gig Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter gig title"
              />
              </div>
              <div className='mb-3'>
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={[skillsOptions[4]]}
              
              options={skillsOptions}
            />
              </div>
              <div className='mb-3'>
              <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Breif description about your Gig
            </label>
              <textarea className="w-96 p-2 border rounded-md focus:outline-none focus:border-green-500" />
              </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter gig category"
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter gig description"
            ></textarea>
          </div>
        )}

        {step === 4 && (
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-600">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter gig price"
            />
          </div>
        )}

        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevStep}
              className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          {step === 1 &&
            <button type="button" onClick={handleNextStep} className="bg-gray-500  text-white p-2 rounded-md hover:bg-gray-600">
            cancel
          </button>          
          }
          {step < 4 ? (
            <button type="button" onClick={handleNextStep} className="bg-green-500 ml-auto text-white p-2 rounded-md hover:bg-green-600">
              Next
            </button>
          ) : (
            <button type="submit" className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
    </div>
  );
};

export default MultiStepForm;
