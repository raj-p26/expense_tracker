/* eslint-disable react/prop-types */
export function Input({
  textarea = false,
  label = "",
  name,
  onChange = () => {},
  errorMessage = "",
  type = "text",
  value,
  placeholder = "",
}) {
  return (
    <>
      <div className="grid grid-cols-3 my-4 items-center">
        <label htmlFor={name} className="text-lg">
          {label}
        </label>
        {textarea ? (
          <textarea
            name={name}
            id={name}
            className="bg-surface rounded px-2 py-1 text-lg border-2 border-[#42474e] hover:border-[#fff]/50 outline-none focus:border-primary col-span-2 transition"
            onChange={onChange}
            value={value}
            placeholder={placeholder}
          ></textarea>
        ) : (
          <input
            name={name}
            id={name}
            className="bg-surface rounded px-2 py-1 text-lg border-2 border-[#42474e] hover:border-[#fff]/50 focus:border-primary outline-none transition col-span-2"
            onChange={onChange}
            value={value}
            type={type}
            placeholder={placeholder}
          />
        )}
        <p className="text-error col-span-3">{errorMessage}</p>
      </div>
    </>
  );
}
