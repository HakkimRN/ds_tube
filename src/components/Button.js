import React from "react";

const Button = ({ name }) => {
  return (
    <div className="px-2 py-1 mt-4 mx-1 bg-gray-950 border border-red-600 rounded-lg w-auto text-center hover:bg-red-600 ease-in duration-300 cursor-pointer">
      {name}
    </div>
  );
};

export default Button;
