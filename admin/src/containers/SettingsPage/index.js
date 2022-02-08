"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var custom_1 = require("@buffetjs/custom");
var strapi_helper_plugin_1 = require("strapi-helper-plugin");
var react_intl_1 = require("react-intl");
var lodash_1 = require("lodash");
var utils_1 = require("../../utils");
var Text_1 = __importDefault(require("../../components/Text"));
var CodeBlock_1 = __importDefault(require("../../components/CodeBlock"));
var SectionTitleWrapper_1 = __importDefault(require("./SectionTitleWrapper"));
var Wrapper_1 = __importDefault(require("./Wrapper"));
var init_1 = __importDefault(require("./init"));
var reducer_1 = __importStar(require("./reducer"));
var SettingsPage = function () {
    var formatMessage = (0, react_intl_1.useIntl)().formatMessage;
    var _a = __read((0, react_1.useReducer)(reducer_1.default, reducer_1.initialState, init_1.default), 2), reducerState = _a[0], dispatch = _a[1];
    var _b = reducerState.toJS(), initialData = _b.initialData, isLoading = _b.isLoading, modifiedData = _b.modifiedData;
    var isMounted = (0, react_1.useRef)(true);
    var getDataRef = (0, react_1.useRef)();
    var abortController = new AbortController();
    getDataRef.current = function () { return __awaiter(void 0, void 0, void 0, function () {
        var signal, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    signal = abortController.signal;
                    return [4 /*yield*/, (0, strapi_helper_plugin_1.request)((0, utils_1.getRequestUrl)("settings", { method: "GET", signal: signal }))];
                case 1:
                    data = (_a.sent()).data;
                    if (isMounted.current) {
                        dispatch({
                            type: "GET_DATA_SUCCEEDED",
                            data: data,
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        getDataRef.current();
        return function () {
            abortController.abort();
            isMounted.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var handleChange = function (_a) {
        var _b = _a.target, name = _b.name, value = _b.value;
        dispatch({
            type: "ON_CHANGE",
            keys: name,
            value: value,
        });
    };
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, strapi_helper_plugin_1.request)((0, utils_1.getRequestUrl)("settings"), {
                            method: "PUT",
                            body: modifiedData,
                        })];
                case 1:
                    _a.sent();
                    if (isMounted.current) {
                        dispatch({
                            type: "SUBMIT_SUCCEEDED",
                        });
                    }
                    strapi.notification.toggle({
                        type: "success",
                        message: { id: "notification.form.success.fields" },
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.error(err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var headerProps = {
        title: {
            label: formatMessage({ id: (0, utils_1.getTrad)("settings.header.label") }),
        },
        content: formatMessage({
            id: (0, utils_1.getTrad)("settings.sub-header.label"),
        }),
        actions: [
            {
                color: "cancel",
                disabled: (0, lodash_1.isEqual)(initialData, modifiedData),
                // TradId from the strapi-admin package
                label: formatMessage({ id: "app.components.Button.cancel" }),
                onClick: function () {
                    dispatch({
                        type: "CANCEL_CHANGES",
                    });
                },
                type: "button",
            },
            {
                disabled: false,
                color: "success",
                // TradId from the strapi-admin package
                label: formatMessage({ id: "app.components.Button.save" }),
                onClick: handleSubmit,
                type: "button",
            },
        ],
    };
    if (isLoading) {
        return react_1.default.createElement(strapi_helper_plugin_1.LoadingIndicatorPage, null);
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(custom_1.Header, __assign({}, headerProps)),
        react_1.default.createElement(Wrapper_1.default, null,
            react_1.default.createElement("div", { className: "container-fluid" },
                react_1.default.createElement("div", { className: "row" },
                    react_1.default.createElement(SectionTitleWrapper_1.default, { className: "col-12" },
                        react_1.default.createElement(Text_1.default, { fontSize: "xs", fontWeight: "semiBold", color: "#787E8F" }, formatMessage({
                            id: (0, utils_1.getTrad)("settings.section.general.label"),
                        }))),
                    react_1.default.createElement("div", { className: "col-12" },
                        react_1.default.createElement(custom_1.Inputs, { label: formatMessage({
                                id: (0, utils_1.getTrad)("settings.form.baseUrl.label"),
                            }), description: formatMessage({
                                id: (0, utils_1.getTrad)("settings.form.baseUrl.description"),
                            }), name: "baseUrl", onChange: handleChange, type: "text", value: modifiedData.baseUrl })),
                    react_1.default.createElement("div", { className: "col-12" },
                        react_1.default.createElement(custom_1.Inputs, { label: formatMessage({
                                id: (0, utils_1.getTrad)("settings.form.previewUrl.label"),
                            }), description: formatMessage({
                                id: (0, utils_1.getTrad)("settings.form.previewUrl.description"),
                            }), name: "previewUrl", onChange: handleChange, type: "text", value: modifiedData.previewUrl })),
                    react_1.default.createElement("div", { className: "col-12" },
                        react_1.default.createElement(Text_1.default, { fontSize: "md", fontWeight: "semiBold", color: "#333740" }, formatMessage({
                            id: (0, utils_1.getTrad)("settings.form.previewUrl.available"),
                        })),
                        react_1.default.createElement("hr", { className: "mt-0 mb-2" }),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("div", { className: "d-flex py-2 align-items-center" },
                                react_1.default.createElement(CodeBlock_1.default, { fontSize: "md", color: "#ffffff", className: "p-2 rounded" }, ":baseUrl"),
                                react_1.default.createElement(Text_1.default, { fontSize: "md", color: "#787E8F", className: "ml-2" }, formatMessage({
                                    id: (0, utils_1.getTrad)("settings.form.previewUrl.available.baseUrl"),
                                }))),
                            react_1.default.createElement("div", { className: "d-flex py-2 align-items-center" },
                                react_1.default.createElement(CodeBlock_1.default, { fontSize: "md", color: "#ffffff", className: "p-2 rounded" }, ":contentType"),
                                react_1.default.createElement(Text_1.default, { fontSize: "md", color: "#787E8F", className: "ml-2" }, formatMessage({
                                    id: (0, utils_1.getTrad)("settings.form.previewUrl.available.contentType"),
                                }))),
                            react_1.default.createElement("div", { className: "d-flex py-2 align-items-center" },
                                react_1.default.createElement(CodeBlock_1.default, { fontSize: "md", color: "#ffffff", className: "p-2 rounded" }, ":id"),
                                react_1.default.createElement(Text_1.default, { fontSize: "md", color: "#787E8F", className: "ml-2" }, formatMessage({
                                    id: (0, utils_1.getTrad)("settings.form.previewUrl.available.id"),
                                }))))),
                    react_1.default.createElement("div", { className: "col-12 mt-4" },
                        react_1.default.createElement(Text_1.default, { fontSize: "md", fontWeight: "semiBold", color: "#333740" }, formatMessage({
                            id: (0, utils_1.getTrad)("settings.form.previewUrl.example"),
                        })),
                        react_1.default.createElement("hr", { className: "mt-0 mb-2" }),
                        react_1.default.createElement("div", { className: "mt-3" },
                            react_1.default.createElement(CodeBlock_1.default, { fontSize: "md", color: "#ffffff", className: "p-2 rounded" },
                                "NextJS: ",
                                "<",
                                "YOUR_URL",
                                ">",
                                "/api/preview?contentType=:contentType&id=:id"))))))));
};
exports.default = SettingsPage;
//# sourceMappingURL=index.js.map