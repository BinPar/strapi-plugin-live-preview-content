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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePreview = exports.PreviewProvider = void 0;
var prop_types_1 = __importDefault(require("prop-types"));
var react_1 = __importStar(require("react"));
var react_intl_1 = require("react-intl");
var strapi_helper_plugin_1 = require("strapi-helper-plugin");
var lodash_1 = require("lodash");
var CONTENT_MANAGER_PLUGIN_ID = "content-manager";
var PreviewContext = (0, react_1.createContext)(undefined);
var helperCleanData = function (value, key) {
    if ((0, lodash_1.isArray)(value)) {
        return value.map(function (obj) { return (obj[key] ? obj[key] : obj); });
    }
    if ((0, lodash_1.isObject)(value)) {
        return value[key];
    }
    return value;
};
var cleanData = function (retrievedData, currentSchema, componentsSchema) {
    var getType = function (schema, attrName) {
        return (0, lodash_1.get)(schema, ["attributes", attrName, "type"], "");
    };
    var getOtherInfos = function (schema, arr) {
        return (0, lodash_1.get)(schema, __spreadArray(["attributes"], __read(arr), false), "");
    };
    var recursiveCleanData = function (data, schema) {
        return Object.keys(data).reduce(function (acc, current) {
            var attrType = getType(schema, current);
            var value = (0, lodash_1.get)(data, current);
            var component = getOtherInfos(schema, [current, "component"]);
            var isRepeatable = getOtherInfos(schema, [current, "repeatable"]);
            var cleanedData;
            switch (attrType) {
                case "json":
                    try {
                        cleanedData = JSON.parse(value);
                    }
                    catch (err) {
                        cleanedData = value;
                    }
                    break;
                case "date":
                    cleanedData =
                        value && value._isAMomentObject === true
                            ? value.format("YYYY-MM-DD")
                            : value;
                    break;
                case "datetime":
                    cleanedData =
                        value && value._isAMomentObject === true
                            ? value.toISOString()
                            : value;
                    break;
                case "media":
                    if (getOtherInfos(schema, [current, "multiple"]) === true) {
                        cleanedData = value
                            ? value.filter(function (file) { return !(file instanceof File); })
                            : null;
                    }
                    else {
                        cleanedData =
                            (0, lodash_1.get)(value, 0) instanceof File ? null : (0, lodash_1.get)(value, "id", null);
                    }
                    break;
                case "component":
                    if (isRepeatable) {
                        cleanedData = value
                            ? value.map(function (data) {
                                var subCleanedData = recursiveCleanData(data, componentsSchema[component]);
                                return subCleanedData;
                            })
                            : value;
                    }
                    else {
                        cleanedData = value
                            ? recursiveCleanData(value, componentsSchema[component])
                            : value;
                    }
                    break;
                case "dynamiczone":
                    cleanedData = value.map(function (componentData) {
                        var subCleanedData = recursiveCleanData(componentData, componentsSchema[componentData.__component]);
                        return subCleanedData;
                    });
                    break;
                default:
                    // The helper is mainly used for the relations in order to just send the id
                    cleanedData = helperCleanData(value, "id");
            }
            acc[current] = cleanedData;
            return acc;
        }, {});
    };
    return recursiveCleanData(retrievedData, currentSchema);
};
var removeKeyInObject = function (obj, keyToRemove) {
    if (!obj) {
        return obj;
    }
    return Object.keys(obj).reduce(function (acc, current) {
        var _a, _b, _c;
        var value = acc[current];
        if (value === null) {
            return acc;
        }
        if (Array.isArray(value)) {
            if (Array.isArray(acc)) {
                acc[current] = removeKeyInObject(value, keyToRemove);
                return acc;
            }
            return __assign(__assign({}, acc), (_a = {}, _a[current] = value.map(function (obj) { return removeKeyInObject(obj, keyToRemove); }), _a));
        }
        if (typeof value === "object") {
            if (value._isAMomentObject === true) {
                return __assign(__assign({}, acc), (_b = {}, _b[current] = value, _b));
            }
            if (Array.isArray(acc)) {
                acc[current] = removeKeyInObject(value, keyToRemove);
                return acc;
            }
            return __assign(__assign({}, acc), (_c = {}, _c[current] = removeKeyInObject(value, keyToRemove), _c));
        }
        if (current === keyToRemove) {
            delete acc[current];
        }
        return acc;
    }, obj);
};
var PreviewProvider = function (props) {
    var componentLayouts = props.componentLayouts, children = props.children, initialData = props.initialData, isCreatingEntry = props.isCreatingEntry, layout = props.layout, modifiedData = props.modifiedData, slug = props.slug, canUpdate = props.canUpdate, canCreate = props.canCreate, _a = props.getPreviewUrlParams, getPreviewUrlParams = _a === void 0 ? function () { return ({}); } : _a;
    console.log(props);
    var formatMessage = (0, react_intl_1.useIntl)().formatMessage;
    var _b = __read((0, react_1.useState)(false), 2), showWarningClone = _b[0], setWarningClone = _b[1];
    var _c = __read((0, react_1.useState)(false), 2), showWarningPublish = _c[0], setWarningPublish = _c[1];
    var _d = __read((0, react_1.useState)(false), 2), previewable = _d[0], setIsPreviewable = _d[1];
    var _f = __read((0, react_1.useState)(false), 2), isButtonLoading = _f[0], setButtonLoading = _f[1];
    var toggleWarningClone = function () { return setWarningClone(function (prevState) { return !prevState; }); };
    var toggleWarningPublish = function () {
        return setWarningPublish(function (prevState) { return !prevState; });
    };
    (0, react_1.useEffect)(function () {
        (0, strapi_helper_plugin_1.request)("/preview-content/is-previewable/".concat(layout.apiID), {
            method: "GET",
        }).then(function (_a) {
            var isPreviewable = _a.isPreviewable;
            setIsPreviewable(isPreviewable);
        });
    }, [layout.apiID]);
    var didChangeData = (0, react_1.useMemo)(function () {
        return (!(0, lodash_1.isEqual)(initialData, modifiedData) ||
            (isCreatingEntry && !(0, lodash_1.isEmpty)(modifiedData)));
    }, [initialData, isCreatingEntry, modifiedData]);
    var createFormData = (0, react_1.useCallback)(function (data) {
        // First we need to remove the added keys needed for the dnd
        var preparedData = removeKeyInObject((0, lodash_1.cloneDeep)(data), "__temp_key__");
        // Then we need to apply our helper
        var cleanedData = cleanData(preparedData, layout, componentLayouts);
        return cleanedData;
    }, [componentLayouts, layout]);
    var previewHeaderActions = (0, react_1.useMemo)(function () {
        var headerActions = [];
        if (previewable &&
            ((isCreatingEntry && canCreate) || (!isCreatingEntry && canUpdate))) {
            var params_1 = getPreviewUrlParams(initialData, modifiedData, layout);
            headerActions.push({
                disabled: didChangeData,
                label: formatMessage({
                    id: getPreviewPluginTrad("containers.Edit.preview"),
                }),
                color: "secondary",
                onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                    var data, body, res, url, _e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 5, , 6]);
                                return [4 /*yield*/, (0, strapi_helper_plugin_1.request)("/preview-content/preview-url/".concat(layout.apiID, "/").concat(initialData.id), {
                                        method: "GET",
                                        params: params_1,
                                    })];
                            case 1:
                                data = _a.sent();
                                if (!data.url) return [3 /*break*/, 3];
                                body = createFormData(modifiedData);
                                return [4 /*yield*/, fetch(data.url, {
                                        method: "POST",
                                        body: JSON.stringify(body),
                                        mode: "no-cors",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    })];
                            case 2:
                                res = _a.sent();
                                if (res.status === 200) {
                                    url = res.text();
                                    console.log({ data: data, body: body, url: url });
                                    if (url) {
                                        window.open(url, "_blank");
                                    }
                                }
                                else {
                                    console.error("Error getting preview URL", { res: res });
                                }
                                return [3 /*break*/, 4];
                            case 3:
                                strapi.notification.error(getPreviewPluginTrad("error.previewUrl.notFound"));
                                _a.label = 4;
                            case 4: return [3 /*break*/, 6];
                            case 5:
                                _e_1 = _a.sent();
                                console.log("Error previewing:", _e_1.stack || _e_1.message || _e_1);
                                strapi.notification.error(getPreviewPluginTrad("error.previewUrl.notFound"));
                                return [3 /*break*/, 6];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); },
                type: "button",
                style: {
                    paddingLeft: 15,
                    paddingRight: 15,
                    fontWeight: 600,
                    minWidth: 100,
                },
            });
        }
        return headerActions;
    }, [
        didChangeData,
        formatMessage,
        layout.apiID,
        previewable,
        initialData.cloneOf,
        initialData.id,
        canCreate,
        canUpdate,
        isCreatingEntry,
    ]);
    var handleConfirmPreviewClone = function () { return __awaiter(void 0, void 0, void 0, function () {
        var errorMessage;
        return __generator(this, function (_a) {
            try {
                // Show the loading state
                setButtonLoading(true);
                strapi.notification.success(getPreviewPluginTrad("success.record.clone"));
                window.location.replace(getFrontendEntityUrl(slug, initialData.id));
            }
            catch (err) {
                console.log(err);
                errorMessage = (0, lodash_1.get)(err, "response.payload.message", formatMessage({ id: getPreviewPluginTrad("error.record.clone") }));
                strapi.notification.error(errorMessage);
            }
            finally {
                setButtonLoading(false);
                toggleWarningClone();
            }
            return [2 /*return*/];
        });
    }); };
    var handleConfirmPreviewPublish = function () { return __awaiter(void 0, void 0, void 0, function () {
        var targetId, urlPart, body, err_1, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    // Show the loading state
                    setButtonLoading(true);
                    targetId = initialData.cloneOf.id;
                    urlPart = getRequestUrl(slug);
                    body = prepareToPublish(__assign(__assign({}, initialData), { id: targetId, cloneOf: null }));
                    return [4 /*yield*/, (0, strapi_helper_plugin_1.request)("".concat(urlPart, "/").concat(targetId), {
                            method: "PUT",
                            body: body,
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, strapi_helper_plugin_1.request)("".concat(urlPart, "/").concat(initialData.id), {
                            method: "DELETE",
                        })];
                case 2:
                    _a.sent();
                    strapi.notification.success(getPreviewPluginTrad("success.record.publish"));
                    window.location.replace(getFrontendEntityUrl(slug, targetId));
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    errorMessage = (0, lodash_1.get)(err_1, "response.payload.message", formatMessage({ id: getPreviewPluginTrad("error.record.publish") }));
                    strapi.notification.error(errorMessage);
                    return [3 /*break*/, 5];
                case 4:
                    setButtonLoading(false);
                    toggleWarningPublish();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var value = {
        previewHeaderActions: previewHeaderActions,
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(PreviewContext.Provider, { value: value }, children),
        previewable && (react_1.default.createElement(strapi_helper_plugin_1.PopUpWarning, { isOpen: showWarningClone, toggleModal: toggleWarningClone, content: {
                message: getPreviewPluginTrad("popUpWarning.warning.clone"),
                secondMessage: getPreviewPluginTrad("popUpWarning.warning.clone-question"),
            }, popUpWarningType: "info", onConfirm: handleConfirmPreviewClone, isConfirmButtonLoading: isButtonLoading })),
        previewable && (react_1.default.createElement(strapi_helper_plugin_1.PopUpWarning, { isOpen: showWarningPublish, toggleModal: toggleWarningPublish, content: {
                message: getPreviewPluginTrad("popUpWarning.warning.publish"),
                secondMessage: getPreviewPluginTrad("popUpWarning.warning.publish-question"),
            }, popUpWarningType: "info", onConfirm: handleConfirmPreviewPublish, isConfirmButtonLoading: isButtonLoading }))));
};
exports.PreviewProvider = PreviewProvider;
var usePreview = function () {
    var context = (0, react_1.useContext)(PreviewContext);
    if (context === undefined) {
        throw new Error("usePreview must be used within a PreviewProvider");
    }
    return context;
};
exports.usePreview = usePreview;
/**
 * Should remove ID's from components -
 * could modify only already attached componetns (with proper ID)
 * or create new one - in that case removing id will create new one
 * @param {object} payload
 */
function prepareToPublish(payload) {
    if (Array.isArray(payload)) {
        payload.forEach(prepareToPublish);
    }
    else if (payload && payload.constructor === Object) {
        // eslint-disable-next-line no-prototype-builtins
        if (payload.hasOwnProperty("__component")) {
            delete payload.id;
        }
        Object.values(payload).forEach(prepareToPublish);
    }
    return payload;
}
var getRequestUrl = function (path) {
    return "/".concat(CONTENT_MANAGER_PLUGIN_ID, "/explorer/").concat(path);
};
var getFrontendEntityUrl = function (path, id) {
    return "/admin/plugins/".concat(CONTENT_MANAGER_PLUGIN_ID, "/collectionType/").concat(path, "/create/clone/").concat(id);
};
var getPreviewPluginTrad = function (id) { return "preview-content.".concat(id); };
exports.PreviewProvider.propTypes = {
    children: prop_types_1.default.node.isRequired,
    canUpdate: prop_types_1.default.bool.isRequired,
    canCreate: prop_types_1.default.bool.isRequired,
    initialData: prop_types_1.default.object.isRequired,
    isCreatingEntry: prop_types_1.default.bool.isRequired,
    layout: prop_types_1.default.object.isRequired,
    modifiedData: prop_types_1.default.object.isRequired,
    slug: prop_types_1.default.string.isRequired,
    getPreviewUrlParams: prop_types_1.default.func,
};
//# sourceMappingURL=index.js.map