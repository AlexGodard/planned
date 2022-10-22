import { times } from "lodash";
import React from "react";

export type User = {
  name: { firstName: string; lastName: string };
  fullName: string;
  age: number;
};

type UserTableProps = {
  users: User[];
  loading: boolean;
  isFetched: boolean;
};

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  isFetched,
}) => {
  const [search, setSearch] = React.useState<string | undefined>(undefined);

  const filteredUsers = search
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  return (
    <div>
      <div className="mt-4 flex flex-col divide-y">
        <div className="mt-1 flex rounded-md shadow-sm m-4 ">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <input
              type="search"
              name="search"
              id="search"
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 block w-full rounded-lg border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search..."
            />
          </div>
        </div>
        <table className="min-w-full table-fixed divide-y divide-gray-300 mb-1">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 w-16"
              ></th>
              <th
                scope="col"
                className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Age
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {!loading && filteredUsers.length === 0 && isFetched && (
              <tr>
                <td className="text-center p-4" colSpan={3}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mx-auto h-12 w-12 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>

                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No users found.
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Adjust your filters or click on "Retrieve Users" button to
                    generate new set of users.
                  </p>
                </td>
              </tr>
            )}
            {loading
              ? times(10, (i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="relative w-12 px-6 sm:w-16 sm:px-8"></td>
                    <td
                      className={
                        "whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900"
                      }
                    >
                      <div className="h-4 bg-slate-200 rounded w-48"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="h-4 bg-slate-200 rounded w-8"></div>
                    </td>
                  </tr>
                ))
              : filteredUsers.map((user) => (
                  <tr key={user.fullName + user.age}>
                    <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                      />
                    </td>
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900">
                      {user.fullName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.age}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
