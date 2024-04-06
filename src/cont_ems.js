const firebaseConfig = {
    apiKey: "",
    authDomain: "flash-ascent-413807.firebaseapp.com",
    projectId: "flash-ascent-413807",
    storageBucket: "flash-ascent-413807.appspot.com",
    messagingSenderId: "578381693616",
    appId: "1:578381693616:web:7aa9fbcfb02a852ebf3175",
    measurementId: "G-PH2PS2KCRR"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  const districtSelect = document.getElementById('dist-sel');
  const findHospitalsBtn = document.getElementById('find-hosps');
  const hospitalsList = document.getElementById('hospitals-list');
  const loadingMore = document.getElementById('loading-more');
  
  let lastVisibleDoc = null; 

  db.collection('hospitals')
  .get()
  .then(querySnapshot => {
    const uniqueDistricts = [...new Set(querySnapshot.docs.map(doc => doc.data().district))];
    uniqueDistricts.sort();

    
    uniqueDistricts.forEach(district => {
      const option = document.createElement('option');
      option.value = district;
      option.textContent = district;
      districtSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching districts:', error);
    alert('An error occurred while loading districts.');
  });
  
  findHospitalsBtn.addEventListener('click', async () => {
    const district = districtSelect.value;
    if (!district) {
      alert('Please select a district!');
      return;
    }
  
    try {
      const initialhospitalsQuery = db.collection('hospitals')
      .where('district', '==', district)
      .limit(5);
      
      const querySnapshot = await initialhospitalsQuery.get();
  
      hospitalsList.innerHTML = '';
  
      if (querySnapshot.empty) {
        hospitalsList.textContent = 'No hospitals found in this district.';
      } else {
        lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        querySnapshot.forEach(doc => {
          const hospital = doc.data();
          const hospitalItem = document.createElement('div');
          hospitalItem.classList.add('hospital-item');
          hospitalItem.innerHTML = `
            <h3>${hospital.name}</h3>
            <p>Address: ${hospital.address}</p>
            <p>Area: ${hospital.area}</p>
            <p>Phone: ${hospital.phone}</p>
          `;
          hospitalsList.appendChild(hospitalItem);
        });

        if (querySnapshot.docs.length === 5) {
          loadingMore.style.display = 'block';
        } else {
          loadingMore.style.display = 'none';
        }
      }
      window.addEventListener('scroll', handleScroll)
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      alert('An error occurred. Please try again later.');
    }
  });

  function handleScroll() {
    const scrollY = window.scrollY;
    const bodyHeight = document.body.offsetHeight;
    const windowHeight = window.innerHeight;
  
    if (scrollY + windowHeight >= bodyHeight - 50) {
      loadMoreHospitals();
    }
  }
  
  async function loadMoreHospitals() {
    if (!lastVisibleDoc) return; 
  
    loadingMore.style.display = 'block';
  
    const nextHospitalsQuery = db.collection('hospitals')
      .where('district', '==', district)
      .startAfter(lastVisibleDoc) 
      .limit(5); 

    try{
      const nextQuerySnapshot = await nextHospitalsQuery.get();
  
    if (nextQuerySnapshot.empty) {
      loadingMore.style.display = 'none'; 
    } else {
      lastVisibleDoc = nextQuerySnapshot.docs[nextQuerySnapshot.docs.length - 1]; 
      nextQuerySnapshot.forEach(doc => {
        const hospital = doc.data();
        const hospitalItem = document.createElement('div');
        hospitalItem.classList.add('hospital-item');
        hospitalItem.innerHTML = `
          <h3>${hospital.name}</h3>
          <p>Address: ${hospital.address}</p>
          <p>Area: ${hospital.area}</p>
          <p>Phone: ${hospital.phone}</p>
        `;
        hospitalsList.appendChild(hospitalItem);
      });

      if (nextQuerySnapshot.docs.length < 5) {
        loadingMore.style.display = 'none'; 
      }
    }
  } catch(error){
    console.error('Error fetching more hospitals:', error);
    alert('An error occurred while loading more hospitals.');
  }
}
