// MultiStepForm.tsx
'use client'
import React, { useState } from 'react';

const MultiStepForm: React.FC = () => {
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
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <div>
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

          {step < 4 ? (
            <button type="button" onClick={handleNextStep} className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
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
  );
};

export default MultiStepForm;
