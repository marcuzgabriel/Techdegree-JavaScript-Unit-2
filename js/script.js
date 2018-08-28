/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
Created by Marcuz Larsen
******************************************/

/* Introduction & information for fellow students

There are two main rules to this project. 
1) Basic content should be accessible in the browser even when JavaScript is disabled. 
2) Unobstrusive JavaScript - in short this means that nothing should be touched, edited 
or added directly into the index.html file. Everything should come from the outside and
in this case the js file. */

/* Add variables to the global scope that can be used for reference and/or manipulation. */

const studentDiv = document.querySelector('.page-header');
const studentUl = studentDiv.nextElementSibling;
const studentList = studentUl.children;
const studentDetails = document.querySelectorAll('.student-details');
const numberOfStudents = studentList.length;

// This value will change the pagination and how many studetns is shown on one page :)
const limit = 10;

// Exceed expectations - create a search field
function createSearchDiv() {
    const searchFieldDiv = document.createElement('div');
    const searchFieldInputChild = document.createElement('input');
    const searchFieldButtonChild = document.createElement('button');
    const searchRefreshButtonChild = document.createElement('button');
    const searchLinkRefresh = document.createElement('a');
    
    // Give class, attribute and textContents
    searchFieldDiv.className = 'student-search';
    searchFieldInputChild.setAttribute('placeholder', 'Search for students...');
    searchFieldButtonChild.textContent = 'Search';
    searchRefreshButtonChild.textContent = 'Refresh';
    searchLinkRefresh.setAttribute('href', 'index.html');

    // Append the divs to the parent divs
    searchLinkRefresh.appendChild(searchRefreshButtonChild);
    searchFieldDiv.appendChild(searchFieldInputChild);
    searchFieldDiv.appendChild(searchFieldButtonChild);
    searchFieldDiv.appendChild(searchLinkRefresh);

    // Show the div at right place.
    // Create a reference to the parent node.
    const parentDiv = document.querySelector('.page-header');
       
    /* Create a reference to the children node where you wish
    to insert the pagination after. We wish this pagination to come
    after the h2 tag which is childNode[1]. */
    const parentChildren = parentDiv.children[1];
   
    // Insert after the parentChildren
    parentDiv.insertBefore(searchFieldDiv, parentChildren);

}

// Run the function so the search div can be seen
createSearchDiv();

// A function that prints out the search result to the user. The result can either be succesful or fail
function searchInfoDiv(succes, fail) {
    
    // Create elements
    const searchInfoDiv = document.createElement('div');
    const searchFieldParagraphSucces = document.createElement('p');
    const searchFieldParagraphFail = document.createElement('p');

    // Give the elements text content
    searchFieldParagraphSucces.textContent = succes;
    searchFieldParagraphFail.textContent = fail;
    
    // Give the div a class name in order to manipulate it if needed
    searchInfoDiv.className = 'searchInfo';

    // Style the search info div elements
    searchInfoDiv.setAttribute('style', ` 
    display: inline-block;
    width: 100%;
    clear: both;
    text-align: center;
    margin-top: 20px;
    color: green;
    `
    );

    // Style the fail message to be red
    searchFieldParagraphFail.setAttribute('style', 'color: red');

    // Append the child elements to the parent element
    searchInfoDiv.appendChild(searchFieldParagraphSucces);
    searchInfoDiv.appendChild(searchFieldParagraphFail);

    // Create reference to the parent node
    const parentDiv = document.querySelector('.page-header');

    /* Create a reference to the correct children node where you wish
    to insert the pagination after */
    const parentChildren = parentDiv.children[2];

    /* If the info field is empty we want to hide the div */
    if (succes === '' && fail === '') {
        // Do nothing 
    } else {
        // Insert after the parentChildren 
        parentDiv.insertBefore(searchInfoDiv, parentChildren);
    }

}

