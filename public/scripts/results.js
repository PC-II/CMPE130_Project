/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/results.js":
/*!************************!*\
  !*** ./src/results.js ***!
  \************************/
/***/ (() => {

eval("// On page load, populate the content from sessionStorage\r\nwindow.onload = function () {\r\n  const aiResponse = sessionStorage.getItem(\"ai-response\");\r\n  const userInput = sessionStorage.getItem(\"user-input\");\r\n\r\n  const imageBase64 = sessionStorage.getItem(\"imageBase64\");\r\n\r\n  // // Display the Image\r\n  const imageElem = document.querySelector('.image-upload');\r\n  imageElem.src = `data:image/png;base64,${imageBase64}`;\r\n\r\n  // Display the AI response\r\n  const aiResponseElement = document.getElementById(\"aiResponse\");\r\n  if (aiResponse) {\r\n    aiResponseElement.innerHTML = aiResponse;\r\n  } else {\r\n    aiResponseElement.innerHTML = \"No AI response received. Please try again.\";\r\n  }\r\n\r\n  // Display the user input\r\n  const userInputElement = document.getElementById(\"userInputContent\");\r\n  if (userInput) {\r\n    userInputElement.innerHTML = userInput;\r\n  } else {\r\n    userInputElement.innerHTML = \"Here's the AI summary.\";\r\n  }\r\n\r\n  // Add event listener to \"Check Another Image\" button\r\n  const checkAnotherButton = document.getElementById(\"checkAnother\");\r\n  checkAnotherButton.addEventListener(\"click\", function () {\r\n    window.location.href = \"questions.html\";\r\n  });\r\n};\n\n//# sourceURL=webpack://cmpe130_project/./src/results.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/results.js"]();
/******/ 	
/******/ })()
;