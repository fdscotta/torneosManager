import Image from "next/image";
import logo from "@/app/torneosLogo.png";

export default function AcmeLogo() {
  return (
    <div>
      <Image
        src={logo}
        alt="Tournaments Logo"
        width={150}
        height={150}
      />
    </div>
  );
}
