import { Menu } from "lucide-react"
import NavigationSidebar from "./navigation/navigation-sidebar"
import ServerSidebar from "./server/server-sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "./ui/button"

function MobileToggle({ serverId }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden flex">
                    <Menu className="w-5 h-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
                <div className="w-[72px]">
                    <NavigationSidebar />
                </div>
                <ServerSidebar 
                        serverId={serverId}
                    />
            </SheetContent>
        </Sheet>
    )
}

export default MobileToggle