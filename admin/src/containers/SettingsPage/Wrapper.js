"use strict";
/*
 *
 * This should be a component in the helper plugin that will be used
 * by the webhooks views
 */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __importDefault(require("styled-components"));
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 25px 10px;\n  margin-top: 33px;\n  border-radius: ", ";\n  box-shadow: 0 2px 4px ", ";\n  background: ", ";\n"], ["\n  padding: 25px 10px;\n  margin-top: 33px;\n  border-radius: ", ";\n  box-shadow: 0 2px 4px ", ";\n  background: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.main.sizes.borderRadius;
}, function (_a) {
    var theme = _a.theme;
    return theme.main.colors.darkGrey;
}, function (_a) {
    var theme = _a.theme;
    return theme.main.colors.white;
});
exports.default = Wrapper;
var templateObject_1;
//# sourceMappingURL=Wrapper.js.map