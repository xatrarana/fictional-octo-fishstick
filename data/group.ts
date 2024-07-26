import { GetOrgGroups } from "@/actions/teams.group";
import { OrganizationTeam } from "@/type";

export async function getGroupsByOrder() {
    try {
      const response = await GetOrgGroups();

      const activeGroup = response.group?.filter(x => x.status)
  
      return activeGroup
        ? activeGroup.sort((a:OrganizationTeam, b:OrganizationTeam) => {
            const aOrder = a.displayOrder ?? Infinity; 
            const bOrder = b.displayOrder ?? Infinity; 
            return aOrder - bOrder;
          })
        : [];
    } catch (error) {
      console.error('Error fetching groups:', error);
      return []; 
    }
  }
  