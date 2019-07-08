let email = prompt('Type your email please', '');

const minEmailLength = 6,
      minPasswordLength = 5;

if (email === '' || email === null) {
  alert('Canceled');
} else {
  if (email.length < minEmailLength) {
    alert('I don\'t know any emails having name length less than 6 symbols');
  } else {
    if (email === 'user@gmail.com' || email === 'admin@gmail.com') {
      let password = prompt('Type your password please', '');
          
          if (password === '' || password === null) {
            alert('Canceled');
          } else {
            if (email === 'user@gmail.com' && password === 'UserPass' || email === 'admin@gmail.com' && password === 'AdminPass') {
              let ask = confirm('Do you want to change your password?');
                  
                  if (ask === null) {
                    alert('You have failed the change.');
                  } else {
                    let password = prompt('Please write the old password', '');
                    
                        if (password === '' || password === null) {
                          alert('Canceled');
                        } else {
                          if (email === 'user@gmail.com' && password === 'UserPass' || email === 'admin@gmail.com' && password === 'AdminPass') {
                            let password = prompt('Please write the new password', '');
                                
                                if (password.length < minPasswordLength) {
                                  alert('It’s too short password. Sorry.');
                                } else {
                                  let newPassword = prompt('Please write the new password again', '');
                                      
                                      if (newPassword === password) {
                                        alert('You have successfully changed your password.');
                                      } else {
                                        alert('You wrote the wrong password.');
                                      }
                                }
                          }
                        }
                  }
            } else {
              alert('Wrong password');
            }
          }
    } else {
      alert('I don’t know you');
    }
  }
}

