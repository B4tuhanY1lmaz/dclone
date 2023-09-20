"use client"

import { ChannelType, MemberRole, Server } from "@prisma/client";
import { ActionTooltip } from "../navigation/action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "../modals/use-modal-store";

function ServerSection({ label, role, sectionType, ChannelType, server }) {
    const { onOpen } = useModal()

    return ( 
    <div className="flex items-center justify-between py-2">
        <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
            {label}
        </p>
        {role !== MemberRole.GUEST && sectionType === "channels" && (
            <ActionTooltip label="Create Channel" side="top">
                <button onClick={() => onOpen("createChannel")}>
                    <Plus className="w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
                </button>
            </ActionTooltip>
        )}
        {role !== MemberRole.GUEST && sectionType === "members" && (
            <ActionTooltip label="Manage Members" side="top" align="center">
                <button onClick={() => onOpen("manageMembers", { server })}>
                    <Settings className="w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
                </button>
            </ActionTooltip>
        )}
    </div>
    )
}

export default ServerSection;