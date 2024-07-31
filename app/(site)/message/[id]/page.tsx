import NotFound from "@/app/not-found";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getChairmanDetails } from "@/data/member";
import Image from "next/image";
import React from "react";

const MessagePage = async () => {
  const chariman = await getChairmanDetails();

  return (
    <div className="h-screen mb-4">
      {!chariman && <NotFound />}

      {chariman && (
        <Card>
          <CardHeader>
            <CardTitle>Message From Chairman</CardTitle>
          </CardHeader>
          <CardContent>
            {chariman.Message &&
              chariman.Message.map((message, index) => (
                <CardDescription
                  className="text-muted-foreground text-justify"
                  key={index}
                >
                  {message.message}
                </CardDescription>
              ))}

            <CardFooter className="mt-4 flex-col lg:flex-row justify-end">
              <div>
                {chariman.avatarUrl && (
                  <Image
                    src={chariman.avatarUrl}
                    alt={chariman.name}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                )}
                {!chariman.avatarUrl && (
                  <Image
                    src={"/user.png"}
                    alt={chariman.name}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                )}
              </div>

              <div className="">
                <p className="text-md md:lg:text-xl">{chariman.name}</p>
                <p className="text-muted-foreground">
                  {chariman.position.name}
                </p>
              </div>
            </CardFooter>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MessagePage;
