import { GetMembers } from "@/actions/teams.member";

export const getChairmanDetails = async () => {
  try {
    const data = await GetMembers();
    const chairman = data.members?.find(member => member.displayOrder === 1);

  return chairman;
  } catch (error) {
    console.error("Error fetching chairman details:", error);
    return { error: 'Something went wrong. Please try again.' };
  }
};
