import { Hash } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { SocketIndicator } from "./socket-indicator"

import MobileToggle from "../mobile-toggle"

function ChatHeader({ serverId, name, type, imageUrl }) {
    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
            <MobileToggle 
                serverId={serverId}
            />
            {type === "channel" && (
                <Hash className="w-6 h-6 text-zinc-500 dark:text-zinc-400 mx-2"/>
            )}
            {type === "conversation" && (
                <Avatar className="h-5 w-5 mr-2">
                    <AvatarImage src={imageUrl} />
                    <AvatarFallback>M</AvatarFallback>
                </Avatar>
            )}
            <p className="font-semibold text-md text-black dark:text-white">
                {name}
            </p>
            <div className="ml-auto">
                <SocketIndicator />
            </div>
        </div>
    )
}

export default ChatHeader