import Header from "./Header";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="h-screen flex flex-col">
      <header>
        <Header />
      </header>

      <main className="flex-1 overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}
