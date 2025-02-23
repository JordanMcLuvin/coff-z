'use client'
import { useState, useEffect } from 'react';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


const AdminEdit = () => {
    const [page2Selected, setPage2Selected] = useState({"aboutMe": false, "address": false, "birthdate": false});
    const [page3Selected, setPage3Selected] = useState({"aboutMe": false, "address": false, "birthdate": false});
    const [notification, setNotification] = useState(false);
    const [errorNotification, setErrorNotification] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const options = ["aboutMe", "address", "birthdate"];

    const handlePage2Change = (option) => {
        setPage2Selected((prevState) => {
            if (page3Selected[option]) {
                setPage3Selected((prevStateList) => ({
                    ...prevStateList,
                    [option]: false,
                }));
            }
            return {
                ...prevState,
                [option]: !prevState[option],
            };
        });
    };

    const handlePage3Change = (option) => {
        setPage3Selected((prevState) => {
            if (page2Selected[option]) {
                setPage2Selected((prevStateList) => ({
                    ...prevStateList,
                    [option]: false,
                }));
            }
            return {
                ...prevState,
                [option]: !prevState[option],
            };
        });
    };

    const handleSubmit = () => {
        if (!hasAtLeastOneTrue(page2Selected) || !hasAtLeastOneTrue(page3Selected)) {
            setButtonDisabled(true)
            setErrorNotification(true);
            setTimeout(() => setButtonDisabled(false), 3000);
            setTimeout(() => setErrorNotification(false), 3000);
            return;
        }
        const payload = {
            "page2": page2Selected,
            "page3": page3Selected,
        };
        fetch(`${apiUrl}/config`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setNotification(true);
                setTimeout(() => setNotification(false), 3000);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const hasAtLeastOneTrue = (obj) => {
        return Object.values(obj).some(value => value === true);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
            <div className="w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 min-h-[100vh] bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center">
                <h1 className="text-center text-6xl font-semibold mb-4">Admin Edit</h1>
                <span className="text-center text-2xl font-semibold mb-4">Select which options appear on which page below</span>
                <div className="flex justify-around space-x-10">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-2xl">Page 2</h3>
                        {options.map((option) => (
                            <div key={option} className="text-left">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={page2Selected[option] || false}
                                        onChange={() => handlePage2Change(option)}
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-2xl">Page 3</h3>
                        {options.map((option) => (
                            <div key={option} className="text-left">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={page3Selected[option] || false}
                                        onChange={() => handlePage3Change(option)}
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    hidden={buttonDisabled}
                    className="w-full bg-blue-500 text-white mt-8 py-2 px-4 rounded-lg hover:bg-blue-700"
                    onClick={handleSubmit}>
                    Save Changes
                </button>
                {notification && (
                    <div className="mt-4 p-4 bg-green-500 text-white rounded-lg">
                        Settings updated successfully!
                    </div>
                )}
                {errorNotification && (
                    <div className="mt-4 p-4 bg-red-500 text-white rounded-lg">
                        You must select at least 1 option for each page.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminEdit;
