"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var validateSettings = require("./validations/settings");
/**
 * preview.js controller
 *
 * @description: A set of functions called "actions" of the `preview` plugin.
 */
module.exports = {
    /**
     * Get if preview services is active
     *
     * @param ctx
     *
     * @return Returns true or false for preview
     */
    isPreviewable: function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var service, isPreviewable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = global.strapi.plugins["preview-content"].services.preview;
                        return [4 /*yield*/, service.isPreviewable(ctx.params.contentType)];
                    case 1:
                        isPreviewable = _a.sent();
                        ctx.send({ isPreviewable: isPreviewable });
                        return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Find a content type by id
     *
     * @param ctx
     *
     * @returns Returns the content type by id, otherwise null.
     */
    findOne: function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var service, contentPreview;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = global.strapi.plugins["preview-content"].services.preview;
                        return [4 /*yield*/, service.findOne(ctx.params.contentType, ctx.params.id, ctx.query)];
                    case 1:
                        contentPreview = _a.sent();
                        ctx.send(contentPreview);
                        return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Get preview url of content type
     *
     * @param ctx
     *
     * @returns eturns the object containing the preview url, otherwise null.
     */
    getPreviewUrl: function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, contentType, id, query, service, url;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ctx.params, contentType = _a.contentType, id = _a.id, query = ctx.query;
                        service = global.strapi.plugins["preview-content"].services.preview;
                        return [4 /*yield*/, service.getPreviewUrl(contentType, id, query)];
                    case 1:
                        url = _b.sent();
                        ctx.send({ url: url || "" });
                        return [2 /*return*/];
                }
            });
        });
    },
    getRemotePreviewUrl: function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, url, info, res, previewUrl;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ctx.request.body, url = _a.url, info = _a.info;
                        return [4 /*yield*/, fetch(url, {
                                method: "POST",
                                body: JSON.stringify(info),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })];
                    case 1:
                        res = _b.sent();
                        return [4 /*yield*/, res.text()];
                    case 2:
                        previewUrl = _b.sent();
                        console.log({ url: url, info: info, previewUrl: previewUrl });
                        ctx.send({ url: previewUrl || "" });
                        return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Get settings of the plugin
     */
    getSettings: function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, strapi.plugins["preview-content"].services.preview.getSettings()];
                    case 1:
                        data = _a.sent();
                        ctx.body = { data: data };
                        return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Update settings of the plugin
     */
    updateSettings: function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var body, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = ctx.request.body;
                        return [4 /*yield*/, validateSettings(body)];
                    case 1:
                        data = _a.sent();
                        // @ts-ignore
                        return [4 /*yield*/, strapi.plugins["preview-content"].services.preview.setSettings(data)];
                    case 2:
                        // @ts-ignore
                        _a.sent();
                        ctx.body = { data: data };
                        return [2 /*return*/];
                }
            });
        });
    },
};
//# sourceMappingURL=preview.js.map