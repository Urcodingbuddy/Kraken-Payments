"use client"
export const Select = ({ options, onSelect }: {
    onSelect: (value: string) => void;
    options: {
        key: string;
        value: string;
    }[];
}) => {
    return     <select
    onChange={(e) => onSelect(e.target.value)}
    className="bg-transparent border border-gray-300 text-white text-sm rounded-none focus:ring-blue-500 block w-full p-2.5
        shadow appearance-none leading-tight focus:outline-none"
  >
    {options.map((option) => (
      <option
        key={option.key}
        value={option.key}
        className="bg-black text-[#A704BF] hover:bg-[#A704BF] hover:text-white cursor-pointer"
      >
        {option.value}
      </option>
    ))}
  </select>
}