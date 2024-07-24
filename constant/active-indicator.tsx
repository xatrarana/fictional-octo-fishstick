"use client";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface EnableIndicatorProps {
  isEnabled: boolean;
}


export const EnableIndicator = ({
  isEnabled,
}: EnableIndicatorProps): JSX.Element => {
 
  return (
    <div className=" flex items-center justify-center">
      {
        isEnabled ? (
          <Badge variant="enabled">Active</Badge>

        ) : (
          <Badge variant="disabled">In Active</Badge>
        )
      }
    </div>
  );
};
