import ErrorBoundary from "@/app/_error-boundary";
import { CategoryForm } from "@/components/admin/category/category-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

const NewCategoryPage = () => {
  return (
    <div className="space-y-6">
        <Link
          href={"/admin/category"}
          className=" text-center rounded-md text-slate-900 text-sm"
        >
          <BiArrowBack className="inline-block w-6 h-6 rounded-full bg-gray-300 text-white mr-3" />{" "}
          Back to Categories
        </Link>

      <ErrorBoundary>
        <Card className="space-y-4">
            <CardHeader>
                <CardTitle>Add New Category</CardTitle>
            </CardHeader>
          <CardContent>
            <CategoryForm />
          </CardContent>
        </Card>
      </ErrorBoundary>
    </div>
  );
};

export default NewCategoryPage;
