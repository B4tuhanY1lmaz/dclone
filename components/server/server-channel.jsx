"use client";

import { useParams, useRouter } from "next/navigation"
import { Channel, MemberRole, Server, ChannelType } from "@prisma/client"
import { Hash, Mic, Video, Edit, Lock, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { ActionTooltip } from "../navigation/action-tooltip"
import { useModal } from "../modals/use-modal-store"

const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,
}

const ServerChannel = ({ channel, server, role }) => {
    const { onOpen } = useModal()
    const params = useParams()
    const router = useRouter()

    const Icon = iconMap[channel.type]

    return (
        <button onClick={() => {}}
            className={cn(
                "group p-2 py-2 rounded-md flex items-center gap-z-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
                params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
            )}
        >
            <Icon className="w-5 h-5 dark:text-zinc-400 text-zinc-500 flex-shrink-0"/>
            <p className={cn(
                "ml-1 line-clamp-1 font-semibold text-sm text-zinc-500 group:hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}>
                {channel.name}
            </p>
            {channel.name !== "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionTooltip label="Edit">
                        <Edit onClick={() => {onOpen("editChannel", { channel })}} className="hidden group-hover:block w-3 h-3 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
                    </ActionTooltip>
                    <ActionTooltip label="Delete">
                        <Trash onClick={() => {onOpen("deleteChannel", { channel })}} className="hidden group-hover:block w-3 h-3 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"/>
                    </ActionTooltip>
                </div>
            )}
            {channel.name === "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <Lock className="hidden group-hover:block w-3 h-3 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"/>
                </div>
            )}
        </button>
    )
}

export { ServerChannel }