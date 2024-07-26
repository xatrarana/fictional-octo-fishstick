import { GetMembers, GetMembersByOrgId } from "@/actions/teams.member";
import { Card, CardContent } from "@/components/ui/card";
import { Member } from "@/type";
import Image from "next/image";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { GetGroupById } from "@/actions/teams.group";
import NotFoundForLayout from "@/app/_not-found";

const TeamPage = async ({ params }: { params: { slug: string } }) => {
  const teams = await GetMembersByOrgId(params.slug);
  const res = await GetGroupById(params.slug)

  if(teams.members.length <= 0 && !res.group) return <NotFoundForLayout/>

  const { members } = teams;
  return <MemberList org={res.group?.name as string} url={params.slug} members={members} />;
};

export default TeamPage;

type MemberListProps = {
  members: Member[];
  url:string
  org:string
};

const MemberList = ({ members,url,org }: MemberListProps) => {
  const chairman = members.find((member) => member.displayOrder === 1);

  const otherMembers = members.filter((member) => member.displayOrder !== 1);
  return (
    <div className="space-y-6 my-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/team-types/${url}`}>team-types</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{org}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col items-center gap-4">
        {/* Chairman Section */}
        {chairman && (
          <div className="mb-8">
            <div className="flex flex-col items-center">
              <Image
                src={(chairman.avatarUrl as string) || "/user.png"}
                alt={chairman.name}
                width={150}
                height={100}
                className="rounded-full w-40 h-40 mb-4 mt-2 border-2 border-green-500"
              />
              <h1 className="text-md font-semibold mb-1">{chairman.name}</h1>
              <p className="text-sm text-green-900">{chairman.position.name}</p>
            </div>
          </div>
        )}

        {/* Other Members Section */}
        <div className="grid grid-cols-1 md:lg:grid-cols-3  p-1 gap-4  md:lg:gap-x-16">
          {otherMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={(member.avatarUrl as string) || "/user.png"}
                width={150}
                height={100}
                alt={member.name}
                className=" rounded-full w-40 mb-4 h-40 object-cover border-2 border-green-500"
              />
              <h1 className="text-md font-semibold mb-1">{member.name}</h1>
              <p className="text-sm text-green-900">{member.position.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
