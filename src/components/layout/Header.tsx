import Link from "next/link";
import Image from "next/image";
import MobileHeader from "./MobileHeader";
import { currentUser, SignInButton, UserButton } from "@clerk/nextjs";

const Header = async () => {
  const loggedInUser = await currentUser();

  return (
    <header
      className="h-20 fixed w-full bg-secondary text-primary font-inter flex items-center justify-between z-[501] py-2 px-4"
      id="header"
    >
      <nav className="flex h-full gap-6 items-center">
        <Link href="/">
          <div className="relative w-10 h-10 sm:w-14 sm:h-14 ">
            <Image
              src="/images/al_logo.png"
              alt="Arabian League Logo"
              fill={true}
              draggable={false}
            />
          </div>
        </Link>
        <ul className="hidden md:flex items-center gap-16">
          <li>
            <Link href="/schedule">
              <span className="hover:text-accent-gold cursor-pointer duration-300 font-bold">
                Schedule
              </span>
            </Link>
          </li>
          <li>
            <Link href="/standings">
              <span className="hover:text-accent-gold cursor-pointer duration-300 font-bold">
                Standings
              </span>
            </Link>
          </li>
          <li>
            <Link href="/teams">
              <span className="hover:text-accent-gold cursor-pointer duration-300 font-bold">
                Teams
              </span>
            </Link>
          </li>
          <li className=" cursor-pointer duration-300 font-bold">
            <Link href="/stats">
              <span className="hover:text-accent-gold cursor-pointer duration-300 font-bold">
                Stats
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="hidden md:inline">
        {!loggedInUser ? (
          <SignInButton>
            <button className="border-primary border rounded-3xl w-[100px] h-9 hover:border-accent-gold hover:text-accent-gold duration-300 font-bold">
              Sign In
            </button>
          </SignInButton>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
      </div>
      <MobileHeader />
    </header>
  );
};

export default Header;
