"use client"

import { Member, MemberRole, Profile, Server } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

import { ShieldCheck, ShieldAlert } from "lucide-react"
import UserAvatar from "@/components/ui/user-avatar"

function ServerMember({ Member, Server, role }) {
    const roleIconMap = {
        [MemberRole.GUEST]: null,
        [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
        [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500"/>,
    }
    
    const params = useParams()
    const router = useRouter()
    
    const icon = roleIconMap[Member.role]
    
    return (
        <button className={cn(
            "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
            params?.memberId === Member.id && "bg-zinc-700/20 dark:bg-zinc-700"
        )}>
             <UserAvatar
                 className="h-4 w-4"
                 src={Member.profile.imageUrl}
             />
            <p className={cn(
                "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                params.channelId === Member.id && "text-primary dark:group-hover:text-white"
            )}>
                {Member.profile.name}
            </p>
        </button>
    )
}

export default ServerMember;