"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

export const FileUpload = ({ onChange, value, endpoint }) => {
    const fileType = value?.split(".").pop();
    
    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-[100px] w-[100px]">
                <Image 
                    fill
                    src={value}
                    alt="Uploaded Image"
                    className="rounded-full"
                />
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return (
        <UploadDropzone 
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error) => {
                console.log(error);
            }}
        />
    )
}
