const Select = ({
  label,
  name,
  options = [],
  placeholder = "",
  errorMessage = "",
  register,
  multiple = false,
  ...rest
}) => {
  const className = { ...rest.className };

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <select
          id={name}
          name={name}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
          defaultValue=""
          multiple={multiple}
          {...register}
        >
          {!multiple && <option value="">Selecciona una opción</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
    </div>
  );
};

export default Select;
