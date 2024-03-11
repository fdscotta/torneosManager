import Image from "next/image";
import logo from "@/app/logoNuevo.png";

export default function AcmeLogo() {
  return (
    <div className="flex justify-center items-center">
      <Image
        src={logo}
        alt="Tournaments Logo"
        width={200}
        height={150}
      />
    </div>
  );
}
