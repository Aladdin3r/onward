/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./components/ButtonPrimary/index.js":
/*!*******************************************!*\
  !*** ./components/ButtonPrimary/index.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "./styles/theme.js":
/*!*************************!*\
  !*** ./styles/theme.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/esm/index.mjs\");\n/* harmony import */ var _components_ButtonPrimary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/ButtonPrimary */ \"./components/ButtonPrimary/index.js\");\n/* harmony import */ var _components_ButtonPrimary__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_ButtonPrimary__WEBPACK_IMPORTED_MODULE_0__);\n\n\n\nconst fonts = {\n    ..._chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.theme.fonts,\n    body: \"DM Sans\",\n    heading: \"Plus Jakarta Sans\"\n};\nconst overrides = {\n    ..._chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.theme,\n    fonts,\n    components: {\n        Button: (_components_ButtonPrimary__WEBPACK_IMPORTED_MODULE_0___default())\n    },\n    fontWeights: {\n        normal: 400,\n        medium: 500,\n        bold: 700\n    },\n    fontSizes: {\n        sm: \"20pt\",\n        md: \"24pt\",\n        lg: \"32pt\"\n    },\n    colors: {\n        brand: {\n            blushPink: \"#EA4A7D\",\n            pastelBlue: \"#CBD5FF\",\n            blueberryCreme: \"#EBEFFF\",\n            frostWhite: \"#FAFAFA\",\n            nightBlack: \"#1f1f1f\",\n            platinum: \"#e2e2e2\",\n            confirmationGreen: \"#61CD3D\",\n            imperialRed: \"#EAE84A\",\n            canaryYellow: \"#EAE84A\",\n            oceanBlue: \"#214DDF\"\n        }\n    },\n    styles: {\n        global: {\n            body: {\n                bg: \"frostWhite\"\n            }\n        }\n    }\n};\nconst customTheme = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.extendTheme)(overrides);\n/* harmony default export */ __webpack_exports__[\"default\"] = (customTheme);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdHlsZXMvdGhlbWUuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUErQztBQUNTO0FBQ1Q7QUFFL0MsTUFBTUksUUFBUTtJQUNWLEdBQUdGLG1EQUFXQSxDQUFDRSxLQUFLO0lBQ3BCQyxNQUFNO0lBQ05DLFNBQVM7QUFDYjtBQUVBLE1BQU1DLFlBQVk7SUFDZCxHQUFHTCxtREFBVztJQUNkRTtJQUNBSSxZQUFZO1FBQ1JMLE1BQU1BLG9FQUFBQTtJQUNWO0lBQ0FNLGFBQWE7UUFDVEMsUUFBUTtRQUNSQyxRQUFRO1FBQ1JDLE1BQU07SUFDVjtJQUNBQyxXQUFXO1FBQ1BDLElBQUk7UUFDSkMsSUFBSTtRQUNKQyxJQUFJO0lBQ1I7SUFDQUMsUUFBUTtRQUNMQyxPQUFPO1lBQ05DLFdBQVc7WUFDWEMsWUFBWTtZQUNaQyxnQkFBZ0I7WUFDaEJDLFlBQVk7WUFDWkMsWUFBWTtZQUNaQyxVQUFVO1lBQ1ZDLG1CQUFtQjtZQUNuQkMsYUFBYTtZQUNiQyxjQUFjO1lBQ2RDLFdBQVc7UUFDWDtJQUNKO0lBQ0FDLFFBQVE7UUFDSkMsUUFBUTtZQUNKekIsTUFBTTtnQkFDRjBCLElBQUk7WUFDUjtRQUNKO0lBQ0o7QUFDSjtBQUVBLE1BQU1DLGNBQWNoQyw2REFBV0EsQ0FBQ087QUFFaEMsK0RBQWV5QixXQUFXQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3N0eWxlcy90aGVtZS5qcz82MTc2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4dGVuZFRoZW1lIH0gZnJvbSBcIkBjaGFrcmEtdWkvcmVhY3RcIjtcbmltcG9ydCB7IHRoZW1lIGFzIGNoYWtyYVRoZW1lIH0gZnJvbSBcIkBjaGFrcmEtdWkvcmVhY3RcIjtcbmltcG9ydCBCdXR0b24gZnJvbSAnQC9jb21wb25lbnRzL0J1dHRvblByaW1hcnknXG5cbmNvbnN0IGZvbnRzID0ge1xuICAgIC4uLmNoYWtyYVRoZW1lLmZvbnRzLFxuICAgIGJvZHk6IFwiRE0gU2Fuc1wiLFxuICAgIGhlYWRpbmc6IFwiUGx1cyBKYWthcnRhIFNhbnNcIixcbn1cblxuY29uc3Qgb3ZlcnJpZGVzID0ge1xuICAgIC4uLmNoYWtyYVRoZW1lLFxuICAgIGZvbnRzLFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgQnV0dG9uLFxuICAgIH0sXG4gICAgZm9udFdlaWdodHM6IHtcbiAgICAgICAgbm9ybWFsOiA0MDAsXG4gICAgICAgIG1lZGl1bTogNTAwLFxuICAgICAgICBib2xkOiA3MDAsXG4gICAgfSxcbiAgICBmb250U2l6ZXM6IHtcbiAgICAgICAgc206IFwiMjBwdFwiLFxuICAgICAgICBtZDogXCIyNHB0XCIsXG4gICAgICAgIGxnOiBcIjMycHRcIixcbiAgICB9LFxuICAgIGNvbG9yczoge1xuICAgICAgIGJyYW5kOiB7IFxuICAgICAgICBibHVzaFBpbms6IFwiI0VBNEE3RFwiLFxuICAgICAgICBwYXN0ZWxCbHVlOiBcIiNDQkQ1RkZcIixcbiAgICAgICAgYmx1ZWJlcnJ5Q3JlbWU6IFwiI0VCRUZGRlwiLFxuICAgICAgICBmcm9zdFdoaXRlOiBcIiNGQUZBRkFcIixcbiAgICAgICAgbmlnaHRCbGFjazogXCIjMWYxZjFmXCIsXG4gICAgICAgIHBsYXRpbnVtOiBcIiNlMmUyZTJcIixcbiAgICAgICAgY29uZmlybWF0aW9uR3JlZW46IFwiIzYxQ0QzRFwiLFxuICAgICAgICBpbXBlcmlhbFJlZDogXCIjRUFFODRBXCIsXG4gICAgICAgIGNhbmFyeVllbGxvdzogXCIjRUFFODRBXCIsXG4gICAgICAgIG9jZWFuQmx1ZTogXCIjMjE0RERGXCIsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHN0eWxlczoge1xuICAgICAgICBnbG9iYWw6IHtcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICBiZzogXCJmcm9zdFdoaXRlXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG59XG5cbmNvbnN0IGN1c3RvbVRoZW1lID0gZXh0ZW5kVGhlbWUob3ZlcnJpZGVzKTtcblxuZXhwb3J0IGRlZmF1bHQgY3VzdG9tVGhlbWU7Il0sIm5hbWVzIjpbImV4dGVuZFRoZW1lIiwidGhlbWUiLCJjaGFrcmFUaGVtZSIsIkJ1dHRvbiIsImZvbnRzIiwiYm9keSIsImhlYWRpbmciLCJvdmVycmlkZXMiLCJjb21wb25lbnRzIiwiZm9udFdlaWdodHMiLCJub3JtYWwiLCJtZWRpdW0iLCJib2xkIiwiZm9udFNpemVzIiwic20iLCJtZCIsImxnIiwiY29sb3JzIiwiYnJhbmQiLCJibHVzaFBpbmsiLCJwYXN0ZWxCbHVlIiwiYmx1ZWJlcnJ5Q3JlbWUiLCJmcm9zdFdoaXRlIiwibmlnaHRCbGFjayIsInBsYXRpbnVtIiwiY29uZmlybWF0aW9uR3JlZW4iLCJpbXBlcmlhbFJlZCIsImNhbmFyeVllbGxvdyIsIm9jZWFuQmx1ZSIsInN0eWxlcyIsImdsb2JhbCIsImJnIiwiY3VzdG9tVGhlbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./styles/theme.js\n"));

/***/ })

});