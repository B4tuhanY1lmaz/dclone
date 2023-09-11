"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { Command, Search } from "lucide-react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface ServerSearchProps {
    data: {
        label: string,
        type: "channel" | "member",
        data: {
            icon: React.ReactNode;
            name: string;
            id: string;
        }[] | undefined
    }[]
}

function ServerSearch({ data }: ServerSearchProps) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const params = useParams()

    const onClick = ({ id, type }: { id: string, type: "channel" | "member" }) => {
        setOpen(false)

        if (type === "member") {
            return router.push(`/servers/${params?.serverId}/conversations/${id}`)
        }

        if (type === "channel") {
            return router.push(`/servers/${params?.serverId}/channels/${id}`)
        }
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
                <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
                <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
                    Search
                </p>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search All channels and members" />
                <CommandList>
                    <CommandEmpty>
                        No Results found
                    </CommandEmpty>
                    {data.map(({ label, type, data }) => {
                        if (!data?.length) return null;

                        return (
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({ id, icon, name }) => {
                                    return (
                                        <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                                            {icon}
                                            <span>{name}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}

export default ServerSearch;