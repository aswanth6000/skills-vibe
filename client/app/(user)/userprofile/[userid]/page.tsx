"use client";
import { useAppSelector } from "@/redux/store";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import axios from "../../../../config/axios";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextBreadcrumb from "@/components/NextBreadcrumb";
import { logIn } from "@/redux/features/authSlice";
import { StateManagedSelect } from "@/types/gigTypes";
import Skeleton from "react-loading-skeleton";

let bearerToken: string | null;

const UserProfileEdit: React.FC = () => {
  const [load, setLoad] = useState(false);
  const [pic, setPic] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const skillsOptions: StateManagedSelect[] = [
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
  const animatedComponents = makeAnimated();

  const updateSucess = () => {
    toast.success("Profile details updated successfully!!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const user = useAppSelector((state) => state.auth.value);

  const [formData, setFormData]: any = useState({
    username: "",
    phone: 0,
    email: "",
    description: "",
    selectedSkills: [] as StateManagedSelect[],
  });

  const { username, phone, email, description, selectedSkills } = formData;

  useEffect(() => {
    bearerToken = localStorage.getItem("token");

    if (bearerToken) {
      const fetchData = async () => {
        try {
          const response = await axios.get("/userhome", {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          });
          const userData = response.data;
          setPic(userData.profilePicture);
          setFormData({
            username: userData.username,
            phone: userData.phone,
            email: userData.email,
            description: userData.description,
            selectedSkills: userData.skills || [],
          });
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [user]);

  const handleSkillsChange = (selectedOptions: any) => {
    const selectedSkillsArray = selectedOptions as StateManagedSelect[];
    setFormData({
      ...formData,
      selectedSkills: selectedSkillsArray,
    });
  };

  const handleSaveChanges = async () => {
    const updatedUserData = formData;

    console.log("Updated user data:", updatedUserData);
    try {
      setLoad(true);
      const response = await axios.put(
        "/userProfileUpdate",
        updatedUserData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      if (response.status === 200) {
        setLoad(false);
        updateSucess();
        const updatedUser = response.data.user;
        console.log(updatedUser);
        dispatch(
          logIn({
            ...updatedUser,
          })
        );
      }
    } catch (error) {
      console.log("Error updating user profile:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        profilePicture: URL.createObjectURL(file),
        uploadPic: file,
      });
    }
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById(
      "file_input"
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <section>
      <Navbar />
      <NextBreadcrumb
        homeElement={"Home"}
        separator={<span> / </span>}
        activeClasses="text-amber-500"
        containerClasses="flex py-2 bg-bodywhite"
        listClasses="hover:underline mx-2 font-bold"
        capitalizeLinks
      />

      {load ? (
        <Skeleton />
      ) : (
        <div className="bg-bodywhite min-h-screen flex   ">
          <div className="w-1/3 bg-navwhite h-auto ml-5 rounded-2xl border-black  flex flex-col mt-2 items-center p-4 mb-12">
            <div className="w-56 h-56 rounded-full cursor-pointer overflow-hidden">
              <input
                id="file_input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Image
                src={formData.profilePicture ? formData.profilePicture : pic}
                alt="Profile"
                height={500}
                width={500}
                className="w-full h-full object-cover"
                onClick={handleImageClick}
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">{username}</h2>
          </div>

          <div className="w-1/3 flex-grow p-4 bg-navwhite h-auto ml-5 mt-2 rounded-2xl border-black mb-12">
            <h2 className="text-2xl font-bold mb-2">{username}</h2>
            <p className="text-gray-600">{description}</p>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                className="w-96 p-2 border rounded-md focus:outline-none focus:border-green-500"
                value={username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Phone
              </label>
              <input
                type="tel"
                className="w-96 p-2 border rounded-md focus:outline-none focus:border-green-500"
                value={phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: parseInt(e.target.value, 10),
                  })
                }
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                className="w-96 p-2 border rounded-md focus:outline-none focus:border-green-500"
                value={email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Skills
              </label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                value={selectedSkills}
                isMulti
                options={skillsOptions}
                onChange={handleSkillsChange}
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Brief description about yourself
              </label>
              <textarea
                className="w-96 p-2 border rounded-md focus:outline-none focus:border-green-500"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                value={description}
              />
            </div>

            <button
              className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>

          <div className="w-1/3 flex flex-col  items-center bg-navwhite h-auto ml-5 rounded-2xl border-black  mt-2 p-4 mb-12 mr-4 justify-center">
            <Link
              href="/order"
              className="w-2/3 mb-2 px-4 py-2 bg-green-500 flex justify-center text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              Orders
            </Link>
            <Link
              href="/myorders"
              className="w-2/3 mb-2 px-4 py-2 bg-green-500 flex justify-center text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              My Orders
            </Link>

            <Link
              href="/mygigs"
              className="w-2/3 mb-2 px-4 py-2 bg-green-500 flex justify-center text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              My Gigs
            </Link>

            <Link
              href="/gigform"
              className="w-2/3 mb-2 px-4 py-2 bg-green-500 flex justify-center text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              New Gig
            </Link>

            <Link
              href="/changepassword"
              className="w-2/3 mb-2 px-4 py-2 bg-green-500 flex justify-center text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              Change Password
            </Link>
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
};

export default UserProfileEdit;
