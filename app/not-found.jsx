import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="relative flex flex-col h-svh w-s items-center justify-center">

            <p className="animate-bounce font-bold text-2xl text-white italic">¡AFUUUUUUUUU!</p>
            <img src="/img/cat.gif" className="object-cover h-40 w-40" alt="" />
            <h1 className="text-center font-bold text-4xl my-10 italic text-white"><strong className="text-lime-500 text-5xl">404</strong> Page not found</h1>
            <Link className="bg-lime-500 py-2 mx-auto px-2 mt-5 rounded-lg text-center font-medium text-black flex justify-between items-center hover:bg-lime-400" href={'/'}>
                <ArrowLeftCircleIcon className="size-5 mr-2" />
                Go to Home
            </Link>
        </div>
    );
}