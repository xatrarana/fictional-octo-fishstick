import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BiSolidEnvelopeOpen, BiSolidMapPin, BiSolidPhone } from "react-icons/bi"

type ContactSidebarProps = React.ComponentProps<typeof Card>

export function ContactSideBar({ className, ...props }: ContactSidebarProps) {
  return (
    <Card className={cn( className)} {...props}>
      <CardHeader>
      <CardTitle>सम्पर्क जानकारी</CardTitle>
<CardDescription>तल दिएको जानकारीमा कल गर्नुहोस् वा सन्देश पठाउनुहोस्</CardDescription>

      </CardHeader>
      <CardContent className="grid gap-4">
      <div className="w-full p-3 rounded-md flex flex-col gap-y-4">
          <div className="flex items-center  rounded-md h-20 p-5">
            <div className="flex items-center justify-center">
              <BiSolidMapPin className="h-8 w-8  text-green-700"/>
            </div>
            <div className="data px-3">
              <h3 className="font-semibold mb-2 text-sm  text-slate-800">ठेगाना</h3>
              <p className=" text-muted-foreground">{"Kalanki-31, Kathmandu, Lalitpur"}</p>
            </div>
          </div>
          <div className="flex items-center  rounded-md h-20 p-5">
            <div className="flex items-center justify-center">
              <BiSolidPhone className="h-8 w-8 text-green-700"/>
            </div>
            <div className="data px-3">
              <h3 className="font-semibold mb-2 text-sm text-slate-800">फोन नम्बरहरु</h3>
              <p className=" text-muted-foreground">{"9866615358"}</p>
            </div>
          </div>
          <div className="flex items-center  rounded-md h-20 p-5">
            <div className="flex items-center justify-center">
              <BiSolidEnvelopeOpen className="h-8 w-8 text-green-700"/>
            </div>
            <div className="data px-3">
              <h3 className="font-semibold mb-2 text-sm text-slate-800">इमेल</h3>
              <p className=" text-muted-foreground">{"info@trijyoti.coop.np"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
