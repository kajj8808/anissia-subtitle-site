import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-center bg-white shadow-md">
      <nav>
        <Link href={"/"} className="font-bold">
          <p>ANISSIA</p>
        </Link>
      </nav>
    </header>
  );
}
