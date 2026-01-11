import Image from "next/image";

export const FullAdvt = ({ imagepath, imagealt }) => {
  return (
    <div className="app_full_advt">
      <Image src={imagepath} alt={imagealt} />
    </div>
  );
};
