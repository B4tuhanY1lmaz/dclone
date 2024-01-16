"use client";

import { useState, useEffect } from "react";

import CreateServerModal from "../modals/create-server-modal";
import InviteModal from "../modals/invite-modal"
import EditServerModal from "../modals/edit-server-modal"
import EditMembersModal from "@/components/modals/edit-members-modal"
import CreateChannelModal from "@/components/modals/create-channel-modal"
import LeaveServerModal from "@/components/modals/leave-server-modal"
import DeleteServerModal from "@/components/modals/delete-server-modal"
import DeleteChannelModal from "../modals/delete-channel-modal"
import EditChannelModal from "../modals/edit-channel-modal"
import { messageFileModal } from "../modals/messageFile-modal"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal />
            <EditMembersModal />
            <CreateChannelModal />
            <LeaveServerModal />
            <DeleteServerModal />
            <DeleteChannelModal />
            <EditChannelModal />
            <messageFileModal />
        </>
    )
}