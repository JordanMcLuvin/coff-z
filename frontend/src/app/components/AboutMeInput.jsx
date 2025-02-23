"use client";

export default function AboutMe({ value, onChange }) {
    return (
        <div className="w-full h-full p-4">
            <textarea
                value={value}
                onChange={onChange}
                placeholder="Write about yourself..."
                className="w-full h-full p-4 text-lg border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}