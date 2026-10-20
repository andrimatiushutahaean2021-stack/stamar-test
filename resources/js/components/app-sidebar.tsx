import { Link } from '@inertiajs/react';
import {
    LayoutDashboard,
    FileText,
    UploadCloud,
    MapPin,
    BookOpen,
    Globe,
    CloudRain,
    Anchor,
} from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard Panel',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Manajemen File & Dokumen',
        href: '/admin/documents',
        icon: FileText,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Lihat Website Publik',
        href: '/',
        icon: Globe,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-3"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                                    <CloudRain className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-sm leading-tight font-extrabold text-sidebar-foreground">
                                        STAMAR AMBON
                                    </span>
                                    <span className="text-[10px] font-medium text-muted-foreground">
                                        Panel Administrasi
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
