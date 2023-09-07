import { createUploadthing } from "uploadthing/next";
import { auth } from "@clerk/nextjs"

const f = createUploadthing();

const handleAuth = () => {
    const { userID } = auth();
    if (!userID) throw new Error("Unauthorized");
    return { userID: userID };
}

export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: "4MB", maxFileCount:1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    messageFile: f(["image", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => {})
}
