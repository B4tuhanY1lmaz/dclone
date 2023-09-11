"use client";

import { useState, useEffect } from "react"
import axios from "axios"
import qs from "query-string"
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter, DialogHeader } from "../ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, 
    DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, 
    DropdownMenuTrigger, DropdownMenuSubTrigger } from "../ui/dropdown-menu"
import { ScrollArea } from "../ui/scroll-area"
import { Copy, RefreshCw, Check, ShieldCheck, ShieldQuestion, ShieldAlert, Shield, 
    MoreVertical, Gavel, Loader2 } from "lucide-react"
import { useModal } from "@/components/modals/use-modal-store"
import UserAvatar from "../ui/user-avatar"
import { MemberRole } from "@prisma/client"

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
    "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-rose-500"/>,
};

const EditMembersModal = () => {
    const { isOpen, onClose, onOpen, type, data } = useModal();
    const { server } = data
    const isModalOpen = isOpen && type === "manageMembers";

    const [loadingId, setLoadingId] = useState("")

    const router = useRouter()

    const onRoleChange = async (memberId, role) => {
        try {
            setLoadingId(memberId)
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                }
            })

            const response = await axios.patch(url, { role })
            router.refresh()
            onOpen("manageMembers", { server: response.data })

        } catch (error) {
            console.log(error)
        } finally {
            setLoadingId("")
        }
    }

    const onKick = async (memberId) => {
        try {
            setLoadingId(memberId)

            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                },
            })
            const response = await axios.delete(url);

        } catch (error) {
            console.log(error)
        } finally {
            setLoadingId("")
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Manage Server members
                        <DialogDescription className="text-center text-zinc-500">
                            {server?.members?.length} Members
                        </DialogDescription>
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h[420px] px-6">
                    {server?.members?.map((member) => (
                        <div key={member.id} className="flex items-center gap-x-3 px-2 mb-6">
                            <UserAvatar src={member.profile.imageUrl}/>
                            <div className="flex flex-col gap-y-1">
                                <div className="text-sm font-semibold flex items-center gap-x-3">
                                    {member.profile.name}
                                    {roleIconMap[member.role]}
                                </div>
                                <p className="text-xs text-zinc-500">
                                    {member.profile.email}
                                </p>
                            </div>
                            {server.profileId !== member.profileId && loadingId !== member.id && (
                                <div className="ml-auto">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreVertical className="h-4 w-4 text-zinc-500"/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="left">
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger className="flex items-center">
                                                    <ShieldQuestion className="w-4 h-4 mr-2"/>
                                                    <span>Role</span>
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent>
                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id, "GUEST")}>
                                                            <Shield className="h-4 w-4 mr-2" />
                                                                Guest
                                                                {member.role === "GUEST" && (
                                                                    <Check className="h-4 w-4 ml-auto"/>
                                                                )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id, "MODERATOR")}>
                                                            <ShieldCheck className="h-4 w-4 mr-2" />
                                                                Moderator
                                                                {member.role === "MODERATOR" && (
                                                                    <Check className="h-4 w-4 ml-auto"/>
                                                                )}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuPortal>
                                            </DropdownMenuSub>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-rose-500" onClick={onKick}>
                                                <Gavel className="w-4 h-4 mr-2"/>
                                                Kick
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )}
                            {loadingId === member.id && (
                                <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default EditMembersModal;