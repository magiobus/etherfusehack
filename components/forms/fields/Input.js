const Input = ({
  label,
  name,
  type,
  placeholder = "",
  errorMessage = "",
  register,
  ...rest
}) => {
  const className = { ...rest.className };

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={name}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          placeholder={placeholder}
          {...register}
          {...rest}
        />
      </div>
      <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
    </div>
  );
};

export default Input;
