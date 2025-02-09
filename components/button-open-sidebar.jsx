'use client';

import { menuStore } from '@/store/menuStore';
import { Bars3Icon } from '@heroicons/react/24/outline';
import React from 'react'

const ButtonOpenSidebar = () => {
    const { sidebarOpen, setSidebarOpen } = menuStore();

    return (
        <>
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-white xl:hidden">
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="h-5 w-5" />
            </button>
        </>
    )
}

export default ButtonOpenSidebar