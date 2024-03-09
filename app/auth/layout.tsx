import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const cookieStore = cookies();
  const auth = cookieStore.get("auth");
  if (auth && auth) {
    return redirect("/dashboard/todos");
  }
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-[600px] mt-48 shadow-md bg-slate-100 ">
        <div className="p-[50px]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
