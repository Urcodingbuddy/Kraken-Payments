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
    className="bg-black border border-gray-300 text-white text-sm rounded-none focus:ring-[#A704BF] focus:border-[#A704BF] block w-full p-2.5 appearance-none"
  >
    {options.map((option) => (
      <option
        key={option.key}
        value={option.key}
        className="bg-black text-white hover:bg-[#A704BF] hover:text-white cursor-pointer"
      >
        {option.value}
      </option>
    ))}
  </select>
}