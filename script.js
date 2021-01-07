"use strict";

function getRadioSelected() {
  let ele = document.getElementsByName("mstatus");
  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      return ele[i].value;
    }
  }
}

// const userName = document.getElementsByClassName("contact-form");

// document.querySelector(".guess").addEventListener("click", function () {
//   loadTable();
// });

function loadTable() {
  const userName = document.querySelector("#name").value;
  const userDob = document.querySelector("#dob").value;
  const userPob = document.querySelector("#pob").value;
  const userGender = document.querySelector("#gender").value;
  const userAddress = document.querySelector("#address").value;
  const userOccupation = document.querySelector("#occupation").value;
  const userMarritalStatus = getRadioSelected();
  const userSeniorCitizen = document.querySelector("#seniorcitizen").checked;

  console.log(userMarritalStatus);

  if (
    !userName ||
    !userDob ||
    !userPob ||
    userGender === "gender" ||
    !userAddress ||
    !userOccupation
  ) {
  } else {
    let table = document.getElementById("myTable");
    let row = table.insertRow(1);
    let cellUserName = row.insertCell(0);
    let cellUserDob = row.insertCell(1);
    let cellUserPob = row.insertCell(2);
    let cellUserGender = row.insertCell(3);
    let cellUserAddress = row.insertCell(4);
    let cellUserOccupation = row.insertCell(5);
    let cellUserMStatus = row.insertCell(6);
    let cellUserSeniorCitizen = row.insertCell(7);

    cellUserName.innerHTML = userName;
    cellUserDob.innerHTML = userDob;
    cellUserPob.innerHTML = userPob;
    cellUserGender.innerHTML = userGender;
    cellUserAddress.innerHTML = userAddress;
    cellUserOccupation.innerHTML = userOccupation;
    cellUserMStatus.innerHTML = userMarritalStatus;
    cellUserSeniorCitizen.innerHTML = userSeniorCitizen;

    document.querySelector(".tblClass").classList.remove("hidden");
    document.getElementById("contact-form").reset();
  }
}
