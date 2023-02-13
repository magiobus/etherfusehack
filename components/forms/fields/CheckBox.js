const CheckBox = ({
  label,
  name,
  description = "",
  errorMessage = "",
  register,
  ...rest
}) => {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          id={name}
          name={name}
          {...register}
          type="checkbox"
          className="focus:ring-black h-4 w-4 text-black border-gray-300 rounded"
          {...rest}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="comments" className="font-medium text-gray-700">
          {label}
        </label>
        <p id="comments-description" className="text-gray-500">
          {description}
        </p>
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      </div>
    </div>
  );
};

export default CheckBox;
