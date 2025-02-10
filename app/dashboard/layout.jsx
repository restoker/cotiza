import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Link from 'next/link'
import Navegacion from "@/components/navigation";
import ButtonOpenSidebar from "@/components/button-open-sidebar";
import MobileSidebar from "@/components/mobile-sidebar";

const teams = [
    { id: 1, name: 'Planetaria', href: '#', initial: 'P', current: false },
    { id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
    { id: 3, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const metadata = {
    title: 'DashBoard aministrativo',
    description: 'Home de la aplicación',
};

export default async function DashBoardLayout({
    children
}) {

    const sesssion = await auth();

    if (!sesssion?.user) redirect('/');

    return (
        <div>

            <MobileSidebar />

            {/* Static sidebar for desktop */}
            <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
                    <div className="flex h-16 shrink-0 items-center">
                        <img
                            alt="Your Company"
                            src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=lime&shade=500"
                            className="h-8 w-auto"
                        />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <Navegacion />
                            </li>
                            <li>
                                <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                                <ul role="list" className="-mx-2 mt-2 space-y-1">
                                    {teams.map((team) => (
                                        <li key={team.name}>
                                            <a
                                                href={team.href}
                                                className={classNames(
                                                    team.current
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                )}
                                            >
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                                    {team.initial}
                                                </span>
                                                <span className="truncate">{team.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            <li className="-mx-6 mt-auto">
                                <Popover className="relative">
                                    <PopoverButton className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white ring-0 w-full z-40">
                                        <img
                                            alt=""
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            className="h-8 w-8 rounded-full bg-zinc-800"
                                        />
                                        <span aria-hidden="true">Tom Cook</span>
                                    </PopoverButton>

                                    <PopoverPanel
                                        transition
                                        className="absolute left-1/2 z-30 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in -top-32"
                                    >
                                        <div className="w-56 shrink rounded-xl bg-white/5 backdrop-blur-xl p-4 text-sm font-semibold leading-6 text-gray-100 shadow-lg ring-1 ring-gray-900/5">
                                            <Link href={'/dashboard'} className="block p-2 hover:text-lime-600">
                                                productos
                                            </Link>
                                            <button href={'/'} className="block p-2 hover:text-lime-600">
                                                cerrar sesión
                                            </button>
                                        </div>
                                    </PopoverPanel>
                                </Popover>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="xl:pl-72">
                {/* Sticky search header */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
                    <ButtonOpenSidebar />

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        {/* <form action="#" method="GET" className="flex flex-1">
                        <label htmlFor="search-field" className="sr-only">
                            Search
                        </label>
                        <div className="relative w-full">
                            <MagnifyingGlassIcon
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                            />
                            <input
                                id="search-field"
                                name="search"
                                type="search"
                                placeholder="Search..."
                                className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                            />
                        </div>
                    </form> */}
                    </div>
                </div>

                {children}
            </div>
        </div>
    );
}