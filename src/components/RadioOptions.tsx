interface RadioOptionsProps {
  name: string;
  value: string | number;
  checked: boolean;
  children: string;
  onChange: (value: string | number) => void;
}

function RadioOptions({
  name,
  value,
  checked,
  children,
  onChange,
}: RadioOptionsProps) {
  return (
    <label className="flex-1 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer hidden"
      />
      <span className="hover:bg-blue-350 block w-full rounded-full bg-blue-300 px-4 py-2 text-center transition peer-checked:bg-blue-800 peer-checked:text-white md:py-2.5">
        {children}
      </span>
    </label>
  );
}

export default RadioOptions;
