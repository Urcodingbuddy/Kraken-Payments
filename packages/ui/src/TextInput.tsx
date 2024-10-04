"use client"

export const TextInput = ({
    placeholder,
    onChange,
    label,
    type,
    onInput
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
    type:string
    onInput:any
}) => {
    return <div className="pt-2">
        <label className="block mb-2 text-sm font-medium text-white">{label}</label>
        <input onChange={(e) => onChange(e.target.value)} onInput={onInput} type={type} id="first_name" className="bg-transparent border border-gray-300 text-white text-sm rounded-none focus:ring-blue-500 focus:border-none block w-full p-2.5" placeholder={placeholder} />
    </div>
}