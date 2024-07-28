import { GetDetails } from "@/actions/org-details"

export const getFooterData = async () => {
        try {

            const response = await GetDetails();


            return {
                success: true,
                data: response
            }
            
        } catch (error) {
            
            return {error: "Something went wrong!"}
            
        }
}