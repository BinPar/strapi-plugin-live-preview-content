"use strict";
/**
 *
 * Initializer
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var prop_types_1 = __importDefault(require("prop-types"));
var pluginId_1 = __importDefault(require("../../pluginId"));
var Initializer = function (_a) {
    var updatePlugin = _a.updatePlugin;
    var ref = (0, react_1.useRef)();
    ref.current = updatePlugin;
    (0, react_1.useEffect)(function () {
        ref.current(pluginId_1.default, "isReady", true);
    }, []);
    return null;
};
Initializer.propTypes = {
    updatePlugin: prop_types_1.default.func.isRequired,
};
exports.default = Initializer;
//# sourceMappingURL=index.js.map