import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import logo from "./logo.svg";
import { UserList } from "./components/UserList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="border-b flex w-full items-center fixed top-0 bg-white z-50">
        <img src={logo} />
        <div className="text-xl ml-6">Planned test</div>
      </div>
      <div className="content bg-slate-50 min-h-full h-auto">
        <UserList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
