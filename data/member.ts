import { GetMembers } from "@/actions/teams.member";

export const getChairmanDetails = async () => {
  try {
    const data = await GetMembers();
    const chairman = data.members?.find(member => member.displayOrder === 1);

  return chairman;
  } catch (error) {
    return null;
  }
};
