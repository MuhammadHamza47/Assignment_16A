// start for control coding
let registerForm = document.getElementById("registerform");
let allInput = registerForm.querySelectorAll("INPUT");
let addBtn = document.querySelector("#add-btn");
let model = document.querySelector(".model");
let closeBtn = document.querySelector(".close-icon");
addBtn.onclick = function () {
  model.classList.add("active");
  closeBtn.addEventListener("click", () => {
    model.classList.remove("active");
    var i;
    for(i = 0; i < allInput.length; i++){
      allInput[i].value = "";
    }
  });
};

// start all global veriable
let userData = [];
let profile_pic = document.getElementById("profile-pic");
let uploadPic = document.getElementById("upload-field");
var imgUrl;
let idEl = document.getElementById("id");
let nameEl = document.getElementById("name");
let ageEl = document.getElementById("age");
let educationEl = document.getElementById("educate");
let emailEl = document.getElementById("email");
let registerBtn = document.querySelector("#register-btn");
let updateBtn = document.querySelector("#update-btn");
// end all global veriable

// start sign up coding

registerBtn.onclick = function (e) {
  e.preventDefault();
  registrationDate();
  getDataFromlocal();
  registerForm.reset("");
  closeBtn.click();
};
if (localStorage.getItem("userData") != null) {
  userData = JSON.parse(localStorage.getItem("userData"));
}

function registrationDate() {
  userData.push({
    id: idEl.value,
    name: nameEl.value,
    age: ageEl.value,
    education: educationEl.value,
    email: emailEl.value,
    ProfilePic: imgUrl == undefined ? "./download.png" : imgUrl,
  });
  var usreString = JSON.stringify(userData);
  localStorage.setItem("userData", usreString);
  swal("Good job!", "Registration Success!", "success");
}

// start returning data from localStorage

var tableData = document.getElementById("table-data");

const getDataFromlocal = () => {
  tableData.innerHTML = "";
  userData.forEach((data, index) => {
    tableData.innerHTML += `
        <tr index='${index}'>
          <td>${index + 1}</td>
          <td><img src="${data.ProfilePic}" width="40px" height="40px"></td>
          <td>${data.id}</td>
          <td>${data.name}</td>
          <td>${data.age}</td>
          <td>${data.education}</td>
          <td>${data.email}</td>
          <td>
            <button class="update-btn"><i class="fa fa-eye"></i></button>
            <button class="del-btn" style="background-color: #ee534e">
              <i class="fa fa-trash"></i></button>
          </td>
        </tr>
        `;
  });
  //    start deleting button
  var i;
  var allDelBtn = document.querySelectorAll(".del-btn");
  for(i = 0; i < allDelBtn.length ; i++) {
    allDelBtn[i].onclick = function () {
              
      var tr = this.parentElement.parentElement;
      var id = tr.getAttribute("index"); 
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            userData.splice(id, 1);
            localStorage.setItem("userData", JSON.stringify(userData)); 
            tr.remove();

          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    }
  }

  // Start update coding
  var allUpdateBtn  = document.querySelectorAll(".update-btn")
  for(i = 0; i < allUpdateBtn.length; i++){
     allUpdateBtn[i].onclick = function(){
       var tr = this.parentElement.parentElement; 
       var td = tr.getElementsByTagName("TD");
       var index = tr.getAttribute("index");
       var imgTag = td[1].getElementsByTagName("IMG");
       var updateProfilePic = imgTag[0].src;
       var id = td[2].innerHTML;
       var name = td[3].innerHTML;
       var age = td[4].innerHTML;
       var education = td[5].innerHTML;
       var email = td[6].innerHTML; 
       addBtn.click();
       registerBtn.disabled = true;
       updateBtn.disabled = false; 
       idEl.value = id;
       nameEl.value = name;
       ageEl.value = age;
       educationEl.value = education;
       emailEl.value = email;
       profile_pic.src = updateProfilePic;
       updateBtn.onclick = function(e){
        userData[index] ={ 
          id: idEl.value,
    name: nameEl.value,
    age: ageEl.value,
    education: educationEl.value,
    email: emailEl.value,
    ProfilePic: uploadPic == "" ? profile_pic.src : imgUrl,
        }
        localStorage.setItem("userData", JSON.stringify(userData));
       }
        

     }
  }
}
getDataFromlocal();

// img processing


uploadPic.onchange = function () {
  if (uploadPic.files[0].size < 1000000) {
    var fReader = new FileReader();
    fReader.onload = function (e) {
      imgUrl = e.target.result;
      profile_pic.src = imgUrl;
    };
    fReader.readAsDataURL(uploadPic.files[0]);
  } else {
    alert("file size is to long");
  }
};

// start search coding

var searchEl = document.querySelector("#empId");
searchEl.oninput = function(){
  searchFuc();
}

function searchFuc(){
  var tr = tableData.querySelectorAll("TR");
  var filter = searchEl.value.toLowerCase(); 
  var i;
  for(i=0; i<tr.length; i++){
    var id = tr[i].getElementsByTagName("TD")[2].innerHTML;
    var name = tr[i].getElementsByTagName("TD")[3].innerHTML;
    var age = tr[i].getElementsByTagName("TD")[4].innerHTML;
    var education = tr[i].getElementsByTagName("TD")[5].innerHTML;
    var email = tr[i].getElementsByTagName("TD")[6].innerHTML;
    
    if(id.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display = "";
    }else if(name.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display = "";
    }else if(age.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display = "";
    }else if(education.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display = "";
    }else if(email.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display = "";
    }else{
      tr[i].style.display = "none";
    }
  }
}
