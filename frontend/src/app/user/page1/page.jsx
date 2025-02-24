'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepIndicator from "@/app/components/StepIndicator";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        fetch(`${apiUrl}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                router.push(`/user/page2?email=${encodeURIComponent(email)}`);
            })
            .catch((error) => {
                console.error('Error:', error)
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 h-[80vh] sm:h-[80vh] md:h-[70vh] lg:h-[60vh] bg-white p-6 rounded-lg shadow-lg">
                <div className="">
                    <StepIndicator step={1} />
                    <h1 className="text-center text-4xl mb-8 font-bold">Create Account</h1>
                    <form className="flex flex-col block text-xl sm:text-xl md-text-xl lg:text-2xl items-center" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="max-w-[70%] bg-gray-100 mb-[2%] border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="max-w-[70%] bg-gray-100 mb-[2%] border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        <button
                            className="w-[70%] sm:w-[70%] px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                            type="submit">
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );


};

export default Page;