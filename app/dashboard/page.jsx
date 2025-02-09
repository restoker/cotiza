'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, Popover, PopoverButton, PopoverPanel, TransitionChild } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Navegacion from '@/components/navigation'

const teams = [
    { id: 1, name: 'Planetaria', href: '#', initial: 'P', current: false },
    { id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
    { id: 3, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
]

const stats = [
    { name: 'Number of deploys', value: '405' },
    { name: 'Average deploy time', value: '3.65', unit: 'mins' },
    { name: 'Number of servers', value: '3' },
    { name: 'Success rate', value: '98.5%' },
]
const statuses = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10' };

const activityItems = [
    {
        user: {
            name: 'Michael Foster',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        commit: '2d89f0c8',
        branch: 'main',
        status: 'Completed',
        duration: '25s',
        date: '45 minutes ago',
        dateTime: '2023-01-23T11:00',
    },
    // More items...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HomePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div>
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 xl:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-zinc-950 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6 text-red-500" />
                                    </button>
                                </div>
                            </TransitionChild>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img
                                        alt="Your Company"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=lime&shade=500"
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
                                            <a
                                                href="#"
                                                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                                            >
                                                <img
                                                    alt=""
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    className="h-8 w-8 rounded-full bg-gray-800"
                                                />
                                                <span className="sr-only">Your profile</span>
                                                <span aria-hidden="true">Tom Cook</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

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
                        <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-white xl:hidden">
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon aria-hidden="true" className="h-5 w-5" />
                        </button>

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

                    <main>
                        <header>
                            {/* Heading */}
                            <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
                                <div>
                                    <div className="flex items-center gap-x-3">
                                        <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
                                            <div className="h-2 w-2 rounded-full bg-current" />
                                        </div>
                                        <h1 className="flex gap-x-3 text-base leading-7">
                                            <span className="font-semibold text-white">Planetaria</span>
                                            <span className="text-gray-600">/</span>
                                            <span className="font-semibold text-white">mobile-api</span>
                                        </h1>
                                    </div>
                                    <p className="mt-2 text-xs leading-6 text-gray-400">Deploys from GitHub via main branch</p>
                                </div>
                                <div className="order-first flex-none rounded-full bg-lime-400/10 px-2 py-1 text-xs font-medium text-lime-400 ring-1 ring-inset ring-lime-400/30 sm:order-none">
                                    Production
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
                                {stats.map((stat, statIdx) => (
                                    <div
                                        key={stat.name}
                                        className={classNames(
                                            statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                                            'border-t border-white/5 px-4 py-6 sm:px-6 lg:px-8',
                                        )}
                                    >
                                        <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
                                        <p className="mt-2 flex items-baseline gap-x-2">
                                            <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
                                            {stat.unit ? <span className="text-sm text-gray-400">{stat.unit}</span> : null}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </header>

                        {/* Activity list */}
                        <div className="border-t border-white/10 pt-11">
                            <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Latest activity</h2>
                            <table className="mt-6 w-full whitespace-nowrap text-left">
                                <colgroup>
                                    <col className="w-full sm:w-4/12" />
                                    <col className="lg:w-4/12" />
                                    <col className="lg:w-2/12" />
                                    <col className="lg:w-1/12" />
                                    <col className="lg:w-1/12" />
                                </colgroup>
                                <thead className="border-b border-white/10 text-sm leading-6 text-white">
                                    <tr>
                                        <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                                            User
                                        </th>
                                        <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
                                            Commit
                                        </th>
                                        <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
                                            Status
                                        </th>
                                        <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
                                            Duration
                                        </th>
                                        <th
                                            scope="col"
                                            className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                                        >
                                            Deployed at
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {activityItems.map((item) => (
                                        <tr key={item.commit}>
                                            <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                                <div className="flex items-center gap-x-4">
                                                    <img alt="" src={item.user.imageUrl} className="h-8 w-8 rounded-full bg-gray-800" />
                                                    <div className="truncate text-sm font-medium leading-6 text-white">{item.user.name}</div>
                                                </div>
                                            </td>
                                            <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                                <div className="flex gap-x-3">
                                                    <div className="font-mono text-sm leading-6 text-gray-400">{item.commit}</div>
                                                    <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
                                                        {item.branch}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                                                <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                                                    <time dateTime={item.dateTime} className="text-gray-400 sm:hidden">
                                                        {item.date}
                                                    </time>
                                                    <div className={classNames(statuses[item.status], 'flex-none rounded-full p-1')}>
                                                        <div className="h-1.5 w-1.5 rounded-full bg-current" />
                                                    </div>
                                                    <div className="hidden text-white sm:block">{item.status}</div>
                                                </div>
                                            </td>
                                            <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                                                {item.duration}
                                            </td>
                                            <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                                                <time dateTime={item.dateTime}>{item.date}</time>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}