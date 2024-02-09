import { Mark, mergeAttributes, markInputRule, markPasteRule } from '@tiptap/core';

const starInputRegex = /(?:^|\s)((?:\|\|)((?:[^*]+))(?:\|\|))$/;
const starPasteRegex = /(?:^|\s)((?:\|\|)((?:[^*]+))(?:\|\|))/g;
const Spoiler = Mark.create({
    name: "spoiler",
    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },
    parseHTML() {
        return [
            {
                tag: "details",
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return [
            "details",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
            0,
        ];
    },
    addCommands() {
        return {
            setSpoiler: () => ({ commands }) => {
                return commands.setMark(this.name);
            },
            toggleSpoiler: () => ({ commands }) => {
                return commands.toggleMark(this.name);
            },
            unsetSpoiler: () => ({ commands }) => {
                return commands.unsetMark(this.name);
            },
        };
    },
    addKeyboardShortcuts() {
        return {
            "Mod-l": () => this.editor.commands.toggleSpoiler(),
            "Mod-L": () => this.editor.commands.toggleSpoiler(),
        };
    },
    addInputRules() {
        return [
            markInputRule({
                find: starInputRegex,
                type: this.type,
            }),
        ];
    },
    addPasteRules() {
        return [
            markPasteRule({
                find: starPasteRegex,
                type: this.type,
            }),
        ];
    },
});

export { Spoiler, Spoiler as default, starInputRegex, starPasteRegex };
//# sourceMappingURL=index.js.map
