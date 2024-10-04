import React from "react";
export function AuthInputs({
    placeholder,
    onChange,
    label,
    type,
    onInput
}:{
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
    type:string
    onInput:any
}){
    return(
        <div className="mb-4">
        <label htmlFor="email" className="block text-gray-400 text-sm font-bold mb-2">
            {label}
        </label>
        <input
            type={type}
            className="shadow appearance-none border w-full py-2 px-3 text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline rounded-none"
            placeholder={placeholder}
        />
    </div>
    )
} 