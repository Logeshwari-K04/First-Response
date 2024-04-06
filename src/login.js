const googleAuthLink = document.getElementById('google-auth-link');

googleAuthLink.addEventListener('click', event => {
  event.preventDefault();
  const clientId = '578381693616-h67bvgd6lu0bm4hmq6q5nli3j75thjbh.apps.googleusercontent.com';
  const redirectUri = 'http://127.0.0.1:5500/webapp/home.html';
  const scope = 'email';
  const responseType = 'code';
  const state = 'STATE_VALUE';
  const authUri = `https://accounts.google.com/o/oauth2/v2/auth?
    client_id=${clientId} &
    response_type=${responseType} &
    scope=${scope} &
    redirect_uri=${redirectUri}&
    state=${state}`;

  // Open the Google authentication page in a new window
  window.open(authUri, 'google-auth', 'width=500,height=600');
});