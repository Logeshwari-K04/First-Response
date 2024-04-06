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

/***/ "./src/cont_ems.js":
/*!*************************!*\
  !*** ./src/cont_ems.js ***!
  \*************************/
/***/ (() => {

eval("const firebaseConfig = {\r\n    apiKey: \"AIzaSyANrbJ2Y1MnBg_ijUHJy_KxONjDNwBsCr4\",\r\n    authDomain: \"flash-ascent-413807.firebaseapp.com\",\r\n    projectId: \"flash-ascent-413807\",\r\n    storageBucket: \"flash-ascent-413807.appspot.com\",\r\n    messagingSenderId: \"578381693616\",\r\n    appId: \"1:578381693616:web:7aa9fbcfb02a852ebf3175\",\r\n    measurementId: \"G-PH2PS2KCRR\"\r\n  };\r\n  \r\n  firebase.initializeApp(firebaseConfig);\r\n  const db = firebase.firestore();\r\n  \r\n  const districtSelect = document.getElementById('dist-sel');\r\n  const findHospitalsBtn = document.getElementById('find-hosps');\r\n  const hospitalsList = document.getElementById('hospitals-list');\r\n  const loadingMore = document.getElementById('loading-more');\r\n  \r\n  let lastVisibleDoc = null; \r\n\r\n  db.collection('hospitals')\r\n  .get()\r\n  .then(querySnapshot => {\r\n    const uniqueDistricts = [...new Set(querySnapshot.docs.map(doc => doc.data().district))];\r\n    uniqueDistricts.sort();\r\n\r\n    \r\n    uniqueDistricts.forEach(district => {\r\n      const option = document.createElement('option');\r\n      option.value = district;\r\n      option.textContent = district;\r\n      districtSelect.appendChild(option);\r\n    });\r\n  })\r\n  .catch(error => {\r\n    console.error('Error fetching districts:', error);\r\n    alert('An error occurred while loading districts.');\r\n  });\r\n  \r\n  findHospitalsBtn.addEventListener('click', async () => {\r\n    const district = districtSelect.value;\r\n    if (!district) {\r\n      alert('Please select a district!');\r\n      return;\r\n    }\r\n  \r\n    try {\r\n      const initialhospitalsQuery = db.collection('hospitals')\r\n      .where('district', '==', district)\r\n      .limit(5);\r\n      \r\n      const querySnapshot = await initialhospitalsQuery.get();\r\n  \r\n      hospitalsList.innerHTML = '';\r\n  \r\n      if (querySnapshot.empty) {\r\n        hospitalsList.textContent = 'No hospitals found in this district.';\r\n      } else {\r\n        lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];\r\n        querySnapshot.forEach(doc => {\r\n          const hospital = doc.data();\r\n          const hospitalItem = document.createElement('div');\r\n          hospitalItem.classList.add('hospital-item');\r\n          hospitalItem.innerHTML = `\r\n            <h3>${hospital.name}</h3>\r\n            <p>Address: ${hospital.address}</p>\r\n            <p>Area: ${hospital.area}</p>\r\n            <p>Phone: ${hospital.phone}</p>\r\n          `;\r\n          hospitalsList.appendChild(hospitalItem);\r\n        });\r\n\r\n        if (querySnapshot.docs.length === 5) {\r\n          loadingMore.style.display = 'block';\r\n        } else {\r\n          loadingMore.style.display = 'none';\r\n        }\r\n      }\r\n      window.addEventListener('scroll', handleScroll)\r\n    } catch (error) {\r\n      console.error('Error fetching hospitals:', error);\r\n      alert('An error occurred. Please try again later.');\r\n    }\r\n  });\r\n\r\n  function handleScroll() {\r\n    const scrollY = window.scrollY;\r\n    const bodyHeight = document.body.offsetHeight;\r\n    const windowHeight = window.innerHeight;\r\n  \r\n    if (scrollY + windowHeight >= bodyHeight - 50) {\r\n      loadMoreHospitals();\r\n    }\r\n  }\r\n  \r\n  async function loadMoreHospitals() {\r\n    if (!lastVisibleDoc) return; \r\n  \r\n    loadingMore.style.display = 'block';\r\n  \r\n    const nextHospitalsQuery = db.collection('hospitals')\r\n      .where('district', '==', district)\r\n      .startAfter(lastVisibleDoc) \r\n      .limit(5); \r\n\r\n    try{\r\n      const nextQuerySnapshot = await nextHospitalsQuery.get();\r\n  \r\n    if (nextQuerySnapshot.empty) {\r\n      loadingMore.style.display = 'none'; \r\n    } else {\r\n      lastVisibleDoc = nextQuerySnapshot.docs[nextQuerySnapshot.docs.length - 1]; \r\n      nextQuerySnapshot.forEach(doc => {\r\n        const hospital = doc.data();\r\n        const hospitalItem = document.createElement('div');\r\n        hospitalItem.classList.add('hospital-item');\r\n        hospitalItem.innerHTML = `\r\n          <h3>${hospital.name}</h3>\r\n          <p>Address: ${hospital.address}</p>\r\n          <p>Area: ${hospital.area}</p>\r\n          <p>Phone: ${hospital.phone}</p>\r\n        `;\r\n        hospitalsList.appendChild(hospitalItem);\r\n      });\r\n\r\n      if (nextQuerySnapshot.docs.length < 5) {\r\n        loadingMore.style.display = 'none'; \r\n      }\r\n    }\r\n  } catch(error){\r\n    console.error('Error fetching more hospitals:', error);\r\n    alert('An error occurred while loading more hospitals.');\r\n  }\r\n}\n\n//# sourceURL=webpack://webapp/./src/cont_ems.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/cont_ems.js"]();
/******/ 	
/******/ })()
;