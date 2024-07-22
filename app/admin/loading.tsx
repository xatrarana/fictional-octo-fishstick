import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
      <span className="loading loading-ball loading-md"></span>
      <span className="loading loading-ball loading-lg"></span>
    </div>
  );
};

export default Loading;
