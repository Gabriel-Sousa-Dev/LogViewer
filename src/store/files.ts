import { generateUUID } from "@/utils/generateUUID";
import { create } from "zustand";

export interface FilesStatsI {
    files: Record<string, File>;
    addNewFile: (newFile: File) => void;
    getFile: (id: string) => File | null;
    removeFile: (id: string) => void;
}

export const useFiles = create<FilesStatsI>()((set, get) => ({
    files: {},
    addNewFile: (newFile) => {
        set((state) => ({
            files: { ...state.files, [generateUUID()]: newFile },
        }));
    },
    getFile: (id) => {
        return get().files[id];
    },
    removeFile(id) {
        set((state) => {
            const { [id]: _, ...rest } = state.files;

            return { files: rest };
        });
    },
}));
