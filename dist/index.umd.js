(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tiptap/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@tiptap/core'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@ticketbot/extension-spoiler"] = {}, global.core));
})(this, (function (exports, core) { 'use strict';

	const starInputRegex = /(?:^|\s)((?:\|\|)((?:[^*]+))(?:\|\|))$/;
	const starPasteRegex = /(?:^|\s)((?:\|\|)((?:[^*]+))(?:\|\|))/g;
	const Spoiler = core.Mark.create({
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
	            core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
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
	            core.markInputRule({
	                find: starInputRegex,
	                type: this.type,
	            }),
	        ];
	    },
	    addPasteRules() {
	        return [
	            core.markPasteRule({
	                find: starPasteRegex,
	                type: this.type,
	            }),
	        ];
	    },
	});

	exports.Spoiler = Spoiler;
	exports.default = Spoiler;
	exports.starInputRegex = starInputRegex;
	exports.starPasteRegex = starPasteRegex;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
