import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/NewHome.css";
import { useToast } from "../Hooks/use-toast";

import {
  CameraIcon,
  Home,
  Inbox,
  Lock,
  LogOutIcon,
  UnlockKeyhole,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
    task: "Home",
  },
  {
    title: "Messages",
    url: "#",
    icon: Inbox,
    task: "Messages",
  },
  {
    title: "Snap",
    url: "#",
    icon: CameraIcon,
    task: "Snap",
  },
  {
    title: "Public Room",
    url: "#",
    icon: UnlockKeyhole,
    task: "Public",
  },
  {
    title: "Private Room",
    url: "#",
    icon: Lock,
    task: "Private",
  },
  {
    title: "logout",
    url: "#",
    icon: LogOutIcon,
    task: "logout",
  },
];

export function AppSidebar() {
  const { dispatch } = useAuthContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  let location = useLocation();

  const Home = () => {
    if (location.pathname === "/") {
      toast({
        title: `You are on HomePage Already`,
      });
    }
    navigate("/");
  };
  const Snap = () => {
    if (location.pathname === "/generate_snap") {
      toast({
        title: `You are on HomePage Already`,
      });
    } else {
      navigate("/generate_snap");
    }
  };
  const handleRefresh = () => {
    navigate("/");
    window.location.reload();
  };
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    console.log("logout");
  };
  const Private = () => {
    toast({
      title: `Launching Soon`,
    });
    console.log("handlePrivate");
  };
  const Public = () => {
    toast({
      title: `Launching Soon`,
    });
    console.log("handlePublic");
  };
  const Messages = () => {
    toast({
      title: `Launching Soon  `,
    });
  };

  const handleClick = (task) => {
    switch (task) {
      case "Home":
        Home();
        break;
      case "Snap":
        Snap();
        break;
      case "logout":
        logout();
        break;
      case "Private":
        Private();
        break;
      case "Public":
        Public();
        break;
      case "Messages":
        Messages();
        break;
      default:
        console.log("No action defined for", task);
    }
  };

  return (
    <Sidebar className="sidebarComp" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="sidebar--icons"
                  onClick={() => handleClick(item.task)}
                >
                  <SidebarMenuButton asChild>
                    <button>
                      <item.icon id="iconSize"/>
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

const NewSlider = ({ children }) => {
  return (
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
};

export default NewSlider;
