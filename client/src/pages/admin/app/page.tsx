import { AppSidebar } from "../components/app-sidebar";
import { ChartAreaInteractive } from "../components/chart-area-interactive";
import { SectionCards } from "../components/section-cards";
import { SiteHeader } from "../components/site-header";
import { SidebarInset, SidebarProvider } from "../../../components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { IconBell, IconUser, IconUsers, IconLayoutColumns, IconChevronDown, IconPlus } from "@tabler/icons-react";
import { Badge } from "../../../components/ui/badge";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "../../../components/ui/dropdown-menu";
import { Label } from "../../../components/ui/label";
import * as React from "react";

export default function Page() {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.split("/")[2] || "notifications";

  const handleTabChange = (value: string) => {
    navigate(`/admin/${value}`);
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <Tabs value={path} onValueChange={handleTabChange} className="w-full flex-col justify-start gap-6">
                <div className="flex items-center justify-between px-4 lg:px-6">
                  <Label htmlFor="view-selector" className="sr-only">
                    View
                  </Label>
                  <Select value={path} onValueChange={handleTabChange}>
                    <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
                      <SelectValue placeholder="Select a view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="notifications">Notifications</SelectItem>
                      <SelectItem value="technicians">Technicians</SelectItem>
                      <SelectItem value="users">Users</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                  <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                    <TabsTrigger value="notifications">
                      <IconBell className="mr-2 size-4" /> Notifications <Badge variant="secondary">5</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="technicians">
                      <IconUser className="mr-2 size-4" /> Technicians <Badge variant="secondary">10</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="users">
                      <IconUsers className="mr-2 size-4" /> Users <Badge variant="secondary">7</Badge>
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <IconLayoutColumns />
                          <span className="hidden lg:inline">Customize Columns</span>
                          <span className="lg:hidden">Columns</span>
                          <IconChevronDown />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="text-muted-foreground px-4 py-2 text-sm">No columns to customize</div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm">
                      <IconPlus />
                      <span className="hidden lg:inline">Add Section</span>
                    </Button>
                  </div>
                </div>
              </Tabs>
              <div className="mt-4">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
