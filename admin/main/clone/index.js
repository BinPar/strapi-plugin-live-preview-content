"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCloneHeader = exports.shouldAddCloneHeader = void 0;
var react_1 = __importDefault(require("react"));
var clone_badge_1 = require("./clone-badge");
var shouldAddCloneHeader = function (layout) {
    var _a = layout.contentType.schema, options = _a.options, attributes = _a.attributes;
    return options.previewable && !!attributes.cloneOf;
};
exports.shouldAddCloneHeader = shouldAddCloneHeader;
var getCloneHeader = function (formatMessage) { return ({
    label: formatMessage({ id: "preview.containers.List.state" }),
    name: "cloneOf",
    searchable: false,
    sortable: true,
    cellFormatter: function (cellData) { return react_1.default.createElement(clone_badge_1.CloneBadge, { isClone: !!cellData.cloneOf }); },
}); };
exports.getCloneHeader = getCloneHeader;
//# sourceMappingURL=index.js.map