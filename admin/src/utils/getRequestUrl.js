"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pluginId_1 = __importDefault(require("../pluginId"));
var getRequestUrl = function (path) { return "/".concat(pluginId_1.default, "/").concat(path); };
exports.default = getRequestUrl;
//# sourceMappingURL=getRequestUrl.js.map