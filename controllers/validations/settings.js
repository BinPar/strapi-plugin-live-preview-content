"use strict";
var _a = require("strapi-utils"), yup = _a.yup, formatYupErrors = _a.formatYupErrors;
var settingsSchema = yup.object({
    previewUrl: yup.string().required(),
});
var validateSettings = function (data) {
    return settingsSchema
        .validate(data, {
        abortEarly: false,
    })
        .catch(function (error) {
        // @ts-ignore
        throw strapi.errors.badRequest("ValidationError", {
            errors: formatYupErrors(error),
        });
    });
};
module.exports = validateSettings;
//# sourceMappingURL=settings.js.map