/* Function that creates a dynamic pagination in the button of the page */
function createPaginationDiv(value) {
    
    // Create a link variable that can dynamicly store all pagination numbers
    let links = [];
   
    /* Figure out how many students you want to work with (also known as the
    value property). The length of the value property gives us the number of arrays /
    items. The limit of pages is currently set to 10 in the global scope as the variable
    limit. */
    const numberOfPages = Math.ceil(value.length/limit);
   
    // Create the pagination div
    const paginationDiv = document.createElement('div');
    const paginationUl = document.createElement('ul');
    
    // Create loop as we have several pages depending on the value.
    for (let i = 1; i <= numberOfPages; i += 1) {
        const paginationLi = document.createElement('li');
        const paginationLink = document.createElement('a');
        paginationLink.setAttribute("href", "#");
        paginationLink.innerHTML = i;
        paginationUl.appendChild(paginationLi);
        paginationLi.appendChild(paginationLink);
        
        // Push all links in our links array
        links.push(paginationLink);
        
    }

    // Lets make the first button active as default.
    links[0].className = 'active';
    
    // Create the class name for the parent div.
    paginationDiv.className = "pagination";
    paginationDiv.appendChild(paginationUl);

    // Create a reference to the parent node
    var parentDiv = document.querySelector(".student-list").parentNode;
    
    /* Create a reference to the children node where you wish
    to insert the pagination after. We wish this pagination to come
    after the ul tag. This is allready found and stored within the 
    constant studentUl */ 
    parentDiv.insertBefore(paginationDiv, studentUl.nextElementSibling);

    //////////////////////////////////////////////////////////////////////
    //////  EVENT LISTERNER FOR ALL THE PAGINATION LINKS        //////////
    //////////////////////////////////////////////////////////////////////

    /* Information: 
    Everytime you hit a page link a function that shows the exact amount 
    of students we want to work with runs - referered to as the property value.
    In this app there is two main addEventListernes. The search button and
    the page button. Therefor it can duplicate the pagination div one time.

    /* If there is a duplicate of the pagination div then delete it else, keep it.*/

    const findDiv = document.querySelectorAll('.pagination');
    
    if (findDiv.length >= 2) {
        // Find the old duplicate
        const siblingDiv = findDiv[1];
        
        // Refer to the parent div
        const findDivParent = document.querySelector('.page');

        // Remove the child from the parent
        findDivParent.removeChild(siblingDiv);
    }

    // Event listener for click on the page links
    for (let i = 0; i < links.length; i += 1) {
       
        links[i].addEventListener('click', (e) => {
            e.preventDefault();
            // Find any links that has the active class
            const activeLinks = document.querySelector('.active');
            
            // If there is any, then remove the class name.
            if (activeLinks) {
                activeLinks.className = '';
            }
           
            // Add a new class name to the target you press
            e.target.className = 'active';
            
            /* Run the show student function that stores the property of 
            students we want to work with and the page number that is
            active */
            showStudents(value, e.target.textContent);
        });  
    }

    /* If there is no clicking event we want to be sure that the first page shows */
    showStudents(value, 1);
};

// Run the pagination div
createPaginationDiv(studentList);

/* A function that hides all of the items in the list except for the ten that need to be shown
depending on the page number that has the class select */

function showStudents(students) {

    // Store all the students we want to work with.
    let studentInfo = students;
 
    // Get the total number of students
    let studentTotal = studentInfo.length;
        
    /* In order to calculate an interval we need to get info 
    about the .active class and the number that is pressed */
    const activeLink = document.querySelector('.active');
    let selectedPage = activeLink.textContent;

    /* The number of students we want to show pr. page is defined in 
    the global scope as limit */
    let limitPrPage = limit;

    /* Calculate the min & max interval of students.
    The current interval is based on the number of student the user wish
    to see on each page; in this example the number is 10 students pr. page.
    A condition is created to make the interval more flexible so 
    it can go from 20-22 or 50-53 and not only from 0-10, 20-30 etc. */

    var pre_interval_max = selectedPage * limitPrPage; 

    if (pre_interval_max > studentTotal) {
        var interval_max = studentTotal;
    } else {
        var interval_max = pre_interval_max;
    }

    const interval_min = pre_interval_max-limit;
    
    /* Start with a loop that hides all the students */ 
    for (var i = 0; i < studentList.length; i += 1) {
        studentList[i].style.display = "none";
    }

    /* Then start a loop that selects the specific students within the
    calculated interval */   
    for (let i = interval_min; i < interval_max; i += 1) {
        studentInfo[i].style.display = '';
    }
}

// Run the function so all student is shown
showStudents(studentList, (Math.ceil(studentList.length/limit)));

