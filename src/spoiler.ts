import {
	Mark,
	markInputRule,
	markPasteRule,
	mergeAttributes,
} from "@tiptap/core";

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

export const starInputRegex = /(?:^|\s)((?:\|\|)((?:[^*]+))(?:\|\|))$/;
export const starPasteRegex = /(?:^|\s)((?:\|\|)((?:[^*]+))(?:\|\|))/g;

export const Spoiler = Mark.create<SpoilerOptions>({
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
			setSpoiler:
				() =>
				({ commands }) => {
					return commands.setMark(this.name);
				},
			toggleSpoiler:
				() =>
				({ commands }) => {
					return commands.toggleMark(this.name);
				},
			unsetSpoiler:
				() =>
				({ commands }) => {
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
