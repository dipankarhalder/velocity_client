"use client";

export const Checkbox = ({ title }) => {
  const handleChange = (id) => {
    console.log("Hello form data", id);
  };

  return (
    <li>
      <label>
        <input type="checkbox" onChange={() => handleChange(title)} />
        <p>{title}</p>
      </label>
    </li>
  );
};
