var URLactual = location.pathname;
var btngoBack = document.getElementById("goback");
var btnClear = document.getElementById("clear");
var list = document.getElementById("todo-list");
//When I click on the Go back button, It Switch to index page
if (URLactual.includes("highscores.html")) {
    btngoBack.addEventListener("click", function () {
        location.assign('../index.html');

    });
};

//Get the local storage array 
var entries = localStorage.getItem("allEntries");
//Lets count how many we have back
var retrievedObject = JSON.parse(entries);

//Sort by score
if (retrievedObject != null) {
    retrievedObject.sort(function (a, b) {
        var keyA = new Date(a.sco),
            keyB = new Date(b.sco);
        // Compare the 2 dates
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });

    //Show the list of people who played 
    for (let i = 0; i < retrievedObject.length; i++) {
        //Show all the entries on the page 
        var li = document.createElement("li");
        li.textContent = (i + 1) + ".- " + retrievedObject[i].init + " -- " + retrievedObject[i].sco;
        list.appendChild(li);

    }
}



//Remove all the entries when you click on the clear button
btnClear.addEventListener("click", function () {
    localStorage.clear();
    clearAll(list);
})

function clearAll(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};