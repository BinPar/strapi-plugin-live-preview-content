"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var package_json_1 = __importDefault(require("../../package.json"));
var pluginId_1 = __importDefault(require("./pluginId"));
var Initializer_1 = __importDefault(require("./containers/Initializer"));
var translations_1 = __importDefault(require("./translations"));
var SettingsPage_1 = __importDefault(require("./containers/SettingsPage"));
var getTrad_1 = __importDefault(require("./utils/getTrad"));
exports.default = (function (strapi) {
    var pluginDescription = package_json_1.default.strapi.description || package_json_1.default.description;
    var icon = package_json_1.default.strapi.icon;
    var name = package_json_1.default.strapi.name;
    var plugin = {
        description: pluginDescription,
        icon: icon,
        id: pluginId_1.default,
        initializer: Initializer_1.default,
        isReady: false,
        isRequired: package_json_1.default.strapi.required || false,
        mainComponent: null,
        name: name,
        preventComponentRendering: false,
        settings: {
            global: {
                links: [
                    {
                        title: {
                            id: (0, getTrad_1.default)("plugin.name"),
                            defaultMessage: "Preview Content",
                        },
                        name: "live-preview-content",
                        to: "".concat(strapi.settingsBaseURL, "/live-preview-content"),
                        Component: function () { return react_1.default.createElement(SettingsPage_1.default, null); },
                        exact: false,
                        permissions: [
                            { action: "plugins::live-preview-content.read", subject: null },
                        ],
                    },
                ],
            },
        },
        trads: translations_1.default,
    };
    return strapi.registerPlugin(plugin);
});
//# sourceMappingURL=index.js.map