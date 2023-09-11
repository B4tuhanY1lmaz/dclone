import { create } from "zustand";;
import { Server } from "@prisma/client";

export type ModalType = "createServer" | "invite" | "editServer" | "manageMembers" | "createChannel" | "leaveServer" | "deleteServer";

interface ModalData {
    server?: Server
}

interface ModalStorage {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStorage>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false })
}));