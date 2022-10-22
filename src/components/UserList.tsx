import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { Card } from "./Card";
import classNames from "classnames";
import { delay } from "../lib/helpers";
import { User, UserTable } from "./UserTable";
import { orderBy } from "lodash";

const API_URL = "http://localhost:8099";

// We delay all queries so that we have time to see the loading state.
const DELAY = 2000;

type UserListProps = {};

const filterUsers = (users: User[], min: number, max: number) => {
  return users.filter((user) => user.age >= min && user.age <= max);
};

export const UserList: React.FC<UserListProps> = () => {
  const [min, setMin] = React.useState<number | undefined>(undefined);
  const [max, setMax] = React.useState<number | undefined>(undefined);
  const queryKids = useQuery(
    ["kids"],
    async () => {
      await delay(DELAY);
      const response = await fetch(`${API_URL}/users/kids`);
      const body = await response.json();
      return body.data;
    },
    { enabled: false, refetchOnWindowFocus: false }
  );
  const queryAdults = useQuery(
    ["adults"],
    async () => {
      await delay(DELAY);
      const response = await fetch(`${API_URL}/users/adults`);
      const body = await response.json();
      return body.data;
    },
    { enabled: false, refetchOnWindowFocus: false }
  );
  const querySeniors = useQuery(
    ["seniors"],
    async () => {
      await delay(DELAY);
      const response = await fetch(`${API_URL}/users/seniors`);
      // The seniors endpoint does not return the data under the `data` key, so we can just return directly
      return response.json();
    },
    { enabled: false, refetchOnWindowFocus: false }
  );

  // using `useMemo` here is probably unnecessary as the data is not large (<100 users), but if the data was larger (>10000), we'd see a small performance gain. Rendering performance of the table would need to be looked at as well.
  const sortedUsers = useMemo(() => {
    const users = [
      ...(queryKids.data || []),
      ...(queryAdults.data || []),
      ...(querySeniors.data || []),
    ];
    return orderBy(
      users.map((user) => ({
        ...user,
        fullName: user.name.firstName + " " + user.name.lastName,
      })),
      ["fullName", "age"],
      ["asc", "desc"]
    );
  }, [queryKids.data, queryAdults.data, querySeniors.data]);

  // Filter is applied last so we can we don't have to re-transform and re-order the data if we change the mix/max filters.
  const users = useMemo(() => {
    return filterUsers(sortedUsers, min || 0, max || Infinity);
  }, [sortedUsers, min, max]);

  const isLoading =
    queryKids.fetchStatus === "fetching" ||
    queryAdults.fetchStatus === "fetching" ||
    querySeniors.fetchStatus === "fetching";
  const isError =
    queryKids.isError || queryAdults.isError || querySeniors.isError;
  const isFetched =
    queryKids.isFetched && queryAdults.isFetched && querySeniors.isFetched;

  const fetchData = () => {
    queryKids.refetch();
    queryAdults.refetch();
    querySeniors.refetch();
  };

  return (
    <div className="flex justify-center">
      <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mb-12 w-full">
        <h1 className="text-4xl mt-24 mb-8">Users</h1>
        <div className="grid gap-y-4 md:gap-8 grid-cols-1 md:grid-cols-3">
          <Card>
            <div className="relative mt-1 mb-4 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">Min</span>
              </div>
              <input
                type="number"
                name="age-min"
                id="age-min"
                className="block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 sm:pl-14 sm:text-sm"
                value={min || ""}
                onChange={(e) => setMin(parseInt(e.target.value))}
              />
            </div>
            <div className="relative mt-1 mb-4 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">Max</span>
              </div>
              <input
                type="number"
                name="age-max"
                id="age-max"
                className="block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 sm:pl-14 sm:text-sm"
                value={max || ""}
                onChange={(e) => setMax(parseInt(e.target.value))}
              />
            </div>
            <button
              onClick={fetchData}
              type="button"
              className={classNames(
                "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              )}
            >
              {isLoading ? "Retrieving users..." : "Retrieve Users"}
            </button>
            {isError && (
              <div className="text-red-300 text-xs">
                Error retrieving users. Please try again later.
              </div>
            )}
          </Card>
          <Card className="col-span-2 p-0">
            {isFetched ? (
              <UserTable
                users={users}
                loading={isLoading}
                isFetched={isFetched}
              />
            ) : (
              <div className="p-8">
                Click on "Retrieve Users" button to get started.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
