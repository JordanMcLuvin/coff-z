"use client";
import { useState, useEffect } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default function UserDataPage() {
    const [email, setEmail] = useState("");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserData = async () => {
        if (!email) return;
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}/user?email=${encodeURIComponent(email)}`);
            if (!response.ok) throw new Error("Failed to fetch user data");

            const data = await response.json();
            setUserData(data);
        } catch (err) {
            setError(err.message);
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">User Data</h1>
                <p className="text-center">Dev Note: This can be refreshed by clicking search again. I think this implementation is better if you wanted short polling. The other method would be to just add email to query, grab that with URLSearchParams and pull the email from req.query instead of request body.</p>
                <div className="flex space-x-2 mb-4">
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={fetchUserData}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        Search
                    </button>
                </div>

                {loading && <p className="text-gray-600">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {userData && (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Field</th>
                            <th className="border p-2">Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.entries(userData).map(([key, value]) => {
                            if (key === "address" && typeof value === "object") {
                                return (
                                    <>
                                        <tr key="street" className="odd:bg-white even:bg-gray-50">
                                            <td className="border p-2 font-semibold">Street</td>
                                            <td className="border p-2">{value.street || "N/A"}</td>
                                        </tr>
                                        <tr key="city" className="odd:bg-white even:bg-gray-50">
                                            <td className="border p-2 font-semibold">City</td>
                                            <td className="border p-2">{value.city || "N/A"}</td>
                                        </tr>
                                        <tr key="state" className="odd:bg-white even:bg-gray-50">
                                            <td className="border p-2 font-semibold">State</td>
                                            <td className="border p-2">{value.state || "N/A"}</td>
                                        </tr>
                                        <tr key="zip" className="odd:bg-white even:bg-gray-50">
                                            <td className="border p-2 font-semibold">ZIP Code</td>
                                            <td className="border p-2">{value.zip || "N/A"}</td>
                                        </tr>
                                    </>
                                );
                            } else {
                                return (
                                    <tr key={key} className="odd:bg-white even:bg-gray-50">
                                        <td className="border p-2 font-semibold capitalize">{key}</td>
                                        <td className="border p-2">{String(value)}</td>
                                    </tr>
                                );
                            }
                        })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

