
import React from 'react'
import {
    Bars3Icon,
    ChartBarSquareIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    FolderIcon,
    GlobeAltIcon,
    ServerIcon,
    SignalIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Home', href: '/dashboard', icon: FolderIcon, current: true },
    { name: 'Productos', href: '/dashboard/products', icon: ServerIcon, current: true },
    { name: 'Cotizaciones', href: '/dashboard/orders', icon: SignalIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navegacion = () => {
    return (
        <ul className="-mx-2 space-y-1">
            {navigation.map((item) => (
                <li key={item.name}>
                    <a
                        href={item.href}
                        className={classNames(
                            item.current
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                        )}
                    >
                        <item.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
                        {item.name}
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default Navegacion;