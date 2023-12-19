//defines a class for cats, meaning name of cat and talent it can perform
class Cat {
    constructor(cat, talent) {
        this.cat = cat;
        this.talent = talent;
    }


}
//defines class for hospital. FURTHER RESEARCH REQUIRED.
class Hospital {
    constructor(id, cat) {
        this.cat = cat;
        this.id = id;
        this.cats = [];
    }

// using push to add a cat to the beginning of a row
    addCat(cat) {
        this.cats.push(cat);
    }

// using splice to delete a cat
    deleteCat(cat) {
        let index = this.cats.indexOf(cat);
        this.cats.splice(index, 1);
    }
}


//initial. hospitals defined as array and hospitalId beginning as 0
let hospitals = [];
let hospitalId = 0;

onClick('new-hospital', () => {
    hospitals.push(new Hospital(hospitalId++, getValue('new-hospital-name')));
    drawDOM();
});


//making onClick function. uses addEventListener with click and action to return element.
function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}


//getValue Further research required
function getValue(id) {
    return document.getElementById(id).value;
}


//used to render the intirety of new hospital tables when created.
// learned that DOM in javascript refers to "Document Object Model,"
//otherwise a model that explains the layout of objects and bodies in JavaScript.
// draw Dom initiates the table, and then uses appendChild to add the title, table, and delete buttons.
//at bottom another for statement creating the rows of cats.
function drawDOM() {
    let hospitalDiv = document.getElementById('hospitals');
    clearElement(hospitalDiv);
    for (let hospital of hospitals) {
        let table = createHospitalTable(hospital);
        let title = document.createElement('h2');
        title.innerHTML = hospital.cat;  
        title.appendChild(createDeleteHospitalButton(hospital));
        hospitalDiv.appendChild(title);
        hospitalDiv.appendChild(table); 
        for (let cat of hospital.cats) {
            createCatRow(hospital, table, cat);
        }
    }
}



// the function to create a new row in the hospital tables. Cell 0 and 1 refers to their location
//in a vertical sense

function createCatRow(hospital, table, cat) {
    let row = table.insertRow(2);
    // console.log(createCatRow)
    row.insertCell(0).innerHTML = cat.cat;
    row.insertCell(1).innerHTML = cat.talent;
    // row.insertCell(2).innerHTML = "Test"; //testing where header code is
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(hospital, cat)); 
}



//using arrow function for btn.onClock to identify index and use that to splice when clicking the delete row button
function createDeleteRowButton(hospital, cat) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary'; 
    btn.innerHTML = 'Fire Cat';
    btn.onclick = () => {
        let index = hospital.cats.indexOf(cat);
        hospital.cats.splice(index, 1);
        drawDOM();
    };
    return btn;
}



//function used to delete a hospital table. Once again using onClick through an arrow function
// the click call the index of the hospital and splices it from the current index list
function createDeleteHospitalButton(hospital) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Team';
    btn.onclick = () => {
        let index = hospitals.indexOf(hospital);
        hospitals.splice(index, 1);
        drawDOM();
    };
    return btn;
}



// this is my create New cat button. I use my onclick function through an arrow function, pushing a new Cat class
// 
function createNewCatButton(hospital) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        hospital.cats.push(new Cat(getValue(`cat-input-${hospital.id}`), getValue(`talent-input-${hospital.id}`)));
        drawDOM();
    };
    return btn;
}




function createHospitalTable(hospital) {
console.log("creating the hospital table...");

    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
console.log("After table initial" , table);
//inserting initial headers to the table
    let row = table.insertRow(0);
    let catColumn = document.createElement('th');
    let talentColumn = document.createElement('th'); 
    let createColumn = document.createElement('th');
    //inserting names on the headers
    catColumn.innerHTML = 'Cat';
    talentColumn.innerHTML = 'Talent'; 
    createColumn.innerHTML = 'Contract Management';
    //actually appending the right row to the right header
    row.appendChild(catColumn);
    row.appendChild(talentColumn); 
    row.appendChild(createColumn);
    let formRow = table.insertRow(1);
    let catTh = document.createElement('th');
    let talentTh = document.createElement('th'); 
    let createTh = document.createElement('th');
    let catInput = document.createElement('input');
    catInput.setAttribute('id', `cat-input-${hospital.id}`);
    catInput.setAttribute('type', 'text');
    catInput.setAttribute('class', 'form-control');
    let talentInput = document.createElement('input');
    talentInput.setAttribute('id', `talent-input-${hospital.id}`); 
    talentInput.setAttribute('type', 'text');
    talentInput.setAttribute('class', 'form-control');
    let newCatButton = createNewCatButton(hospital);
    catTh.appendChild(catInput);
    talentTh.appendChild(talentInput);
    createTh.appendChild(newCatButton);
    formRow.appendChild(catTh);
    formRow.appendChild(talentTh); 
  //done* need to append the 3rd header to my table
    formRow.appendChild(createTh);
    return table;
}



//used in drawDOM to clear the hospital div to create a new hospital table.
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

