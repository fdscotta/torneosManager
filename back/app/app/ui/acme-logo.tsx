import Image from "next/image";
import logo from "@/app/logoNuevo2.png";

export default function AcmeLogo() {
  return (
    <div>
      <Image
        src={logo}
        alt="Tournaments Logo"
        width={200}
        height={150}
      />
    </div>
  );
}
