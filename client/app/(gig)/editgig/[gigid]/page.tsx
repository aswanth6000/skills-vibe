"use client";
import Navbar from "@/components/navbar";
import React, { ChangeEvent, useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useParams } from "next/navigation";
import axios from "../../../../config/axios";
import Image from "next/image";
import NextBreadcrumb from "@/components/NextBreadcrumb";
import { StateManagedSelect, FormData } from "@/types/gigTypes";

let bearerToken: string | null;

// ... (your existing imports)

const MultiStepForm: React.FC = () => {
  const params = useParams<{ tag: string; gigid: string }>();
  const [title, setTitle] = useState("");
  const [data, setData] = useState<FormData>({
    title: "",
    category: [],
    gigdescription: "",
    price: "",
    tags: "",
    image1: "",
    image2: "",
    image3: "",
    video: "",
  });
  const gigid = params.gigid;
  useEffect(() => {
    bearerToken = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/user/editgig/${gigid}`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data[0]);
        
        
        setFormData({
          title: response.data[0].title,
          category: response.data[0].category,
          description: response.data[0].gigdescription,
          price: response.data[0].price,
          tags: response.data[0].tags,
          image1: response.data[0].image1,
          image2: response.data[0].image2,
          image3: response.data[0].image3,
          video: response.data[0].video,
        });
      } catch (error) {
        console.log("error occurred", error);
      }
    };
    fetchData();
  }, []);

  const initialFileValue: File | string = "";
  const animatedComponents = makeAnimated();

  const [formData, setFormData] = useState({
    title: data.title,
    category: data.category as StateManagedSelect[],
    description: data.gigdescription,
    price: data.price,
    tags: data.tags,
    image1: data.image1,
    image2: data.image2,
    image3: data.image3,
    video: data.video,
  });

  const skillsOptions = [
    { value: "graphic-design", label: "Graphic Design" },
    { value: "web-development", label: "Web Development" },
    { value: "content-writing", label: "Content Writing" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "video-editing", label: "Video Editing" },
    { value: "music-production", label: "Music Production" },
    { value: "social-media-management", label: "Social Media Management" },
    { value: "translation", label: "Translation" },
    { value: "voice-over", label: "Voice Over" },
    { value: "illustration", label: "Illustration" },
  ];

  const [viewimage1, setviewImage1] = useState<any>("");
  const [viewimage2, setviewImage2] = useState<any>("");
  const [viewimage3, setviewImage3] = useState<any>("");
  const [viewvideo, setviewVideo] = useState<any>("");

  useEffect(() => {
    setviewImage1(formData.image1);
    setviewImage2(formData.image2);
    setviewImage3(formData.image3);
  }, [formData.image1]);

  const handleFileChange =
    (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];

        const imageUrl = URL.createObjectURL(file);

        setFormData({
          ...formData,
          [field]: file,
        });

        if (field === "image1") setviewImage1(imageUrl);
        else if (field === "image2") setviewImage2(imageUrl);
        else if (field === "image3") setviewImage3(imageUrl);
      }
    };

  console.log(viewimage1);

  const handleVideoChange = (e: any) => {
    if (e.target.files) {
      const videofile = e.target.files[0];
      const videourl = URL.createObjectURL(videofile);
      setviewVideo(videourl);
      setFormData({
        ...formData,
        video: videofile,
      });
    }
  };

  const handleSkillsChange = (selectedOptions: any) => {
    const selectedSkillsArray = selectedOptions as StateManagedSelect[];
    setFormData({
      ...formData,
      category: selectedSkillsArray,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bearerToken) {
      try {
        const response = await axios.post(
          "/gig/editgig",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        console.log("Response from userhome:", response.data);
      } catch (error) {
        console.error(error);
      }
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-bodywhite h-auto  pb-12">
      <Navbar />
      <NextBreadcrumb
        homeElement={"Home"}
        separator={<span> &gt; </span>}
        activeClasses="text-amber-500"
        containerClasses="flex py-2 bg-bodywhite"
        listClasses="hover:underline mx-2 font-bold"
        capitalizeLinks
      />
      <div className=" bg-white mt-5 border-black rounded-2xl max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-5">Edit Gig </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {data && (
            <>
              <div className="mb-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-600"
                >
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
              <div className="mb-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-600"
                >
                  Category
                </label>
                <Select
                  closeMenuOnSelect={false}
                  name="category"
                  components={animatedComponents}
                  options={skillsOptions}
                  value={formData.category}
                  onChange={handleSkillsChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-600"
                >
                  Brief description about your Gig
                </label>
                <textarea
                  className="w-96 p-2 border rounded-md focus:outline-none focus:border-green-500"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-600"
                >
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
              <div className="mb-3">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-600"
                >
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
              <div className="mb-3 flex flex-row align-middle justify-center content-center">
                {viewimage1 && (
                  <Image
                    height={500}
                    width={500}
                    src={
                      typeof viewimage1 === "string"
                        ? viewimage1
                        : URL.createObjectURL(viewimage1)
                    }
                    alt="displayviewImage1"
                    className="h-28 w-32 ml-3"
                  />
                )}
                {viewimage2 && (
                  <Image
                    height={500}
                    width={500}
                    src={
                      typeof viewimage2 === "string"
                        ? viewimage2
                        : URL.createObjectURL(viewimage2)
                    }
                    alt="displayviewImage1"
                    className="h-28 w-32 ml-3"
                  />
                )}
                {viewimage3 && (
                  <Image
                    height={500}
                    width={500}
                    src={
                      typeof viewimage3 === "string"
                        ? viewimage3
                        : URL.createObjectURL(viewimage3)
                    }
                    alt="displayviewImage1"
                    className="h-28 w-32 ml-3"
                  />
                )}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium text-gray-600"
                >
                  Image 1
                </label>
                <input
                  type="file"
                  id="image1"
                  name="image1"
                  accept="image/*"
                  onChange={handleFileChange("image1")}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium text-gray-600"
                >
                  Image 2
                </label>
                <input
                  type="file"
                  id="image2"
                  name="image2"
                  accept="image/*"
                  onChange={handleFileChange("image2")}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium text-gray-600"
                >
                  Image 3
                </label>
                <input
                  type="file"
                  id="image3"
                  name="image3"
                  accept="image/*"
                  onChange={handleFileChange("image3")}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-3 flex flex-row align-middle justify-center content-center">
                {viewvideo && (
                  <video controls className="h-44 w-80 bg-black ml-3">
                    <source src={viewvideo || ""} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="video"
                  className="block text-sm font-medium text-gray-600"
                >
                  Video
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
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
