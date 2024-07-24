import ErrorBoundary from "@/app/_error-boundary";
import TeamMemberWrapper from "@/components/admin/teams-members/team-member-wrapper";
import React from "react";

const MembersPage = () => {
  return (
    <ErrorBoundary>
      <TeamMemberWrapper />
    </ErrorBoundary>
  );
};

export default MembersPage;
