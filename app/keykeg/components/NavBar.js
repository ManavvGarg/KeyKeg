import Link from "next/link";
import Image from "next/image";
import logo from "./../public/logo.png";
import logo2 from "./../public/logo2.png";

const NavBar = (props) => {
  if (props.navType == 0) {
    return (
      <nav className="bg-white py-7 h-[6rem] font-bold shadow-lg shadow-blue-100">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <ul className="flex space-x-10 space-y-2">
              <li>
                <Link href="/" className="text-black">
                  <div
                    style={{
                      position: "relative",
                      width: `${6}vw`,
                    }}
                    className="mt-[0.1rem]"
                  >
                    <Image src={logo} alt="Logo" />
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-black">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => props.signIn("google")}
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else if (props.navType == 1) {
    return (
      <nav className="bg-white py-5 h-[6rem] font-bold shadow-lg shadow-blue-100">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <ul className="flex space-x-10 space-y-2">
              <li>
                <Link href="/" className="text-black">
                  <div
                    style={{
                      position: "relative",
                      width: `${6}vw`,
                    }}
                    className="mt-[0.1rem]"
                  >
                    <Image src={logo} alt="Logo" />
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-black">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex space-x-4 space-y-4">
              <li className="text-black py-4">Welcome {props.username} </li>
              <li>
                <Link
                  href="/panel"
                  className="text-black py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white"
                >
                  Go to Dashboard
                </Link>
              </li>
              <li>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded my-[-1rem]"
                  onClick={() => props.signOut()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else if (props.navType == 2) {
    return (
      <nav className="flex bg-white py-5 h-[6rem] font-bold shadow-lg shadow-blue-100">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <ul className="flex space-x-10 space-y-2">
              <li>
                <Link href="/" className="text-black">
                  <div
                    style={{
                      position: "relative",
                      width: `${6}vw`,
                    }}
                    className="mt-[0.1rem]"
                  >
                    <Image src={logo} alt="Logo" />
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-black">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex space-x-4 space-y-4">
              <li>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded my-[-1rem]"
                  onClick={() => props.signOut()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};

export default NavBar;
