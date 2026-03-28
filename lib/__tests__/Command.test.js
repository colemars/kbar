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
var __1 = require("..");
var utils_1 = require("../utils");
var Command_1 = require("../action/Command");
var HistoryImpl_1 = require("../action/HistoryImpl");
var negate = jest.fn();
var perform = jest.fn().mockReturnValue(negate);
var baseAction = (0, utils_1.createAction)({
    name: "Test action",
    perform: perform,
});
var anotherAction = (0, utils_1.createAction)({
    name: "Test action 2",
    perform: perform,
});
var store = {};
describe("Command", function () {
    var actionImpl;
    var actionImpl2;
    beforeEach(function () {
        var _a;
        _a = [baseAction, anotherAction].map(function (action) {
            return __1.ActionImpl.create((0, utils_1.createAction)(action), {
                store: store,
                history: HistoryImpl_1.history,
            });
        }), actionImpl = _a[0], actionImpl2 = _a[1];
    });
    it("should create an instance of Command", function () {
        expect(actionImpl.command instanceof Command_1.Command).toBe(true);
        expect(actionImpl2.command instanceof Command_1.Command).toBe(true);
    });
    describe("History", function () {
        afterEach(function () {
            HistoryImpl_1.history.reset();
        });
        it("should properly interface with History", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        expect(HistoryImpl_1.history.undoStack.length).toEqual(0);
                        return [4 /*yield*/, ((_a = actionImpl.command) === null || _a === void 0 ? void 0 : _a.perform())];
                    case 1:
                        _k.sent();
                        expect(HistoryImpl_1.history.undoStack.length).toEqual(1);
                        (_c = (_b = actionImpl.command) === null || _b === void 0 ? void 0 : _b.history) === null || _c === void 0 ? void 0 : _c.undo();
                        (_e = (_d = actionImpl.command) === null || _d === void 0 ? void 0 : _d.history) === null || _e === void 0 ? void 0 : _e.undo();
                        (_g = (_f = actionImpl.command) === null || _f === void 0 ? void 0 : _f.history) === null || _g === void 0 ? void 0 : _g.undo();
                        (_j = (_h = actionImpl.command) === null || _h === void 0 ? void 0 : _h.history) === null || _j === void 0 ? void 0 : _j.undo();
                        expect(HistoryImpl_1.history.undoStack.length).toEqual(0);
                        expect(HistoryImpl_1.history.redoStack.length).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should only register a single history record for each action", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, ((_a = actionImpl.command) === null || _a === void 0 ? void 0 : _a.perform())];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, ((_b = actionImpl.command) === null || _b === void 0 ? void 0 : _b.perform())];
                    case 2:
                        _e.sent();
                        return [4 /*yield*/, ((_c = actionImpl2.command) === null || _c === void 0 ? void 0 : _c.perform())];
                    case 3:
                        _e.sent();
                        return [4 /*yield*/, ((_d = actionImpl2.command) === null || _d === void 0 ? void 0 : _d.perform())];
                    case 4:
                        _e.sent();
                        expect(HistoryImpl_1.history.undoStack.length).toEqual(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should undo/redo specific actions, not just at the top of the history stack", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        expect(HistoryImpl_1.history.undoStack.length).toEqual(0);
                        return [4 /*yield*/, ((_a = actionImpl.command) === null || _a === void 0 ? void 0 : _a.perform())];
                    case 1:
                        _g.sent();
                        return [4 /*yield*/, ((_b = actionImpl2.command) === null || _b === void 0 ? void 0 : _b.perform())];
                    case 2:
                        _g.sent();
                        (_d = (_c = actionImpl.command) === null || _c === void 0 ? void 0 : _c.history) === null || _d === void 0 ? void 0 : _d.undo();
                        // @ts-ignore historyItem is private, but using for purposes of testing equality
                        expect(HistoryImpl_1.history.undoStack[0]).toEqual((_e = actionImpl2.command) === null || _e === void 0 ? void 0 : _e.historyItem);
                        // @ts-ignore
                        expect(HistoryImpl_1.history.redoStack[0]).toEqual((_f = actionImpl.command) === null || _f === void 0 ? void 0 : _f.historyItem);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should place redo actions back in the undo stack if action was re-perform", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, ((_a = actionImpl.command) === null || _a === void 0 ? void 0 : _a.perform())];
                    case 1:
                        _f.sent();
                        (_c = (_b = actionImpl.command) === null || _b === void 0 ? void 0 : _b.history) === null || _c === void 0 ? void 0 : _c.undo();
                        expect(HistoryImpl_1.history.undoStack.length).toEqual(0);
                        (_e = (_d = actionImpl.command) === null || _d === void 0 ? void 0 : _d.history) === null || _e === void 0 ? void 0 : _e.redo();
                        expect(HistoryImpl_1.history.undoStack.length).toEqual(1);
                        expect(HistoryImpl_1.history.redoStack.length).toEqual(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should await async commands before registering history", function () { return __awaiter(void 0, void 0, void 0, function () {
            var asyncNegate, asyncPerform, asyncAction, pending;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        asyncNegate = jest.fn();
                        asyncPerform = jest.fn().mockResolvedValue(asyncNegate);
                        asyncAction = __1.ActionImpl.create((0, utils_1.createAction)({
                            name: "Async action",
                            perform: asyncPerform,
                        }), {
                            store: store,
                            history: HistoryImpl_1.history,
                        });
                        pending = (_a = asyncAction.command) === null || _a === void 0 ? void 0 : _a.perform();
                        expect(HistoryImpl_1.history.undoStack.length).toEqual(0);
                        return [4 /*yield*/, pending];
                    case 1:
                        _b.sent();
                        expect(asyncPerform).toHaveBeenCalledTimes(1);
                        expect(HistoryImpl_1.history.undoStack.length).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
