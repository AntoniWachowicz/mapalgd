"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "(api)/./src/pages/api/auth/[...nextauth].js":
/*!*********************************************!*\
  !*** ./src/pages/api/auth/[...nextauth].js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n// For demo purposes, we're using a simple in-memory user\n// In a real app, this would come from MongoDB\nconst users = [\n    {\n        id: \"1\",\n        name: \"Admin User\",\n        email: process.env.ADMIN_EMAIL || \"admin@example.com\",\n        // This should be hashed in a real application\n        password: process.env.ADMIN_PASSWORD || \"password123\"\n    }\n];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    providers: [\n        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default()({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                // Find user by email\n                const user = users.find((user)=>user.email === credentials.email);\n                if (!user) {\n                    throw new Error(\"No user found with this email\");\n                }\n                // In a real app, you would hash the password and compare\n                // const isValid = await bcrypt.compare(credentials.password, user.password);\n                // For demo, we just do a simple comparison\n                const isValid = credentials.password === user.password;\n                if (!isValid) {\n                    throw new Error(\"Invalid password\");\n                }\n                return {\n                    id: user.id,\n                    name: user.name,\n                    email: user.email\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/\",\n        error: \"/\"\n    },\n    secret: process.env.NEXTAUTH_SECRET || \"your-secret-key-here\"\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWlDO0FBQ2lDO0FBQ3BDO0FBRTlCLHlEQUF5RDtBQUN6RCw4Q0FBOEM7QUFDOUMsTUFBTUcsUUFBUTtJQUNaO1FBQ0VDLElBQUk7UUFDSkMsTUFBTTtRQUNOQyxPQUFPQyxRQUFRQyxHQUFHLENBQUNDLFdBQVcsSUFBSTtRQUNsQyw4Q0FBOEM7UUFDOUNDLFVBQVVILFFBQVFDLEdBQUcsQ0FBQ0csY0FBYyxJQUFJO0lBQzFDO0NBQ0Q7QUFFRCxpRUFBZVgsZ0RBQVFBLENBQUM7SUFDdEJZLFdBQVc7UUFDVFgsc0VBQW1CQSxDQUFDO1lBQ2xCSSxNQUFNO1lBQ05RLGFBQWE7Z0JBQ1hQLE9BQU87b0JBQUVRLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDTCxVQUFVO29CQUFFSSxPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUMsV0FBVUgsV0FBVztnQkFDekIscUJBQXFCO2dCQUNyQixNQUFNSSxPQUFPZCxNQUFNZSxJQUFJLENBQUNELENBQUFBLE9BQVFBLEtBQUtYLEtBQUssS0FBS08sWUFBWVAsS0FBSztnQkFFaEUsSUFBSSxDQUFDVyxNQUFNO29CQUNULE1BQU0sSUFBSUUsTUFBTTtnQkFDbEI7Z0JBRUEseURBQXlEO2dCQUN6RCw2RUFBNkU7Z0JBRTdFLDJDQUEyQztnQkFDM0MsTUFBTUMsVUFBVVAsWUFBWUgsUUFBUSxLQUFLTyxLQUFLUCxRQUFRO2dCQUV0RCxJQUFJLENBQUNVLFNBQVM7b0JBQ1osTUFBTSxJQUFJRCxNQUFNO2dCQUNsQjtnQkFFQSxPQUFPO29CQUNMZixJQUFJYSxLQUFLYixFQUFFO29CQUNYQyxNQUFNWSxLQUFLWixJQUFJO29CQUNmQyxPQUFPVyxLQUFLWCxLQUFLO2dCQUNuQjtZQUNGO1FBQ0Y7S0FDRDtJQUNEZSxTQUFTO1FBQ1BDLFVBQVU7UUFDVkMsUUFBUSxLQUFLLEtBQUssS0FBSztJQUN6QjtJQUNBQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVULElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSUyxNQUFNdEIsRUFBRSxHQUFHYSxLQUFLYixFQUFFO1lBQ3BCO1lBQ0EsT0FBT3NCO1FBQ1Q7UUFDQSxNQUFNTCxTQUFRLEVBQUVBLE9BQU8sRUFBRUssS0FBSyxFQUFFO1lBQzlCLElBQUlBLE9BQU87Z0JBQ1RMLFFBQVFKLElBQUksQ0FBQ2IsRUFBRSxHQUFHc0IsTUFBTXRCLEVBQUU7WUFDNUI7WUFDQSxPQUFPaUI7UUFDVDtJQUNGO0lBQ0FNLE9BQU87UUFDTEMsUUFBUTtRQUNSQyxPQUFPO0lBQ1Q7SUFDQUMsUUFBUXZCLFFBQVFDLEdBQUcsQ0FBQ3VCLGVBQWUsSUFBSTtBQUN6QyxFQUFFLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXAtcGluLWFwcC8uL3NyYy9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzPzc4YWIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gJ25leHQtYXV0aCc7XG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuXG4vLyBGb3IgZGVtbyBwdXJwb3Nlcywgd2UncmUgdXNpbmcgYSBzaW1wbGUgaW4tbWVtb3J5IHVzZXJcbi8vIEluIGEgcmVhbCBhcHAsIHRoaXMgd291bGQgY29tZSBmcm9tIE1vbmdvREJcbmNvbnN0IHVzZXJzID0gW1xuICB7XG4gICAgaWQ6ICcxJyxcbiAgICBuYW1lOiAnQWRtaW4gVXNlcicsXG4gICAgZW1haWw6IHByb2Nlc3MuZW52LkFETUlOX0VNQUlMIHx8ICdhZG1pbkBleGFtcGxlLmNvbScsXG4gICAgLy8gVGhpcyBzaG91bGQgYmUgaGFzaGVkIGluIGEgcmVhbCBhcHBsaWNhdGlvblxuICAgIHBhc3N3b3JkOiBwcm9jZXNzLmVudi5BRE1JTl9QQVNTV09SRCB8fCAncGFzc3dvcmQxMjMnXG4gIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IE5leHRBdXRoKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiAnQ3JlZGVudGlhbHMnLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9XG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIC8vIEZpbmQgdXNlciBieSBlbWFpbFxuICAgICAgICBjb25zdCB1c2VyID0gdXNlcnMuZmluZCh1c2VyID0+IHVzZXIuZW1haWwgPT09IGNyZWRlbnRpYWxzLmVtYWlsKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gdXNlciBmb3VuZCB3aXRoIHRoaXMgZW1haWwnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gSW4gYSByZWFsIGFwcCwgeW91IHdvdWxkIGhhc2ggdGhlIHBhc3N3b3JkIGFuZCBjb21wYXJlXG4gICAgICAgIC8vIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XG4gICAgICAgIFxuICAgICAgICAvLyBGb3IgZGVtbywgd2UganVzdCBkbyBhIHNpbXBsZSBjb21wYXJpc29uXG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBjcmVkZW50aWFscy5wYXNzd29yZCA9PT0gdXNlci5wYXNzd29yZDtcbiAgICAgICAgXG4gICAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBwYXNzd29yZCcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogJ2p3dCcsXG4gICAgbWF4QWdlOiAzMCAqIDI0ICogNjAgKiA2MCwgLy8gMzAgZGF5c1xuICB9LFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfVxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogJy8nLCAvLyBXZSB1c2UgYSBjdXN0b20gc2lnbmluIG1vZGFsIGluc3RlYWRcbiAgICBlcnJvcjogJy8nXG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVUIHx8ICd5b3VyLXNlY3JldC1rZXktaGVyZSdcbn0pOyJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJiY3J5cHQiLCJ1c2VycyIsImlkIiwibmFtZSIsImVtYWlsIiwicHJvY2VzcyIsImVudiIsIkFETUlOX0VNQUlMIiwicGFzc3dvcmQiLCJBRE1JTl9QQVNTV09SRCIsInByb3ZpZGVycyIsImNyZWRlbnRpYWxzIiwibGFiZWwiLCJ0eXBlIiwiYXV0aG9yaXplIiwidXNlciIsImZpbmQiLCJFcnJvciIsImlzVmFsaWQiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInBhZ2VzIiwic2lnbkluIiwiZXJyb3IiLCJzZWNyZXQiLCJORVhUQVVUSF9TRUNSRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/auth/[...nextauth].js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/auth/[...nextauth].js"));
module.exports = __webpack_exports__;

})();