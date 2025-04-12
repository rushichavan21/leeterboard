import { useAuthContext } from "../../Hooks/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../../pages/Home/Home.css";
import { useToast } from "../../Hooks/use-toast";
import { ToastAction } from "@/Components/ui/toast"

import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar";


import {
  CameraIcon,
  Home,
  Inbox,
  Lock,
  LogOutIcon,
  UnlockKeyhole,
  StarIcon,
} from "lucide-react";

const navigationItems = [
  { title: "VJTI CUSTOM", icon: StarIcon, task: "VjtiCustom",path:"/"},
  { title: "Interview", icon: Inbox, task: "discuss", path: "/discuss" },
  { title: "Snap", icon: CameraIcon, task: "Snap", path: "/generate_snap" },
  { title: "Public Room", icon: UnlockKeyhole, task: "Public", comingSoon: true },
  { title: "Home", icon: Home, task: "Home", path: "/home" },
  { title: "Logout", icon: LogOutIcon, task: "logout" },
];

export function AppSidebar() {
  const { dispatch } = useAuthContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (item) => {
    if (item.comingSoon) {
      toast({ title: "Launching Soon" });
      return;
    }

    if (item.task === "logout") {
      handleLogoutClick();
      return;
    }

    if (location.pathname === item.path) {
      toast({ title: `You are on ${item.title} page already` });
      return;
    }

    navigate(item.path);
  };

  const handleLogoutClick = () => {
    toast({
      title: "Are You Sure?",
      action: <ToastAction onClick={handleLogout} altText="Logout">Logout</ToastAction>,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <Sidebar className="sidebarComp" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="sidebar--icons">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  id="tryToCenter"
                  onClick={() => handleNavigation(item)}
                >
                  <SidebarMenuButton asChild>
                    <button>
                      <item.icon id="iconSize" />
                      <span className="sidebar--elements">{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const Slider = ({ children }) => (
  <div className="newsidebar--Wrapper">
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  </div>
);

export default Slider;







