import React from "react";

const UserListItem = ({ user, isSelected, onSelect }: any) => {
  const bgClass = isSelected ? "bg-green-500 text-white" : "bg-slate-100";

  return (
    <div className="">
      <div 
      onClick={onSelect}
      className={`p-2 my-1 border rounded cursor-pointer  ${bgClass}`}>
        <strong>{user.username}</strong> — {user.email}
      </div>
    </div>
  );
};

export default UserListItem;
