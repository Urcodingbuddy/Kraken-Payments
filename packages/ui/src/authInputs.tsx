interface AuthInputsProps {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
    type: string;
    onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  }

  export function AuthInputs({
    placeholder,
    onChange,
    label,
    type,
    onInput,
  }: AuthInputsProps){
    return(
        <div className="mb-2">
        <label htmlFor="email" className="block text-gray-400 text-sm font-bold mb-1">
            {label}
        </label>
        <input
            type={type}
            className="shadow appearance-none border w-full py-1 px-2 text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline rounded-none"
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)} // Pass the event directly
            onInput={onInput}
            aria-required
        />
    </div>
    )
} 