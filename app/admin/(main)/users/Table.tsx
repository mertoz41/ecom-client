"use client";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              First Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Last Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Phone
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Email
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Verified
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Created At
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Updated At
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{user._id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.firstName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.phoneNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2 capitalize">
                {user.role}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.verified ? "Yes" : "No"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(user.updatedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
