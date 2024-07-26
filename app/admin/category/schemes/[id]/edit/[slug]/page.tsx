import { getCategoryById } from "@/actions/category";
import { getServiceById } from "@/actions/service";
import ErrorBoundary from "@/app/_error-boundary";
import { SchemeForm } from "@/components/admin/schemes/schemes-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceSchema } from "@/schemas";
import Link from "next/link";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { z } from "zod";

const EditPage = async ({
  params,
}: {
  params: { id: string; slug: string; edit: boolean };
}) => {
  const response = await getServiceById(params.slug);

  if (response.error) return <div>{response.error}</div>;
  return (
    <div className="space-y-6">
      <Link
        href={"/admin/category/schemes/" + params.id}
        className=" text-center rounded-md text-slate-900 text-sm"
      >
        <BiArrowBack className="inline-block w-6 h-6 rounded-full bg-gray-300 text-white mr-3" />{" "}
        Back to Schemes/Services
      </Link>

      <ErrorBoundary>
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>Update Scheme</CardTitle>
          </CardHeader>
          <CardContent>
            <SchemeForm
              edit
              cid={params.slug}
              editData={response.service as z.infer<typeof ServiceSchema>}
            />
          </CardContent>
        </Card>
      </ErrorBoundary>
    </div>
  );
};

export default EditPage;
