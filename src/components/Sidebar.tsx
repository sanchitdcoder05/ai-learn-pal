
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  SidebarProvider, 
  Sidebar as ShadcnSidebar, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  BookOpen, 
  MessageSquareCode, 
  FileQuestion, 
  TestTube, 
  Code, 
  GraduationCap,
  LogOut,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarWrapperProps {
  children: React.ReactNode;
}

export const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden">
          <div className="container py-4 px-2 md:px-6">
            <SidebarTrigger className="mb-4 md:hidden" />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const AppSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <ShadcnSidebar
      defaultCollapsed={false}
      collapsed={collapsed}
      onCollapsedChange={setCollapsed}
      className="border-r border-border h-screen"
    >
      <SidebarHeader className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="text-white h-4 w-4" />
          </div>
          {!collapsed && <span className="text-lg font-semibold">EduAI</span>}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild active={isActive('/dashboard')}>
              <Link to="/dashboard" className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                {!collapsed && <span>Home</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild active={isActive('/courses')}>
              <Link to="/courses" className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                {!collapsed && <span>Courses</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild active={isActive('/ai-doubt-solver')}>
              <Link to="/ai-doubt-solver" className="flex items-center space-x-2">
                <FileQuestion className="h-5 w-5" />
                {!collapsed && <span>AI Doubt Solver</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild active={isActive('/ai-code-analyzer')}>
              <Link to="/ai-code-analyzer" className="flex items-center space-x-2">
                <Code className="h-5 w-5" />
                {!collapsed && <span>AI Code Analyzer</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild active={isActive('/ai-test')}>
              <Link to="/ai-test" className="flex items-center space-x-2">
                <TestTube className="h-5 w-5" />
                {!collapsed && <span>Take AI Test</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Settings className="h-5 w-5 mr-2" />
            {!collapsed && <span>Settings</span>}
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <LogOut className="h-5 w-5 mr-2" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default AppSidebar;
