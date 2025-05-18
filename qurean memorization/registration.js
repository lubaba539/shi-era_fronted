document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Clear errors
  document.getElementById('username-error').textContent = '';
  document.getElementById('email-error').textContent = '';
  document.getElementById('password-error').textContent = '';

  // Get values
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  let isValid = true;

  if (username.length < 3) {
    isValid = false;
    document.getElementById('username-error').textContent = 'Username must be at least 3 characters.';
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    isValid = false;
    document.getElementById('email-error').textContent = 'Enter a valid email address.';
  }

  if (password.length < 6) {
    isValid = false;
    document.getElementById('password-error').textContent = 'Password must be at least 6 characters.';
  }

  if (isValid) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        return firebase.firestore().collection('users').doc(user.uid).set({
          username: username,
          email: email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .then(() => {
        alert('Registration successful!');
        window.location.href = 'home.html';  // ✅ Redirect here
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  }
});
