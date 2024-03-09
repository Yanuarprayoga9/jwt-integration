import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-center content-center">
          <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </>
  );
}
