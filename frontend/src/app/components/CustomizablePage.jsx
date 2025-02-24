"use client";

import { useState, useEffect } from "react";
import AboutMe from "@/app/components/AboutMeInput";
import AddressInput from "./AddressInput";
import StepIndicator from "./StepIndicator";
import {useRouter} from "next/navigation";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UserFormPage(props) {
    const [config, setConfig] = useState({ aboutMe: true, address: true, birthdate: true });
    const [formData, setFormData] = useState({
        aboutMe: "",
        address: { street: "", city: "", state: "", zip: "" },
        birthdate: "",
    });
    const [email, setEmail] = useState("");
    const router = useRouter();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        setEmail(queryParams.get('email'));
        const fetchConfig = async () => {
            try {
                const response = await fetch(`${apiUrl}/config?pageName=${props.pageName}`);
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setConfig(data.sections);
            } catch (error) {
                console.error("Error fetching config:", error);
            }
        };

        fetchConfig();
    }, []);

    const handleSubmit = (e) => {
        const payload = {
            email,
            config: { ...config },
            ...Object.fromEntries(
                Object.entries({
                    aboutMe: formData.aboutMe,
                    address: formData.address,
                    birthdate: formData.birthdate,
                }).filter(([key]) => config[key]) // Only include enabled fields
            ),
        };
        fetch(`${apiUrl}/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error('Failed to update user');
                }
            })
            .then((data) => {
                router.push(`/user/page3?email=${encodeURIComponent(email)}`);
            })
            .catch((error) => {
                console.error('Error:', error)
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddressChange = (e) => {
        let { name, value } = e.target;
        if (name === 'birthdate') {
            value = formatBirthday(value);
        }
        setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, [name]: value },
        }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 min-h-[100vh] bg-white p-6 rounded-lg shadow-lg">
                <div className="">
                    <StepIndicator step={props.pageName === "page2" ? 2 : 3} />
                    <h1 className="text-center text-4xl mb-8 font-bold">Additional Details</h1>
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        {config.aboutMe &&(
                            <div className="w-full h-1/3">
                                <AboutMe value={formData.aboutMe} onChange={(e) => handleInputChange( { target: { name: 'aboutMe', value: e.target.value } })} />
                            </div>
                        )}
                        {config.address && (
                            <div className="w-full h-1/3">
                                <AddressInput value={formData.address} onChange={handleAddressChange} />
                            </div>
                        )}
                        {config.birthdate && (
                            <div className="w-full h-1/3 text-center">
                                <DatePicker
                                    selected={formData.birthdate ? new Date(formData.birthdate) : null}
                                    onChange={(date) => handleInputChange({ target: { name: "birthdate", value: date.toISOString().split("T")[0] } })}
                                    dateFormat="yyyy-MM-dd"
                                    showYearDropdown
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={100}
                                    placeholderText={"Birthdate"}
                                    className="text-center border border-gray-300 text-2xl rounded-md my-2 p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        )}
                        <button
                            className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                            onClick={handleSubmit}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
