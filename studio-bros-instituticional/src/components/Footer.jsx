import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"

function Footer() {
    return (
      <>


<footer className="bg-black h-32 flex mt-[130px]">
    <div className="mx-auto w-full max-w-screen-xl">
        <div className="px-4 py-6 mt-auto h-full mb-auto  bg-black md:flex md:items-center md:justify-between">
            <span className="text-sm bg-black dark:text-gray-300 sm:text-center">© 2024 <a href="https://flowbite.com/">Studio Bros™</a>. All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">

                <a href="https://www.instagram.com/studiobros/" target="_blank" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <FaInstagram></FaInstagram>
                    <span className="sr-only">Instagram page</span>
                </a>
                <a href="https://www.youtube.com/@studiobros" target="_blank" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <FaYoutube></FaYoutube>
                    <span className="sr-only">Youtube page</span>
                </a>
                <a href="https://www.youtube.com/@studiobros" target="_blank" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <FaFacebook></FaFacebook>
                    <span className="sr-only">Facebook page</span>
                </a>
            </div>
        </div>
    </div>
</footer>

      </>
    )
  }
  
  export default Footer
  