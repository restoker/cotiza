import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

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
            {children}
        </div>
    );
}