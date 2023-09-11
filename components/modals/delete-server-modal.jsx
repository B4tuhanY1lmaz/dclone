"use client";

import { useState } from "react"
import axios from "axios"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter, DialogHeader } from "../ui/dialog";
import { Button } from "@/components/ui/button"
import { useModal } from "@/components/modals/use-modal-store"
import { useRouter } from "next/navigation";

const DeleteServerModal = () => {

    const { isOpen, onClose, onOpen, type, data } = useModal();
    const { server } = data
    const isModalOpen = isOpen && type === "deleteServer";

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onClick = async () => {
        try {
            setIsLoading(true)

            await axios.delete(`/api/servers/${server?.id}/leave`)
            onClose()
            router.refresh()
            router.push("/")
            router.refresh()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Server?
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        This deletes your server. Are you sure? <br />
                        <span className="text-indigo-500 font-semibold">{server?.name}</span> will be permanetly deleted!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button disabled={isLoading} onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                        <Button disabled={isLoading} onClick={onClick} className="bg-rose-500/90 hover:bg-rose-600 text-white">
                            Delete Server
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteServerModal;