"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./styles/components/sidenav.js":
/*!**************************************!*\
  !*** ./styles/components/sidenav.js ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SideNavBar: function() { return /* binding */ SideNavBar; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/esm/index.mjs\");\n/* harmony import */ var _phosphor_icons_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @phosphor-icons/react */ \"./node_modules/@phosphor-icons/react/dist/index.mjs\");\n\n\n\n\n\nconst variants = {\n    default: {\n        label: \"Dashboard\",\n        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_phosphor_icons_react__WEBPACK_IMPORTED_MODULE_2__.ChalkboardTeacher, {\n            size: 32\n        }, void 0, false, {\n            fileName: \"/Users/raladdin/Desktop/onward/styles/components/sidenav.js\",\n            lineNumber: 18,\n            columnNumber: 11\n        }, undefined)\n    },\n    variant2: {\n        label: \"Mock Interview\",\n        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_phosphor_icons_react__WEBPACK_IMPORTED_MODULE_2__.UserSound, {\n            size: 32\n        }, void 0, false, {\n            fileName: \"/Users/raladdin/Desktop/onward/styles/components/sidenav.js\",\n            lineNumber: 22,\n            columnNumber: 11\n        }, undefined)\n    },\n    variant3: {\n        label: \"History\",\n        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_phosphor_icons_react__WEBPACK_IMPORTED_MODULE_2__.ClockCounterClockwise, {\n            size: 32\n        }, void 0, false, {\n            fileName: \"/Users/raladdin/Desktop/onward/styles/components/sidenav.js\",\n            lineNumber: 26,\n            columnNumber: 11\n        }, undefined)\n    },\n    variant4: {\n        label: \"History\",\n        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_phosphor_icons_react__WEBPACK_IMPORTED_MODULE_2__.ChalkboardTeacher, {\n            size: 32\n        }, void 0, false, {\n            fileName: \"/Users/raladdin/Desktop/onward/styles/components/sidenav.js\",\n            lineNumber: 30,\n            columnNumber: 11\n        }, undefined)\n    }\n};\nconst SideNavBar = (param)=>{\n    let { property1 } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Box, {\n        bg: \"brand.blueberryCreme\",\n        height: \"1080px\",\n        width: \"275px\",\n        position: \"relative\",\n        p: 4,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.VStack, {\n            align: \"flex-start\",\n            spacing: 6,\n            children: Object.keys(variants).map((variant, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Flex, {\n                    align: \"center\",\n                    position: \"relative\",\n                    cursor: \"pointer\",\n                    width: \"100%\",\n                    _hover: {\n                        bg: \"brand.blushPink\",\n                        color: \"brand.frostWhite\",\n                        transform: \"translateY(-2px)\",\n                        borderRadius: \"md\",\n                        transition: \"background-color 0.3s, transform 0.3s\"\n                    },\n                    bg: property1 === variant ? \"brand.blushPink\" : \"none\",\n                    p: 3,\n                    borderRadius: \"md\" // Rounded corners\n                    ,\n                    children: [\n                        property1 === variant && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                            bg: \"#EA4A7D\" // Blush Pink color\n                            ,\n                            borderRadius: \"26px 0 0 26px\",\n                            height: \"52px\",\n                            width: \"255px\",\n                            position: \"absolute\",\n                            left: \"20px\",\n                            top: \"\".concat(32 + index * 76, \"px\"),\n                            zIndex: 1\n                        }, void 0, false, {\n                            fileName: \"/Users/raladdin/Desktop/onward/styles/components/sidenav.js\",\n                            lineNumber: 63,\n                            columnNumber: 15\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                            position: \"absolute\",\n                            left: \"20px\",\n                            children: variants[variant].icon\n                        }, void 0, false, {\n                            fileName: \"/Users/raladdin/Desktop/onward/styles/components/sidenav.js\",\n                            lineNumber: 74,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Text, {\n                            position: \"absolute\",\n                            left: \"66px\",\n                            fontFamily: \"var(--bold-body-p-font-family)\",\n                            fontSize: \"var(--bold-body-p-font-size)\",\n                            fontWeight: \"var(--bold-body-p-font-weight)\",\n                            top: \"3px\",\n                            children: variants[variant].label\n                        }, void 0, false, {\n                            fileName: \"/Users/raladdin/Desktop/onward/styles/components/sidenav.js\",\n                            lineNumber: 77,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, variant, true, {\n                    fileName: \"/Users/raladdin/Desktop/onward/styles/components/sidenav.js\",\n                    lineNumber: 45,\n                    columnNumber: 11\n                }, undefined))\n        }, void 0, false, {\n            fileName: \"/Users/raladdin/Desktop/onward/styles/components/sidenav.js\",\n            lineNumber: 43,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/raladdin/Desktop/onward/styles/components/sidenav.js\",\n        lineNumber: 36,\n        columnNumber: 5\n    }, undefined);\n};\n_c = SideNavBar;\nSideNavBar.propTypes = {\n    property1: prop_types__WEBPACK_IMPORTED_MODULE_4___default().oneOf([\n        \"variant-4\",\n        \"variant-2\",\n        \"variant-3\",\n        \"default\"\n    ])\n};\nvar _c;\n$RefreshReg$(_c, \"SideNavBar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdHlsZXMvY29tcG9uZW50cy9zaWRlbmF2LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBbUM7QUFDVDtBQU1BO0FBS0s7QUFFL0IsTUFBTVMsV0FBVztJQUNmQyxTQUFTO1FBQ1BDLE9BQU87UUFDUEMsb0JBQU0sOERBQUNOLG9FQUFpQkE7WUFBQ08sTUFBTTs7Ozs7O0lBQ2pDO0lBQ0FDLFVBQVU7UUFDUkgsT0FBTztRQUNQQyxvQkFBTSw4REFBQ0osNERBQVNBO1lBQUNLLE1BQU07Ozs7OztJQUN6QjtJQUNBRSxVQUFVO1FBQ1JKLE9BQU87UUFDUEMsb0JBQU0sOERBQUNMLHdFQUFxQkE7WUFBQ00sTUFBTTs7Ozs7O0lBQ3JDO0lBQ0FHLFVBQVU7UUFDUkwsT0FBTztRQUNQQyxvQkFBTSw4REFBQ04sb0VBQWlCQTtZQUFDTyxNQUFNOzs7Ozs7SUFDakM7QUFDRjtBQUVPLE1BQU1JLGFBQWE7UUFBQyxFQUFFQyxTQUFTLEVBQUU7SUFDdEMscUJBQ0UsOERBQUNoQixpREFBR0E7UUFDRmlCLElBQUc7UUFDSEMsUUFBTztRQUNQQyxPQUFNO1FBQ05DLFVBQVM7UUFDVEMsR0FBRztrQkFFSCw0RUFBQ2xCLG9EQUFNQTtZQUFDbUIsT0FBTTtZQUFhQyxTQUFTO3NCQUNqQ0MsT0FBT0MsSUFBSSxDQUFDbEIsVUFBVW1CLEdBQUcsQ0FBQyxDQUFDQyxTQUFTQyxzQkFDbkMsOERBQUMzQixrREFBSUE7b0JBRUhxQixPQUFNO29CQUNORixVQUFTO29CQUNUUyxRQUFPO29CQUNQVixPQUFNO29CQUNOVyxRQUFRO3dCQUNOYixJQUFJO3dCQUNKYyxPQUFPO3dCQUNQQyxXQUFXO3dCQUNYQyxjQUFjO3dCQUNkQyxZQUFZO29CQUNkO29CQUNBakIsSUFBSUQsY0FBY1csVUFBVSxvQkFBb0I7b0JBQ2hETixHQUFHO29CQUNIWSxjQUFhLEtBQUssa0JBQWtCOzs7d0JBRW5DakIsY0FBY1cseUJBQ2IsOERBQUMzQixpREFBR0E7NEJBQ0ZpQixJQUFHLFVBQVUsbUJBQW1COzs0QkFDaENnQixjQUFhOzRCQUNiZixRQUFPOzRCQUNQQyxPQUFNOzRCQUNOQyxVQUFTOzRCQUNUZSxNQUFLOzRCQUNMQyxLQUFLLEdBQW1CLE9BQWhCLEtBQUtSLFFBQVEsSUFBRzs0QkFDeEJTLFFBQVE7Ozs7OztzQ0FHWiw4REFBQ3JDLGlEQUFHQTs0QkFBQ29CLFVBQVM7NEJBQVdlLE1BQUs7c0NBQzNCNUIsUUFBUSxDQUFDb0IsUUFBUSxDQUFDakIsSUFBSTs7Ozs7O3NDQUV6Qiw4REFBQ1Isa0RBQUlBOzRCQUNIa0IsVUFBUzs0QkFDVGUsTUFBSzs0QkFDTEcsWUFBVzs0QkFDWEMsVUFBUzs0QkFDVEMsWUFBVzs0QkFDWEosS0FBSTtzQ0FFSDdCLFFBQVEsQ0FBQ29CLFFBQVEsQ0FBQ2xCLEtBQUs7Ozs7Ozs7bUJBdkNyQmtCOzs7Ozs7Ozs7Ozs7Ozs7QUE4Q2pCLEVBQUU7S0ExRFdaO0FBNERiQSxXQUFXMEIsU0FBUyxHQUFHO0lBQ3JCekIsV0FBV2xCLHVEQUFlLENBQUM7UUFBQztRQUFhO1FBQWE7UUFBYTtLQUFVO0FBQy9FIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3N0eWxlcy9jb21wb25lbnRzL3NpZGVuYXYuanM/YzE0MyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICBCb3gsXG4gIEZsZXgsXG4gIFRleHQsXG4gIFZTdGFjayxcbn0gZnJvbSBcIkBjaGFrcmEtdWkvcmVhY3RcIjtcbmltcG9ydCB7XG4gIENoYWxrYm9hcmRUZWFjaGVyLFxuICBDbG9ja0NvdW50ZXJDbG9ja3dpc2UsXG4gIFVzZXJTb3VuZCxcbn0gZnJvbSBcIkBwaG9zcGhvci1pY29ucy9yZWFjdFwiO1xuXG5jb25zdCB2YXJpYW50cyA9IHtcbiAgZGVmYXVsdDoge1xuICAgIGxhYmVsOiBcIkRhc2hib2FyZFwiLFxuICAgIGljb246IDxDaGFsa2JvYXJkVGVhY2hlciBzaXplPXszMn0gLz4sXG4gIH0sXG4gIHZhcmlhbnQyOiB7XG4gICAgbGFiZWw6IFwiTW9jayBJbnRlcnZpZXdcIixcbiAgICBpY29uOiA8VXNlclNvdW5kIHNpemU9ezMyfSAvPixcbiAgfSxcbiAgdmFyaWFudDM6IHtcbiAgICBsYWJlbDogXCJIaXN0b3J5XCIsXG4gICAgaWNvbjogPENsb2NrQ291bnRlckNsb2Nrd2lzZSBzaXplPXszMn0gLz4sXG4gIH0sXG4gIHZhcmlhbnQ0OiB7XG4gICAgbGFiZWw6IFwiSGlzdG9yeVwiLFxuICAgIGljb246IDxDaGFsa2JvYXJkVGVhY2hlciBzaXplPXszMn0gLz4sXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgU2lkZU5hdkJhciA9ICh7IHByb3BlcnR5MSB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEJveFxuICAgICAgYmc9XCJicmFuZC5ibHVlYmVycnlDcmVtZVwiXG4gICAgICBoZWlnaHQ9XCIxMDgwcHhcIlxuICAgICAgd2lkdGg9XCIyNzVweFwiXG4gICAgICBwb3NpdGlvbj1cInJlbGF0aXZlXCJcbiAgICAgIHA9ezR9XG4gICAgPlxuICAgICAgPFZTdGFjayBhbGlnbj1cImZsZXgtc3RhcnRcIiBzcGFjaW5nPXs2fT5cbiAgICAgICAge09iamVjdC5rZXlzKHZhcmlhbnRzKS5tYXAoKHZhcmlhbnQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgPEZsZXhcbiAgICAgICAgICAgIGtleT17dmFyaWFudH1cbiAgICAgICAgICAgIGFsaWduPVwiY2VudGVyXCJcbiAgICAgICAgICAgIHBvc2l0aW9uPVwicmVsYXRpdmVcIlxuICAgICAgICAgICAgY3Vyc29yPVwicG9pbnRlclwiXG4gICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICAgICAgX2hvdmVyPXt7XG4gICAgICAgICAgICAgIGJnOiBcImJyYW5kLmJsdXNoUGlua1wiLCAvLyBIb3ZlciBiYWNrZ3JvdW5kXG4gICAgICAgICAgICAgIGNvbG9yOiBcImJyYW5kLmZyb3N0V2hpdGVcIixcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoLTJweClcIixcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIm1kXCIsXG4gICAgICAgICAgICAgIHRyYW5zaXRpb246IFwiYmFja2dyb3VuZC1jb2xvciAwLjNzLCB0cmFuc2Zvcm0gMC4zc1wiLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGJnPXtwcm9wZXJ0eTEgPT09IHZhcmlhbnQgPyBcImJyYW5kLmJsdXNoUGlua1wiIDogXCJub25lXCJ9IC8vIEFjdGl2ZSBzdGF0ZVxuICAgICAgICAgICAgcD17M30gLy8gUGFkZGluZyBmb3IgaG92ZXIgYXJlYVxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwibWRcIiAvLyBSb3VuZGVkIGNvcm5lcnNcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7cHJvcGVydHkxID09PSB2YXJpYW50ICYmIChcbiAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgIGJnPVwiI0VBNEE3RFwiIC8vIEJsdXNoIFBpbmsgY29sb3JcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM9XCIyNnB4IDAgMCAyNnB4XCJcbiAgICAgICAgICAgICAgICBoZWlnaHQ9XCI1MnB4XCJcbiAgICAgICAgICAgICAgICB3aWR0aD1cIjI1NXB4XCJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbj1cImFic29sdXRlXCJcbiAgICAgICAgICAgICAgICBsZWZ0PVwiMjBweFwiXG4gICAgICAgICAgICAgICAgdG9wPXtgJHszMiArIGluZGV4ICogNzZ9cHhgfSAvLyBBZGp1c3QgdG9wIHBvc2l0aW9uIGJhc2VkIG9uIGluZGV4XG4gICAgICAgICAgICAgICAgekluZGV4PXsxfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxCb3ggcG9zaXRpb249XCJhYnNvbHV0ZVwiIGxlZnQ9XCIyMHB4XCI+XG4gICAgICAgICAgICAgIHt2YXJpYW50c1t2YXJpYW50XS5pY29ufVxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8VGV4dFxuICAgICAgICAgICAgICBwb3NpdGlvbj1cImFic29sdXRlXCJcbiAgICAgICAgICAgICAgbGVmdD1cIjY2cHhcIlxuICAgICAgICAgICAgICBmb250RmFtaWx5PVwidmFyKC0tYm9sZC1ib2R5LXAtZm9udC1mYW1pbHkpXCJcbiAgICAgICAgICAgICAgZm9udFNpemU9XCJ2YXIoLS1ib2xkLWJvZHktcC1mb250LXNpemUpXCJcbiAgICAgICAgICAgICAgZm9udFdlaWdodD1cInZhcigtLWJvbGQtYm9keS1wLWZvbnQtd2VpZ2h0KVwiXG4gICAgICAgICAgICAgIHRvcD1cIjNweFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt2YXJpYW50c1t2YXJpYW50XS5sYWJlbH1cbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8L0ZsZXg+XG4gICAgICAgICkpfVxuICAgICAgPC9WU3RhY2s+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5TaWRlTmF2QmFyLnByb3BUeXBlcyA9IHtcbiAgcHJvcGVydHkxOiBQcm9wVHlwZXMub25lT2YoW1widmFyaWFudC00XCIsIFwidmFyaWFudC0yXCIsIFwidmFyaWFudC0zXCIsIFwiZGVmYXVsdFwiXSksXG59O1xuIl0sIm5hbWVzIjpbIlByb3BUeXBlcyIsIlJlYWN0IiwiQm94IiwiRmxleCIsIlRleHQiLCJWU3RhY2siLCJDaGFsa2JvYXJkVGVhY2hlciIsIkNsb2NrQ291bnRlckNsb2Nrd2lzZSIsIlVzZXJTb3VuZCIsInZhcmlhbnRzIiwiZGVmYXVsdCIsImxhYmVsIiwiaWNvbiIsInNpemUiLCJ2YXJpYW50MiIsInZhcmlhbnQzIiwidmFyaWFudDQiLCJTaWRlTmF2QmFyIiwicHJvcGVydHkxIiwiYmciLCJoZWlnaHQiLCJ3aWR0aCIsInBvc2l0aW9uIiwicCIsImFsaWduIiwic3BhY2luZyIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJ2YXJpYW50IiwiaW5kZXgiLCJjdXJzb3IiLCJfaG92ZXIiLCJjb2xvciIsInRyYW5zZm9ybSIsImJvcmRlclJhZGl1cyIsInRyYW5zaXRpb24iLCJsZWZ0IiwidG9wIiwiekluZGV4IiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsInByb3BUeXBlcyIsIm9uZU9mIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./styles/components/sidenav.js\n"));

/***/ })

});