// Create a function that works as a search filter
function searchFilter(students) {
    
    // Get all students detail info
    const allStudents = students;

    // Get the value within the search field
    const searchInput = document.getElementsByTagName('input')[0];

    // Get the button within the search field
    const searchButton = document.getElementsByTagName('button')[0];
    
    // Make an event listener on the button
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        
        /* Clear any info text. I have added a class name to the info div so we can
        find it and manipulate it */
        const parentDiv = document.querySelector('.page-header');
        const childDiv = document.querySelector('.searchInfo');
        
        // If the childDiv exists remove it
        if (childDiv) {
        parentDiv.removeChild(childDiv);
        }

        // Search value with toLowerCase method in order to get a correct result
        const searchValue = searchInput.value.toLowerCase();
        
        // Empty array variables
        let studentNames = [];
        let studentFirstName = [];
        let studentLastName = [];
        let studentEmails = [];

        // Array of the search result
        let searchResultSucces = [];
        let searchResultFail = [];
        let searchResultFinal = [];
              
        // Search object of result messages if the field is empty or searchResult is empty
        let searchResultMessages = {
            succesMatch: (value) => value + ' student matches your query - find them below...',
            emptyInput: 'The input field is empty. Please write something...',
            failMatch: (value) => value + ' students matches your query...',
            noMatchAtAll: 'No students matches your search query...'
        };

        /* This one is tricky. When we click the button we 
        wish to loop through all current possible text outcomes;
        student names and their emails. I managed to find a method
        called match() */

        for (let i = 0; i < allStudents.length; i += 1) {
            
            /* Thanks to the match() method we only need to manipulate the following.
            Now we store all the names and emails into our empty array variables. */
            studentNames[i] = allStudents[i].childNodes[3].textContent.toLowerCase();
            studentEmails[i] = allStudents[i].childNodes[5].textContent.toLowerCase();
           
            // For future reference - a cool ways of breaking the space in the name in order to get first and last name.
            // *How to get student first name: studentFirstName[i] = allStudents[i].childNodes[3].textContent.toLowerCase().split(/\s(.+)/)[0];
            // *How to get student last name: studentLastName[i] = allStudents[i].childNodes[3].textContent.toLowerCase().split(/\s(.+)/)[1];
                      
            // Condition that handles the result
            if (searchValue === '') {
                
                // Spit out a message that the input field is empty
                searchInfoDiv('', searchResultMessages.emptyInput);

                // Dont store anything in our arrays & exit the loop
                searchResultSucces = [];
                searchResultFail = [];
                break;
            
            } else {
            /* If the input field is not empty we want to match() our search
            string value to the array of students. Then we want to add the succes and 
            unsuccesful matches into our earlier declared constants as array values */ 
                if (studentNames[i].match(searchValue) || studentEmails[i].match(searchValue)) {
                
                // Store all the index numbers that matches the search string
                searchResultSucces.push(i);
                                                
                } else {
                // store all the index numbers that don't match the search string
                searchResultFail.push(i);
                }
            }
        } 
    
        /* Depending on the result of succesfull and unsuccesful matches we can now tell the user
        what the result is */

        // If both array results length (not index) are less or equal to 0 then there are no matches 
        if (searchResultSucces.length === 0 && searchResultFail.length === 0) {
            // This condition is not possible. Maybe you can figure out why? I already know :).
        } else if (searchResultSucces.length === 0 && searchResultFail.length === 54) { 
            // With 0 succes and the rest fail then there is absolutely no match.            
            searchInfoDiv('', searchResultMessages.noMatchAtAll);
        } else {        
            /* Succesful matches: Give the user info about the matches and call the pagination function 
            based on the result */
            searchInfoDiv(searchResultMessages.succesMatch(searchResultSucces.length), '');
            
            /* Before we call the function we want to create a new student list that only 
            contains the succes indexes. The current studentList that we use throughout
            this app is the variable studentList which is found in the the global scope. We have
            created a variable named SearchResultSucces that represents the exact index number 
            of succesful matches. We then push the studentList with that exact same index number 
            into the searchResultFinal array to get our final array of students */
            
            for (let i = 0; i < searchResultSucces.length; i += 1) {
                let succesIndexNumbers = searchResultSucces[i];
                searchResultFinal.push(studentList[succesIndexNumbers]);
            }
            
            // Run the pagination function
            createPaginationDiv(searchResultFinal);
           
        }

    });

}

// Run the search filter
searchFilter(studentDetails);










