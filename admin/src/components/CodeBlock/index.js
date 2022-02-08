"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __importDefault(require("styled-components"));
var prop_types_1 = __importDefault(require("prop-types"));
var Text = styled_components_1.default.p(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: #18202e;\n  margin: 0;\n  line-height: ", ";\n  color: ", ";\n  font-size: ", ";\n  font-weight: ", ";\n  text-transform: ", ";\n  ", "\n"], ["\n  background: #18202e;\n  margin: 0;\n  line-height: ", ";\n  color: ", ";\n  font-size: ", ";\n  font-weight: ", ";\n  text-transform: ", ";\n  ", "\n"])), function (_a) {
    var lineHeight = _a.lineHeight;
    return lineHeight;
}, function (_a) {
    var theme = _a.theme, color = _a.color;
    return theme.main.colors[color] || color;
}, function (_a) {
    var theme = _a.theme, fontSize = _a.fontSize;
    return theme.main.sizes.fonts[fontSize];
}, function (_a) {
    var theme = _a.theme, fontWeight = _a.fontWeight;
    return theme.main.fontWeights[fontWeight];
}, function (_a) {
    var textTransform = _a.textTransform;
    return textTransform;
}, function (_a) {
    var ellipsis = _a.ellipsis;
    return ellipsis &&
        "\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  ";
});
Text.defaultProps = {
    color: "greyDark",
    ellipsis: false,
    fontSize: "md",
    fontWeight: "regular",
    lineHeight: "normal",
    textTransform: "none",
};
Text.propTypes = {
    color: prop_types_1.default.string,
    ellipsis: prop_types_1.default.bool,
    fontSize: prop_types_1.default.string,
    fontWeight: prop_types_1.default.string,
    lineHeight: prop_types_1.default.string,
    textTransform: prop_types_1.default.string,
};
exports.default = Text;
var templateObject_1;
//# sourceMappingURL=index.js.map