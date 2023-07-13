console.log('Welcome to Notes App');
showNotes();       // Because when the page is reloaded the cards will remain constant

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {       // 'e' is an event object

    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];      // blank array
    }
    else {
        notesObj = JSON.parse(notes);    // parse string into Array      Meaning of parse is convert something into understandable format
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));   // We have set items in localStorage as Array that's why we use JSON.stringify to convert them into string

    addTxt.value = "";
    console.log(notesObj);
    showNotes();                  // This function will display the added item into cards listed below

})
// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];      // blank array
    }
    else {
        notesObj = JSON.parse(notes);        // parse string into Array      Meaning of parse is convert something into understandable format
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
       <div class="noteCard mx-2 my-2 card" style="width: 18rem;">
       <!-- <img src="..." class="card-img-top" alt="..."> -->
       <div class="card-body">
           <h5 class="card-title"><strong>Note ${index + 1}</strong></h5>

           <p class="card-text">     ${element}    </p>
          
           <Button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</Button>
       </div>
       </div>`;




    });
    let notesElm = document.getElementById('notes')   // Here notes is not a variable, it is the ID of a div which we assign during writing it's html
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show!  Use Add a Note section above to add Notes`
    }
}

//function to delete a note
function deleteNote(index){
    console.log('I am deleting',index)
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];      // blank array
    }
    else {
        notesObj = JSON.parse(notes);    // parse string into Array      Meaning of parse is convert something into understandable format
    }    
    notesObj.splice(index,1);    // we have to update local storage
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener('input',function(){                 // when the value inside the element is changed, then input event is fired.
    let inputVal = search.value
    // console.log("Input event fired!",inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
         let cardTxt = element.getElementsByTagName('p')[0].innerText;
         if(cardTxt.includes(inputVal))
         {
            element.style.display = 'block';
         }
         else{
            element.style.display = 'none';
        
            //  notesElm.innerHTML = `Nothing to show`
         }
        //  console.log(cardTxt);

    })
})


/* Further features

1) Add Title
2) Keep Mark Important button
3) Separate notes by user
4) Sync and Host to a web server
                                    WILL EXECUTE VERY SOON !!!
*/