"use client";

import { Server, Member, Profile, MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { ChevronDown, UserPlus } from "lucide-react";

import ServerDropDownItems from "./server-dropdown-items"

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
}

interface ServerHeaderProps {
    server: Server;
    role?: MemberRole;
}

function ServerHeader ({
    server, role
}: ServerHeaderProps) {
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = role !== MemberRole.GUEST;

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none" asChild>
                    <button className="flex items-center w-full text-md font-semibold px-3 h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10
                    dark:hover:bg-zinc-700/50 transition">
                        {server.name}
                        <ChevronDown className="h-5 w-5 ml-auto"/>
                    </button>
                </DropdownMenuTrigger>
                <ServerDropDownItems 
                    role={role}
                />
            </DropdownMenu>
        </div>
    )
}

export default ServerHeader;