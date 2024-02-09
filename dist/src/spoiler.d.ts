import { Mark } from "@tiptap/core";
export interface SpoilerOptions {
    HTMLAttributes: Record<string, any>;
}
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        spoiler: {
            /**
             * Set a spoiler mark
             */
            setSpoiler: () => ReturnType;
            /**
             * Toggle a spoiler mark
             */
            toggleSpoiler: () => ReturnType;
            /**
             * Unset a spoiler mark
             */
            unsetSpoiler: () => ReturnType;
        };
    }
}
export declare const starInputRegex: RegExp;
export declare const starPasteRegex: RegExp;
export declare const Spoiler: Mark<SpoilerOptions, any>;
