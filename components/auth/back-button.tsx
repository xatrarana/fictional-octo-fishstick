"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
    label: string;
    href: string;
}
export const BackButton = ({ label, href }: BackButtonProps) => {
    return (
        <Button
            variant={"link"}
            size={"sm"}
            asChild
            className="font-normal w-full"
        >
            <Link className="text-green-800" href={href}>
                {label}
            </Link>
        </Button>
    )
}