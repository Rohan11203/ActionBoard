import React, { use, useState } from "react";
import UserListItem from "./ui/UserListItem";
import { SearchUsers } from "../lib/api/route";

interface User {
  _id: string;
  username: string;
  email: string;
  avtar?: string;
}


const AssignUser = ({selectedUserId,setSelectedUserId}:any) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  async function handleSearchClick() {
    if (!search.trim()) return;
    setLoading(true);
    const res = await SearchUsers(search);
    setLoading(false);

    setUsers(res.data);
    setSelectedUserId([]);
  }

  function handleSeclectUser(userId: string) {
    console.log(selectedUserId);
    setSelectedUserId(
      (prev:any) =>
        prev.includes(userId)
          ? prev.filter((uid:any) => uid !== userId) // remove if already selected
          : [...prev, userId] // add if not
    );
  }
  return (
    <div className="">
      <h2 className="p-2 font-semibold text-slate-600">Assign Users</h2>
      <div className="flex justify-between">
        <input
          placeholder="Search User"
          className="border border-slate-100 p-2 w-58 "
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          className="p-2 w-28 cursor-pointer hover:bg-blue-400 bg-blue-500 text-white"
          onClick={handleSearchClick}
        >
          Go
        </button>
      </div>

      <div>
        {loading ? (
          <p>Loading Users...</p>
        ) : users.length > 0 ? (
          users.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              isSelected={selectedUserId.includes(user._id)}
              onSelect={() => handleSeclectUser(user._id)}
            />
          ))
        ) : search.trim() ? (
          <p>No users found for.</p>
        ) : null}
      </div>
    </div>
  );
};

export default AssignUser;
