import Image from "next/image";
import { Home, Larrow } from "@/components/icons";
import insideBanner from "../../../public/banner.avif";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <>
      <div className="app_inside_banner">
        <Image
          src={insideBanner}
          alt="inside banner"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="app_bradecumb">
        <ul>
          <li>
            <Home className="app_brd_home" />
            <Larrow className="app_brd_arrow" />
          </li>
          <li>{slug}</li>
        </ul>
      </div>
      <div></div>
    </>
  );
}
