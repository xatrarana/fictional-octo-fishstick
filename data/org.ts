import { GetDetails } from "@/actions/org-details";

export async function GetDetailsData() {
    try {
      const response = await GetDetails();
  
      return response 
    } catch (error) {
      console.error('Error fetching groups:', error);
      
    }
  }
  