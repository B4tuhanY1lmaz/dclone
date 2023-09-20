import { NextResponse } from "next/server"
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { MemberRole } from "@prisma/client"

export async function PATCH(req, { params }) {
    try {
        const profile =  await currentProfile()
        const { searchParams } = new URL(req.url)
        const { name, type } = await req.json()
        const serverId = searchParams.get("serverId")
        console.log(serverId)

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!serverId) {
            return new NextResponse("ServerId missing", { status: 400 })
        }
        if (!params.channelId) {
            return new NextResponse("ChannelId missing", { status: 400 })
        }
        if (name === "general") {
            return new NextResponse("Name cannot be general", { status: 400 })
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    update: {
                        where: {
                            id: params.channelId,
                            not: {
                                name: "general"
                            },
                        },
                        data: {
                            name,
                        }
                    }
                }
            }
        })

    } catch (error) {
        console.log("[CHANNEL_ID_EDIT]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        const profile = await currentProfile()
        const { searchParams } = new URL(req.url)
        const serverId = searchParams.get("serverId")

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!serverId) {
            return new NextResponse("ServerId missing", { status: 400 })
        }
        if (!params.channelId) {
            return new NextResponse("ChannelId missing", { status: 400 })
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general",
                        }
                    }
                }
            }
        })

        return NextResponse.json(server)
    } catch (error) {
        console.log("[CHANNEL_ID_DELETE]", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}