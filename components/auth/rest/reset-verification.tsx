'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { CardWrapper } from '../card-wrapper';
import {BeatLoader} from 'react-spinners';
import { FormErorr } from '../../form-error';
import { FormSuccess } from '../../form-success';
import { resetTokenVerification } from '@/actions/rest-verification';

function NewVerificationForm() {
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const searchParams =  useSearchParams();
    const token = searchParams.get("vid");
    const router = useRouter()


    const onSubmit = useCallback(async () =>{
      if(success || error) return;
      if(!token) {
          setError("Invalid Token!");
          return;
      }
      resetTokenVerification(token).then(data =>{
         
              setError(data?.error);
              setSuccess(data?.success);

              if(data.action){
                router.replace(`/auth/account/reset?sid=${data.sid}`)
              }
      
      }).catch(error => setError("Something went wrong!") );
    },[token,success,error])

    useEffect(() => {onSubmit();},[onSubmit])
  return (
    <CardWrapper
       headerLabel="Confirming your email address!"
       backButtonHref="/auth/login"
       backButtonLabel="Back to Login"
       showHeader
       >
        <div className="flex items-center w-full justify-center">
           {
                !error && !success && <BeatLoader/>
           }
            <FormSuccess message={success}/>
             {
                !success && <FormErorr message={error}/>
             }
        </div>
        
       </CardWrapper>
  )
}

export default NewVerificationForm