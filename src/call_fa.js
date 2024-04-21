import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, doc, getDoc, query, where,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBB6mk4lJ3yQzPmltTFssmfJ_jHWBHzxLY",
    authDomain: "flash-ascent-413807.firebaseapp.com",
    projectId: "flash-ascent-413807",
    storageBucket: "flash-ascent-413807.appspot.com",
    messagingSenderId: "578381693616",
    appId: "1:578381693616:web:7aa9fbcfb02a852ebf3175",
    measurementId: "G-PH2PS2KCRR"
};

initializeApp(firebaseConfig);
const db = getFirestore();


let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { PinElement } = await google.maps.importLibrary(
    "marker",
  );

  const upinstyle = new PinElement({
    background: "#FBBC04",
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      map = new google.maps.Map(document.getElementById("map"), {
        center: pos,
        zoom: 12,
      });

      map.addListener("click", (event) => {
        const clickedLat = event.latLng?.lat();
        const clickedLng = event.latLng?.lng();

        if (clickedLat && clickedLng) {
          const clickedPosition = new google.maps.LatLng(clickedLat, clickedLng);
          map.setCenter(clickedPosition);
        }
      });

      new google.maps.Marker({
        position: pos,
        map: map,
        label: "You",
        content: upinstyle,
      });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

initMap();



async function getDataAndMark() {
  const { PinElement } = await google.maps.importLibrary(
    "marker",
  );

  const pinstyle = new PinElement({
    background: "#FBBC04",
  });

  const docRef = doc(db, 'users', 'user3');
  getDoc(docRef)
    .then((doc) => {
      const location = doc.data();
        new google.maps.Marker({
          position: { lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) },
          map: map,
          label: "FA",
          content: pinstyle.element,
        });
    })
    .catch((error) => {
      console.log("Error getting first aider location: ", error);
    });

}

document.getElementById('needfa').addEventListener('click', getDataAndMark);