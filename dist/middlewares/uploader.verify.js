"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploaderVerify = void 0;
const uploaderVerify = (req, res, next) => {
    var _a, _b;
    try {
        if (!Array.isArray(req === null || req === void 0 ? void 0 : req.files) && !((_b = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.images) === null || _b === void 0 ? void 0 : _b.length))
            throw { msg: 'No File Uploaded' };
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.uploaderVerify = uploaderVerify;
