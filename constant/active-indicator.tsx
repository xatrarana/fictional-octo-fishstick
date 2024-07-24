"use client";
import React from "react";

interface EnableIndicatorProps {
  /**
   * Indicates whether the component is enabled or not.
   * @example true
   */
  isEnabled: boolean;
}

/**
 * EnableIndicator component displays a colored dot based on the isEnabled prop.
 * - Green dot if isEnabled is true.
 * - Red dot if isEnabled is false.
 *
 * @param {EnableIndicatorProps} props - The properties object.
 * @param {boolean} props.isEnabled - Indicates whether the component is enabled or not.
 *
 * @returns {JSX.Element} - A JSX element with a colored dot indicating the enabled state.
 */
export const EnableIndicator = ({
  isEnabled,
}: EnableIndicatorProps): JSX.Element => {
 
  return (
    <div className=" flex items-center justify-center">
      {
        isEnabled ? (
          <span className="w-4 h-4 rounded-full bg-green-500"></span>
        ) : (
          <span className="w-4 h-4 rounded-full bg-red-500"></span>
        )
      }
    </div>
  );
};
