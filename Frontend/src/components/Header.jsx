import React from "react";

const Header = () => {
  return (
    <>
      <div className=" flex items-center bg-primary  gap-3  p-8 px-20">
        <div className="border w-10 h-10 flex items-center justify-center rounded-full">
          <i className="ri-robot-2-line text-xl"></i>
        </div>
        <div className="flex flex-col">
        <p className="font-bold">AI Assistant</p>
         <p>Online</p>
        </div>
      </div>
    </>
  );
};

export default Header;
