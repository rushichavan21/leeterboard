
import React from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../pages/Home/Home.css";
import { useToast } from "../Hooks/use-toast";
import { ToastAction } from "@/Components/ui/toast"

import {
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/Components/ui/sidebar";


import {
  CameraIcon,
  Home,
  Inbox,
  Lock,
  LogOutIcon,
  UnlockKeyhole,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

const items = [
  { title: "Home", icon: Home, task: "Home" },
  { title: "Discuss", icon: Inbox, task: "Messages" },
  { title: "Snap", icon: CameraIcon, task: "Snap" },
  { title: "Public Room", icon: UnlockKeyhole, task: "Public" },
  { title: "Private Room", icon: Lock, task: "Private" },
  { title: "logout", icon: LogOutIcon, task: "logout" },
];

export function AppSidebar() {
  const { dispatch } = useAuthContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (task) => {
    switch (task) {
      case "Home":
        if (location.pathname === "/") {
          toast({ title: `You are on HomePage Already` });
        } else {
          navigate("/");
        }
        break;
      case "Snap":
        if (location.pathname === "/generate_snap") {
          toast({ title: `You are on HomePage Already` });
        } else {
          navigate("/generate_snap");
        }
        break;
      case "Private":
        toast({ title: `Launching Soon` });
        break;
      case "Public":
        toast({ title: `Launching Soon` });
        break;
      case "Messages":
        toast({ title: `Launching Soon` });
        break;
      case "logout":
        logout();
        break
      default:
        console.log("No action defined for", task);
    }
  };
  const handleLogout=()=>{
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }
  const logout = () => {
    toast({
      title: "Are You Sure?",
      description: "",
      action: <ToastAction onClick={handleLogout} altText="Logout">Logout</ToastAction>,
    })
  };


const handleButtonClick = (event) => {
  event.stopPropagation();
};  return (
    <Sidebar className="sidebarComp" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent
             className="sidebar--icons"
          >
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                
                 id="tryToCenter"
                  onClick={() => handleNavigation(item.task)}
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

const NewSlider = ({ children }) => (
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

export default NewSlider;







  //             <SidebarFooter >
  //               <SidebarMenuItem className="sidebar--icons">
  //                 <SidebarMenuButton asChild>
  //                   <button>
  //                     <LogOutIcon id="iconSize" />
  //                     <AlertDialog>
  //                       <AlertDialogTrigger asChild>
  //                         <button className="sidebar--elements" onClick={(event) => {
  //   handleButtonClick(event); 

  // }}>Logout</button>
  //                       </AlertDialogTrigger>
  //                       <AlertDialogContent>
  //                         <AlertDialogHeader>
  //                           <AlertDialogTitle>Are you sure?</AlertDialogTitle>
  //                         </AlertDialogHeader>
  //                         <AlertDialogFooter>
  //                           <AlertDialogCancel>Cancel</AlertDialogCancel>
  //                           <AlertDialogAction onClick={logout}>Logout</AlertDialogAction>
  //                         </AlertDialogFooter>
  //                       </AlertDialogContent>
  //                     </AlertDialog>
  //                   </button>
  //                 </SidebarMenuButton>
  //               </SidebarMenuItem>
  //             </SidebarFooter>