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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KBarResults = void 0;
var React = __importStar(require("react"));
var react_virtual_1 = require("react-virtual");
var KBarSearch_1 = require("./KBarSearch");
var useKBar_1 = require("./useKBar");
var utils_1 = require("./utils");
var START_INDEX = 0;
var KBarResults = function (props) {
    var activeRef = React.useRef(null);
    var parentRef = React.useRef(null);
    // store a ref to all items so we do not have to pass
    // them as a dependency when setting up event listeners.
    var itemsRef = React.useRef(props.items);
    itemsRef.current = props.items;
    var rowVirtualizer = (0, react_virtual_1.useVirtual)({
        size: itemsRef.current.length,
        parentRef: parentRef,
    });
    var _a = (0, useKBar_1.useKBar)(function (state) { return ({
        search: state.searchQuery,
        currentRootActionId: state.currentRootActionId,
        activeIndex: state.activeIndex,
    }); }), query = _a.query, search = _a.search, currentRootActionId = _a.currentRootActionId, activeIndex = _a.activeIndex, options = _a.options;
    React.useEffect(function () {
        var handler = function (event) {
            var _a;
            if (event.isComposing) {
                return;
            }
            if (event.key === "ArrowUp" || (event.ctrlKey && event.key === "p")) {
                event.preventDefault();
                event.stopPropagation();
                query.setActiveIndex(function (index) {
                    var nextIndex = index > START_INDEX ? index - 1 : index;
                    // avoid setting active index on a group
                    if (typeof itemsRef.current[nextIndex] === "string") {
                        if (nextIndex === 0)
                            return index;
                        nextIndex -= 1;
                    }
                    return nextIndex;
                });
            }
            else if (event.key === "ArrowDown" ||
                (event.ctrlKey && event.key === "n")) {
                event.preventDefault();
                event.stopPropagation();
                query.setActiveIndex(function (index) {
                    var nextIndex = index < itemsRef.current.length - 1 ? index + 1 : index;
                    // avoid setting active index on a group
                    if (typeof itemsRef.current[nextIndex] === "string") {
                        if (nextIndex === itemsRef.current.length - 1)
                            return index;
                        nextIndex += 1;
                    }
                    return nextIndex;
                });
            }
            else if (event.key === "Enter") {
                event.preventDefault();
                event.stopPropagation();
                // storing the active dom element in a ref prevents us from
                // having to calculate the current action to perform based
                // on the `activeIndex`, which we would have needed to add
                // as part of the dependencies array.
                (_a = activeRef.current) === null || _a === void 0 ? void 0 : _a.click();
            }
        };
        window.addEventListener("keydown", handler, { capture: true });
        return function () {
            return window.removeEventListener("keydown", handler, { capture: true });
        };
    }, [query]);
    // destructuring here to prevent linter warning to pass
    // entire rowVirtualizer in the dependencies array.
    var scrollToIndex = rowVirtualizer.scrollToIndex;
    React.useEffect(function () {
        scrollToIndex(activeIndex, {
            // ensure that if the first item in the list is a group
            // name and we are focused on the second item, to not
            // scroll past that group, hiding it.
            align: activeIndex <= 1 ? "end" : "auto",
        });
    }, [activeIndex, scrollToIndex]);
    // reset active index only when search or root action changes
    React.useEffect(function () {
        query.setActiveIndex(
        // avoid setting active index on a group
        typeof itemsRef.current[START_INDEX] === "string"
            ? START_INDEX + 1
            : START_INDEX);
    }, [search, currentRootActionId, query]);
    // adjust active index when items change (ie when actions load async)
    React.useEffect(function () {
        var currentIndex = activeIndex;
        var maxIndex = itemsRef.current.length - 1;
        if (currentIndex > maxIndex && maxIndex >= 0) {
            var newIndex = maxIndex;
            if (typeof itemsRef.current[newIndex] === "string" && newIndex > 0) {
                newIndex -= 1;
            }
            query.setActiveIndex(newIndex);
        }
        else if (currentIndex <= maxIndex &&
            typeof itemsRef.current[currentIndex] === "string") {
            var newIndex = currentIndex + 1;
            if (newIndex > maxIndex ||
                typeof itemsRef.current[newIndex] === "string") {
                newIndex = currentIndex - 1;
            }
            if (newIndex >= 0 &&
                newIndex <= maxIndex &&
                typeof itemsRef.current[newIndex] !== "string") {
                query.setActiveIndex(newIndex);
            }
        }
    }, [props.items, activeIndex, query]);
    var execute = React.useCallback(function (item) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (typeof item === "string")
                        return [2 /*return*/];
                    if (!item.command) return [3 /*break*/, 2];
                    return [4 /*yield*/, item.command.perform(item)];
                case 1:
                    _c.sent();
                    query.toggle();
                    return [3 /*break*/, 3];
                case 2:
                    query.setSearch("");
                    query.setCurrentRootAction(item.id);
                    _c.label = 3;
                case 3:
                    (_b = (_a = options.callbacks) === null || _a === void 0 ? void 0 : _a.onSelectAction) === null || _b === void 0 ? void 0 : _b.call(_a, item);
                    return [2 /*return*/];
            }
        });
    }); }, [query, options]);
    var pointerMoved = (0, utils_1.usePointerMovedSinceMount)();
    return (React.createElement("div", { ref: parentRef, style: {
            maxHeight: props.maxHeight || 400,
            position: "relative",
            overflow: "auto",
        } },
        React.createElement("div", { role: "listbox", id: KBarSearch_1.KBAR_LISTBOX, style: {
                height: rowVirtualizer.totalSize + "px",
                width: "100%",
            } }, rowVirtualizer.virtualItems.map(function (virtualRow) {
            var item = itemsRef.current[virtualRow.index];
            var handlers = typeof item !== "string" && {
                onPointerMove: function () {
                    return pointerMoved &&
                        activeIndex !== virtualRow.index &&
                        query.setActiveIndex(virtualRow.index);
                },
                onPointerDown: function () { return query.setActiveIndex(virtualRow.index); },
                onClick: function () { return execute(item); },
            };
            var active = virtualRow.index === activeIndex;
            return (React.createElement("div", __assign({ ref: active ? activeRef : null, id: (0, KBarSearch_1.getListboxItemId)(virtualRow.index), className: "kbar-listbox-item", role: "option", "aria-selected": active, key: virtualRow.index, style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: "translateY(" + virtualRow.start + "px)",
                } }, handlers), React.cloneElement(props.onRender({
                item: item,
                active: active,
            }), {
                ref: virtualRow.measureRef,
            })));
        }))));
};
exports.KBarResults = KBarResults;
