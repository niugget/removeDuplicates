var emails = [], cloned_emails = [], emails_list = [], unique_list = [];
var container, list, clean_list;

function generateEmails() {
  //this for loop will generate half the needed emails and append them to the array
  for (var i=0; i<50000; i++){
    emails.push(i + "@e.com");
  }
  //duplicate this existing array for 50% duplicates
  cloned_emails = emails.slice(0);
  //join both array for final email list
  emails_list = emails.concat(cloned_emails);
  //randomize the email list array
  randomizeArray(emails_list);
  //display the randomized emails
  container = document.getElementById("emails-container");

  list = "<ol>"
    for (var i=0; i<emails_list.length; i++){
      list += "<li>" + emails_list[i] + "</li>"
    }
  list += "</ol>";

  container.innerHTML = list;

  //run the remove duplicate function on click and replace div with new sorted list
  $("#trigger-btn").click(function(){
    if (emails_list !== null){
      $.when(removeDuplicate(emails_list)).then(insertCleanList());
    }
    else{
      alert("There isn't an array here!");
    }
  })

}
//shuffles the array using the Durstenfeld shuffle algorithm
function randomizeArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  return array;
}
//function that removes the duplicate
function removeDuplicate(array) {
  //initial thoughts compare each element to all the rest of the elements, that would be too slow O(n^2)
  //since objects only accept keys that are unique we can put all array items into an object and push
  //them back into a new array
  console.log("running remove duplicate function")
  var obj = {};
  for(var i=0; i<array.length; i++){
    if (!obj.hasOwnProperty(array[i])){
      obj[array[i]] = true;
      unique_list.push(array[i])
    }
  }
  console.log(unique_list.length)
  console.log("object " + obj)
  return unique_list;
}

function insertCleanList(){
  clean_list = "<ol>"
  for (var i=0; i<unique_list.length; i++){
    clean_list += "<li>" + unique_list[i] + "</li>"
  }
  clean_list +="</ol>";
  $("#clean-emails-container").html(clean_list);
  $('#trigger-btn').attr('disabled','disabled');
}

window.onload = generateEmails();
