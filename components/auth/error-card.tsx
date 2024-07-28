import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { CardWrapper } from "./card-wrapper"

export const ErroCard = () => {
    return(

        <CardWrapper
        headerLabel="Opps! something went wrong"
        backButtonHref="/auth/login"
        backButtonLabel="Go back to login"
        showHeader={true}
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="h-10 w-10 text-red-500"/>
            </div>
        </CardWrapper>
    )
}