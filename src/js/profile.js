const value = document.cookie.split(';')
const newValue = value[0].split('=');
const token = newValue[1];
const profileImage = document.getElementById('profileImage');
const profileName = document.getElementById('profileName');
const profileButton = document.getElementById('profileButton');

const displayProfile = (data) => {
    const {first_name, last_name, profile_pic} = data;
    if (profile_pic){
    profileImage.style.backgroundImage = `url("${profile_pic}")`;
    profileName.innerText = `${first_name} ${last_name}`;
    }
    else{
    const profile = ".././img/anonymous.jpg"  
    profileImage.style.backgroundImage = `url("${profile}")`;  
    profileName.innerText = `${first_name} ${last_name}`;
    }
};

let imageUrl; 
const myWidget = cloudinary.createUploadWidget({
  cloudName: 'dpsfuzuin', 
  uploadPreset: 'kngcj4s1'}, (error, result) => { 
    if (!error && result && result.event === "success") { 
      imageUrl =  result.info.url;
      const profile = {
        image: imageUrl,
      };
        fetch(`https://mosinmiloluwa-app.herokuapp.com/api/v2/auth/users/upload`,{
            method: 'PATCH',
            headers: new Headers({
              'content-type': 'application/json',
              'Authorization': token,
            }),
            body: JSON.stringify(profile)
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            window.location.href = '../html/profile.html';
          }).catch(err => err.message);
    }
  },
);


const uploadImage = () => {
    myWidget.open();
    }


window.onload = () => {
    fetch(`https://mosinmiloluwa-app.herokuapp.com/api/v2/auth/users/profile`,{
        method: 'GET',
        headers: new Headers({
          'content-type': 'application/json',
          'Authorization': token,
        })
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        displayProfile(data.data);
      }).catch(err => err.message);
}


profileButton.addEventListener('click', uploadImage, false);
  