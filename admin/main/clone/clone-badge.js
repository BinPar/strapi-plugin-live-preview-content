"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloneBadge = void 0;
var prop_types_1 = __importDefault(require("prop-types"));
var react_1 = __importDefault(require("react"));
var react_intl_1 = require("react-intl");
var styled_components_1 = __importDefault(require("styled-components"));
var core_1 = require("@buffetjs/core");
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: fit-content;\n  padding: 1rem;\n  border-radius: 0.2rem;\n  height: 2.5rem;\n  ", ";\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: fit-content;\n  padding: 1rem;\n  border-radius: 0.2rem;\n  height: 2.5rem;\n  ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return "\n    border: 1px solid #82b3c9;\n    background-color: #e1f5fe;\n    ".concat(core_1.Text, " {\n        font-weight: ").concat(theme.main.fontWeights.bold, ";\n    }\n  ");
});
var CloneBadge = function (_a) {
    var isClone = _a.isClone;
    var formatMessage = (0, react_intl_1.useIntl)().formatMessage;
    if (!isClone) {
        return "-";
    }
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(core_1.Text, { lineHeight: "19px" }, formatMessage({
            id: "preview.containers.List.clone",
        }))));
};
exports.CloneBadge = CloneBadge;
exports.CloneBadge.propTypes = {
    isClone: prop_types_1.default.bool.isRequired,
};
var templateObject_1;
//# sourceMappingURL=clone-badge.js.map