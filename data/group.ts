import { GetOrgGroups } from "@/actions/teams.group";

export async function getGroupsByOrder() {
    try {
      const response = await GetOrgGroups();
  
      return response.group
        ? response.group.sort((a, b) => {
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
  