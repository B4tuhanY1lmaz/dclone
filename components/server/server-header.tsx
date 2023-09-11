"use client";

import { Server, Member, Profile, MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { ChevronDown, UserPlus, Settings, PlusCircle, Users, Trash, LogOut } from "lucide-react";
import { useModal } from "../modals/use-modal-store";

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
    
    const { onOpen } = useModal()

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
                <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                {isModerator && (
                    <>
                        <DropdownMenuItem className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                            onClick={() => onOpen("invite", { server })}
                        >
                            Invite People
                            <UserPlus className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer" onClick={() => onOpen("manageMembers", { server })}>
                            Manage Members
                            <Users className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer" onClick={() => onOpen("createChannel")}>
                            Create Channel
                            <PlusCircle className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}
                {isAdmin && (
                    <>
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer" onClick={() => onOpen("editServer", { server })}>
                            Server Settings
                            <Settings className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer" onClick={() => onOpen("deleteServer", { server })}>
                            Delete Server
                            <Trash className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    </>
                )}
                {!isAdmin && (
                    <>
                        <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer" onClick={() => onOpen("leaveServer", { server })}>
                            Leave Server
                            <LogOut className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    </>
                )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ServerHeader;