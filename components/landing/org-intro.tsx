import { GetDetailsData } from "@/data/org";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle ,CardFooter, CardDescription} from "../ui/card";
import DangerouslySetInnerHTML from "../schemes/dangerously-set-inner-html";
import Image from "next/image";
import { GetMembers } from "@/actions/teams.member";

const OrgIntro = async () => {
  const data = await GetDetailsData();
  const result = await GetMembers();
  const chairman = result?.members?.find((member) => member.displayOrder === 1);
  return (
    <div className="grid grid-cols-1 md:lg:grid-cols-3 gap-x-3 gap-y-4 items-center">
      <Card className="shadow-none border-none col-span-2">
        <CardHeader>
          <CardTitle className="text-xl text-center md:text-3xl lg:text-4xl font-semibold">
            {data?.name}
          </CardTitle>
        </CardHeader>
        <DangerouslySetInnerHTML
          className="space-y-5 p-2 text-justify"
          content={data?.description || ""}
        />
      </Card>
      <div>
        <Card className="flex flex-col items-center justify-center p-1 shadow-sm border-none">
          <CardContent>
          {chairman && (
              <Image
                src={chairman.avatarUrl || "/user.png"}
                alt={chairman.name || "Chairman"}
                width={300}
                height={200}
                className="object-cover rounded-full "
              />
            )}

          </CardContent>
          <CardFooter className="flex flex-col gap-y-3">  
              <CardTitle>{chairman?.name}</CardTitle>
              <CardDescription className="text-muted-foreground">{chairman?.position.name}</CardDescription>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OrgIntro;
