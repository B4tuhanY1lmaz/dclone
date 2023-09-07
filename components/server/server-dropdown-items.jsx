"use client";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { ChevronDown, UserPlus, Settings, PlusCircle, Users, Trash, LogOut } from "lucide-react";
import { MemberRole } from "@prisma/client";

function ServerDropdownItems({ role }) {
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = role === MemberRole.MODERATOR
    const isMember = role === MemberRole.GUEST

    return (
        <>
            <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                {isModerator && (
                    <>
                        <DropdownMenuItem className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
                            Invite People
                            <UserPlus className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                            Manage Members
                            <Users className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                            Create Channel
                            <PlusCircle className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}
                {isAdmin && (
                    <>
                        <DropdownMenuItem 
                            className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
                            Invite people
                            <UserPlus className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                            Server Settings
                            <Settings className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                            Manage Members
                            <Users className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                            Create Channel
                            <PlusCircle className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                            Delete Server
                            <Trash className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    </>
                )}
                {!isAdmin && (
                    <>
                        <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                            Leave Server
                            <LogOut className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </>
    )
}

export default ServerDropdownItems;