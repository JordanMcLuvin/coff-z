"use client";

export default function AddressInput({ value, onChange }) {
    return (
        <div className="w-full h-full p-4 flex flex-col gap-4">
            <input
                type="text"
                name="street"
                value={value.street}
                onChange={onChange}
                placeholder="Street Address"
                className="w-full p-3 text-lg border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                name="city"
                value={value.city}
                onChange={onChange}
                placeholder="City"
                className="w-full p-3 text-lg border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                name="state"
                value={value.state}
                onChange={onChange}
                placeholder="State"
                className="w-full p-3 text-lg border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                name="zip"
                value={value.zip}
                onChange={onChange}
                placeholder="Zip Code"
                className="w-full p-3 text-lg border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
