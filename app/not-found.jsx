import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="relative flex flex-col h-svh">
            <p className="animate-bounce absolute top-10 left-1/4 sm:left-1/3">¡AFUUUUUUUUU!</p>
            <img src="/img/cat.gif" alt="" />
            <h1 className="text-center font-bold text-4xl my-10 italic"><strong className="text-lime-500 text-5xl">404</strong> Page not found</h1>
            <Link className="bg-lime-500 py-2 mx-auto px-2 mt-5 rounded-lg text-center font-medium text-black flex justify-between items-center hover:bg-lime-400" href={'/'}>
                <ArrowLeftCircleIcon className="size-5 mr-2" />
                Go to Home
            </Link>
        </div>
    );
}