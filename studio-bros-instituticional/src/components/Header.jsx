import { Fragment, useState, useEffect } from 'react'
import {
  Dialog,
  PopoverGroup,
  Transition,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'


import logoWhite  from "../img/logo-white.webp"
import logoBlack  from "../img/logo-black.webp"
// import classNames from 'classnames'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navbarScrolled, setNavbarScrolled] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavbarScrolled(true)
      } else {
        setNavbarScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  return (
    <header className="bg-transparent top-0 inset-x-0 fixed w-full z-50" 
      style={{
        backgroundColor: navbarScrolled ? 'black' : 'transparent',
        transition: 'background-color 0.3s',
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Studio Bros</span>
            <img className="h-16 w-auto" src={logoWhite } alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12 ">


          <a href="#about-us" className="text-sm font-semibold leading-6 text-white">
            About Us
          </a>
          <a href="#music" className="text-sm font-semibold leading-6 text-white">
            Music
          </a>
          <a href="#videos" className="text-sm font-semibold leading-6 text-white">
            Video
          </a>
          <a href="#social" className="text-sm font-semibold leading-6 text-white">
            Social Media
          </a>
          <a href="#contacts" className="text-sm font-semibold leading-6 text-white">
            Contacts
          </a>
        </PopoverGroup>

      </nav>
      
      {/* Phone Details */}
      <Transition show={mobileMenuOpen} as={Fragment} className="z-50">
        <Dialog
          as="div"
          className="relative z-10 lg:hidden"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-3">
                  <img className="h-16 w-auto" src={logoBlack} alt="" />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">

                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      href="#about-us"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      About Us
                    </a>
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      href="#music"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Music
                    </a>
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      href="#video"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Video
                    </a>

                  </div>
                  <div className="py-6">
                    <a
                      href="#contacts"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}  
                        >
                      Contacts
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </header>
  )
}
