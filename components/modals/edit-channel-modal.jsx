"use client";

import { useState, useEffect } from "react";
import * as z from "zod";
import qs from "query-string"
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter, DialogHeader } from "../ui/dialog";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "../ui/select"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useModal } from "@/components/modals/use-modal-store"
import { ChannelType } from "@prisma/client";


const formSchema = z.object({
    name: z.string().min(1, {
        message: "Channel name required."
    }).refine(
        name => name !== "general",
        {
            message: "Two 'general' channels cannot exist.'"
        }
    ),
    type: z.nativeEnum(ChannelType)
});

const EditChannelModal = () => {

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "editChannel";
    const { server, channel } = data
    const router = useRouter()
    const params = useParams()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    });

    useEffect(() => {
        if (channel) {
            form.setValue("name", channel.name)
        }
    }, [form, channel])

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values) => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel.id}`,
                query: {
                    serverId: params?.serverId
                }
            })
            await axios.patch(url, values);

            form.reset();
            router.refresh();
            onClose();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose()
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Edit Channel
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Channel Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={isLoading}
                                                placeholder={channel.name}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="primary" disabled={isLoading}>
                                Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditChannelModal;