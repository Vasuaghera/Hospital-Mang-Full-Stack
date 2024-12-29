import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', JSON.stringify(userData.address));
            formData.append('gender', userData.gender);
            formData.append('dob', userData.dob);

            image && formData.append('image', image);

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return userData ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <div className="flex flex-col items-center">
                    {isEdit ? (
                        <label htmlFor="image" className="relative cursor-pointer">
                            <div>
                                <img
                                    className="w-36 h-36 rounded-full object-cover"
                                    src={image ? URL.createObjectURL(image) : userData.image}
                                    alt="User"
                                />
                                <img
                                    className="w-10 absolute bottom-0 right-0 transform translate-x-2 translate-y-2"
                                    src={assets.upload_icon}
                                    alt="Upload Icon"
                                />
                            </div>
                            <input
                                onChange={(e) => setImage(e.target.files[0])}
                                type="file"
                                id="image"
                                hidden
                            />
                        </label>
                    ) : (
                        <img
                            className="w-36 h-36 rounded-full object-cover"
                            src={userData.image}
                            alt="User"
                        />
                    )}

                    {isEdit ? (
                        <input
                            className="text-xl font-medium bg-gray-100 border rounded p-2 mt-4"
                            type="text"
                            onChange={(e) =>
                                setUserData((prev) => ({ ...prev, name: e.target.value }))
                            }
                            value={userData.name}
                        />
                    ) : (
                        <p className="text-xl font-medium mt-4">{userData.name}</p>
                    )}
                </div>

                <hr className="my-6" />

                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <p>Email:</p>
                        <p className="text-blue-500">{userData.email}</p>
                        <p>Phone:</p>
                        {isEdit ? (
                            <input
                                className="bg-gray-100 border rounded p-2"
                                type="text"
                                onChange={(e) =>
                                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                                }
                                value={userData.phone}
                            />
                        ) : (
                            <p>{userData.phone}</p>
                        )}
                        <p>Address:</p>
                        {isEdit ? (
                            <div>
                                <input
                                    className="bg-gray-100 border rounded p-2 w-full mb-2"
                                    type="text"
                                    onChange={(e) =>
                                        setUserData((prev) => ({
                                            ...prev,
                                            address: { ...prev.address, line1: e.target.value },
                                        }))
                                    }
                                    value={userData.address.line1}
                                />
                                <input
                                    className="bg-gray-100 border rounded p-2 w-full"
                                    type="text"
                                    onChange={(e) =>
                                        setUserData((prev) => ({
                                            ...prev,
                                            address: { ...prev.address, line2: e.target.value },
                                        }))
                                    }
                                    value={userData.address.line2}
                                />
                            </div>
                        ) : (
                            <p>
                                {userData.address.line1} <br />
                                {userData.address.line2}
                            </p>
                        )}
                    </div>
                </div>

                <hr className="my-6" />

                <div>
                    <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <p>Gender:</p>
                        {isEdit ? (
                            <select
                                className="bg-gray-100 border rounded p-2"
                                onChange={(e) =>
                                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                                }
                                value={userData.gender}
                            >
                                <option value="Not Selected">Not Selected</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        ) : (
                            <p>{userData.gender}</p>
                        )}
                        <p>Birthday:</p>
                        {isEdit ? (
                            <input
                                className="bg-gray-100 border rounded p-2"
                                type="date"
                                onChange={(e) =>
                                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                                }
                                value={userData.dob}
                            />
                        ) : (
                            <p>{userData.dob}</p>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    {isEdit ? (
                        <button
                            onClick={updateUserProfileData}
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    ) : null;
};

export default MyProfile;
