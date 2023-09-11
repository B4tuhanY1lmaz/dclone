import { NextResponse } from "next/server"
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

// Member leaving
export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const profile = await currentProfile()
        if (!profile) {
            return new NextResponse("Unauhtorized", { status: 401 })
        }
        if (!params.serverId) {
            return new NextResponse("Server ID Missing", { status: 400 })
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: {
                    not: profile.id
                },
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        })
        return NextResponse.json(server)
    } catch (error) {
        console.log("[SERVER_ID_LEAVE]", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}

// Server deletion
export async function DELETE(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const profile = currentProfile()
        if (!profile) {
            return new NextResponse("Unauhtorized", { status: 401 })
        }
        if (!params.serverId) {
            return new NextResponse("Server ID Missing", { status: 400 })
        }

        const server = await db.server.delete({
            where: {
                id: params.serverId,
                profileId: profile.id,
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log("[SERVER_ID_DELETION]", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}