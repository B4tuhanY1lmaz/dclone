"use client";

import { useState, useEffect } from "react"
import axios from "axios"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter, DialogHeader } from "../ui/dialog";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, RefreshCw, Check } from "lucide-react"
import { useModal } from "@/components/modals/use-modal-store"
import { useOrigin } from "@/lib/use-origin"

const InviteModal = () => {

    const { isOpen, onClose, onOpen, type, data } = useModal();
    const origin = useOrigin()
    const { server } = data
    const isModalOpen = isOpen && type === "invite";

    const InviteUrl = `${origin}/invite/${server?.inviteCode}`

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(InviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const newLink = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

            onOpen("invite", { server: response.data });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite People!
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input 
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" 
                            value={InviteUrl}
                            disabled={isLoading}
                        />
                        <Button onClick={onCopy} disabled={isLoading} size="icon">
                            {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
                        </Button>
                    </div>
                    <Button onClick={newLink} disabled={isLoading} className="text-xs text-zinc-400 mt-4">
                        Generate new link.
                        <RefreshCw className="w-4 h-4 ml-2"/>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default InviteModal;