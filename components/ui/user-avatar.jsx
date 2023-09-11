import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { cn } from "@/lib/utils"

function UserAvatar({ src, className }) {
    return (
        <Avatar className={cn(
            "h-7 w-7 md:h-10 md:w-10", className
        )}>
            <AvatarImage src={src} />
        </Avatar>
    )
}

export default UserAvatar;