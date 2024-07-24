import { getAbouts } from "@/actions/about";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Content from "../content";

const AboutWrapper = async () => {
  const about = await getAbouts();
  return (
    <div className="my-2 px-2 flex flex-col space-y-6">
      <Card className="space-y-4">
       <CardHeader>
       <CardTitle className=" text-xl md:text-2xl lg:text-4xl text-green-800  font-bold">
          परिचय
        </CardTitle>
       </CardHeader>
        <CardContent className="mt-2 p-3 shadow-none border-none">
          <Content
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8rem",
            }}
            content={about?.content as string}
          />
        </CardContent>
      </Card>

    <div className="grid gird-cols-1 md:lg:grid-cols-2 gap-x-4 auto-rows-min">
    {
        about?.mission && (
            <Card className="space-y-4">
        <CardHeader>
          <CardTitle className=" text-xl md:text-2xl lg:text-4xl text-green-800  font-bold">उद्देश्य</CardTitle>
        </CardHeader>
        <CardContent className="shadow-none border-none">
          <Content
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8rem",
            }}
            content={about?.mission as string}
          />
        </CardContent>
      </Card>
        )
      }

      {
        about?.vission && (
           
       <Card className="space-y-4">
       <CardHeader>
         <CardTitle className=" text-xl md:text-2xl lg:text-4xl text-green-800  font-bold"> दृष्टि</CardTitle>
       </CardHeader>
       <CardContent className="shadow-none border-none">
         <Content
           style={{
             fontSize: "1.1rem",
             lineHeight: "1.8rem",
           }}
           content={about?.vission as string}
         />
       </CardContent>
     </Card>
        )
      }
    </div>

    </div>
  );
};

export default AboutWrapper;
