import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: { memberId: string } }) {
    try {

        const profile = currentProfile();
        const { searchParams } = new URL(req.url)
        const { role } = await req.json()

        const serverId = searchParams.get("serverId")

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!serverId) {
            return new NextResponse("ServerId missing", { status: 400 })
        }
        if (!params.memberId) {
            return new NextResponse("Member ID missing", { status: 400 })
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: params.memberId,
                            profileId: {
                                not: profile.id
                            }
                        },
                        data: {
                            role
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        })
        return NextResponse.json(server);

    } catch (error) {
        console.log("[MEMBERS_ID_PATCH]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: {memberId : string} }) {
    try {
        const profile = currentProfile();
        const { searchParams } = new URL(req.url)

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const serverId = searchParams.get("serverId")

        if (!serverId) {
            return new NextResponse("ServerId missing", { status: 400 })
        }
        if (!params.memberId) {
            return new NextResponse("Member ID missing", { status: 400 })
        }

        // Currently kicking members doesn't works becouse of database relations. 
        // How I'm planning to fix this is to delete members from Member section of Database instead of server relation.
        // Leaving that for later
        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    deleteMany: {
                        id: params.memberId,
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        })
        console.log("deleted")
        return NextResponse.json(server)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", { status: 500 })
    }
}