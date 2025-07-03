"use client";

type Props = {
  title: string;
};

export const Checkbox = ({ title }: Props) => {
  const handleChange = (id: string) => {
    console.log("Hello form data", id);
  };

  return (
    <li>
      <input type="checkbox" onChange={() => handleChange(title)} />
      <label>{title}</label>
    </li>
  );
};
