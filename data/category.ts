import { getCategories } from "@/actions/category";
import { GetDetails } from "@/actions/org-details";

export async function GetCategoryData() {
    try {
      const response = await getCategories();
  
      return response;
    } catch (error) {
      console.error('Error fetching groups:', error);
      return {error:"Error fetching groups",categories:[]}
      
    }
  }
  