import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
    label:string;
    showHeading:boolean
}

export const Header = ({label,showHeading}:HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            {
                showHeading && <h1 className={cn("text-3xl font-semibold ",font.className)}>Trijyoti.</h1>            }
            <p className="text-muted-foreground text-sm">{label}</p>
        </div>
    )
}