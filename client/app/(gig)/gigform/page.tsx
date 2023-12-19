// MultiStepForm.tsx
'use client'
import Navbar from '@/components/navbar';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import Image from 'next/image';
import NextBreadcrumb from '@/components/NextBreadcrumb';

let bearerToken: string | null;

type StateManagedSelect = {
  value: string;
  label: string;
};

const MultiStepForm: React.FC = () => {
  const animatedComponents = makeAnimated();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    selectedSkills: [] as StateManagedSelect[],
    price: '',
    tags: '',
    image1: '',
    image2: '',
    image3: '',
    video: ''
  });

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
  const [image1, setImage1] = useState<string >('');
  const [image2, setImage2] = useState<string>('');
  const [image3, setImage3] = useState<string>('');
  const [video, setVideo] = useState<string>('');

  const handleImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image1file = e.target.files[0]
      const image1Url = URL.createObjectURL(image1file)
      setImage1(image1Url);     
      setFormData({
        ...formData,
        image1: image1
      }) 
    }
  };

  const handleImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image2 = e.target.files[0]
      const image2Url = URL.createObjectURL(image2)
      setImage2(image2Url);      
    }
  };

  const handleImage3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image3 = e.target.files[0]
      const image3Url = URL.createObjectURL(image3)
      setImage3(image3Url);      
    }
  };

  const handleVideoChange = (e: any) =>{
    if(e.target.files){
      const videofile = e.target.files[0];
      const videourl = URL.createObjectURL(videofile);
      console.log("video url" ,videourl);
      setVideo(videourl)
      console.log('sssssssss',video);
      

    }
  }


  const handleSkillsChange = (selectedOptions:any) => {
    const selectedSkillsArray = selectedOptions as StateManagedSelect[];
    setFormData({
      ...formData,
      selectedSkills: selectedSkillsArray,
    });
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    bearerToken = localStorage.getItem('token');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bearerToken) {
      try {
        const response = await axios.post('http://localhost:8001/addgig', formData, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        console.log('Response from userhome:', response.data);
      } catch (error) {
        console.error(error);
      }
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className='bg-bodywhite h-auto  pb-12'>
      <Navbar />
      <NextBreadcrumb
        homeElement={'Home'}
        separator={<span> &gt;  </span>}
        activeClasses='text-amber-500'
        containerClasses='flex py-2 bg-bodywhite' 
        listClasses='hover:underline mx-2 font-bold'
        capitalizeLinks
      />
      <div className=" bg-white mt-5 border-black rounded-2xl max-w-md mx-auto p-4">
        <h1 className='text-2xl font-bold mb-5'>Create New Gig </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label htmlFor="category" className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <Select
              closeMenuOnSelect={false}
              name='selectedSkills'
              components={animatedComponents}
              options={skillsOptions}
              value={formData.selectedSkills}
              onChange={handleSkillsChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Breif description about your Gig
            </label>
            <textarea className="w-96 p-2 border rounded-md focus:outline-none focus:border-green-500" />
          </div>
          <div className='mb-3'>
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
          <div className='mb-3'>
            <label htmlFor="price" className="block text-sm font-medium text-gray-600">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter gig Tags"
            />
          </div>
          <div className='mb-3 flex flex-row align-middle justify-center content-center'>
              {image1 && <Image height={500} width={500} src={image1 || ''} alt='displayImage1' className='h-28 w-32 ml-3'></Image>}
              {image2 && <Image height={500} width={500} src={image2 || ''} alt='displayImage1' className='h-28 w-32 ml-3'></Image>}
              {image3 && <Image height={500} width={500} src={image3 || ''} alt='displayImage1' className='h-28 w-32 ml-3'></Image>}
            
          </div>
          <div className='mb-3'>
            <label htmlFor="image1" className="block text-sm font-medium text-gray-600">
              image1
            </label>
            <input
              type="file"
              id="image1"
              name="image1"
              accept="image/*"
              onChange={handleImage1Change}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="image2" className="block text-sm font-medium text-gray-600">
              image2
            </label>
            <input
              type="file"
              id="image2"
              name="image2"
              accept="image/*"
              onChange={handleImage2Change}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="image3" className="block text-sm font-medium text-gray-600">
              image3
            </label>
            <input
              type="file"
              id="image3"
              name="image3"
              accept="image/*"
              onChange={handleImage3Change}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className='mb-3 flex flex-row align-middle justify-center content-center'>
            {video && <video controls  className='h-44 w-80 bg-black ml-3'>
            <source src={video || ''} type="video/mp4" />
            </video>}
          </div>
          <div className='mb-3'>
            <label htmlFor="price" className="block text-sm font-medium text-gray-600">
              video
            </label>
            <input
              type="file"
              id="video"
              name="video"
              accept="video/*"
              onChange={handleVideoChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
