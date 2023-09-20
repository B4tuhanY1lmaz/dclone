"use client";

import { useState } from "react"
import axios from "axios"
import qs from "query-string"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter, DialogHeader } from "../ui/dialog";
import { Button } from "@/components/ui/button"
import { useModal } from "@/components/modals/use-modal-store"
import { useRouter, useParams } from "next/navigation";

const DeleteChannelModal = () => {

    const { isOpen, onClose, onOpen, type, data } = useModal();
    const { server, channel } = data
    const isModalOpen = isOpen && type === "deleteChannel";

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const params = useParams()

    const onClick = async () => {
        try {
            setIsLoading(true)
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel.id}`,
                query: {
                    serverId: params?.serverId,
                }
            })
            await axios.delete(url)
            
            onClose()
            router.refresh()
            router.push(`/servers/${server?.id}`)
        } catch (error) {
            console.log("error comes", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Channel?
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        
                        <span className="text-indigo-500 font-semibold">{channel?.name}</span> will be deleted!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button disabled={isLoading} onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                        <Button disabled={isLoading} onClick={onClick} className="bg-rose-500/90 hover:bg-rose-600 text-white">
                            Delete Channel
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteChannelModal;