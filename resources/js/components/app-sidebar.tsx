import { Link } from '@inertiajs/react';
import { FileText, Globe } from 'lucide-react';
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
                                href="/admin/documents"
                                className="flex items-center gap-3"
                            >
                                <img
                                    src="/images/logo-bmkg.png"
                                    alt="Logo BMKG"
                                    className="h-9 w-auto object-contain shrink-0"
                                />
                                <div className="flex flex-col text-left overflow-hidden">
                                    <span className="text-xs leading-tight font-extrabold text-sidebar-foreground truncate">
                                        Badan Meteorologi Klimatologi Dan Geofisika
                                    </span>
                                    <span className="text-[10px] font-medium text-muted-foreground truncate">
                                        Stasiun Meteorologi Maritim Kelas II Yos Soedarso Ambon
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
