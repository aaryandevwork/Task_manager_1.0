let openInputBox = document.querySelector('#openInputBox')
let saveInputBtn = document.querySelector('#saveInputBtn')
let closeInput = document.querySelector('#closeInput')
let innnerInputSection = document.querySelector('.innnerInputSection')
let inputSection = document.querySelector('.inputSection')

let taskTitle = document.querySelector("#taskTitle")
let taskDescription = document.querySelector("#description")
let taskDate = document.querySelector("#taskDate");
let taskCategory = document.querySelector("#TaskCategory");


let taskContainer = document.querySelector("#taskContainer")

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

// input section open and close
openInputBox.addEventListener('click', () => {
    inputSection.style.display = "flex";
    // renderTask();
})

closeInput.addEventListener('click', () => {
    inputSection.style.display = "none";
})


//save btn in input section
saveInputBtn.addEventListener('click', () => {
    console.log("clicked");

    let title = taskTitle.value.trim();
    let description = taskDescription.value.trim();
    let date = taskDate.value;
    let category = taskCategory.value;

    if (!title || !description || !date || !category) {
        alert("Please fill all fields");
        return;
    }

    let task = {
        id: Date.now(),
        title,
        description,
        date,
        category,
        completed: false
    }

    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));


    renderTask();
    console.log(taskList);

    taskTitle.value = "";
    taskDescription.value = "";
    taskDate.value = "";
    taskCategory.value = "";

})

//Main render function
function renderTask(tasks = taskList) {
    taskContainer.innerHTML = "";

    tasks.forEach((elem, index) => {
        taskContainer.innerHTML += `
            <div class="taskBox">
                <div class="leftTaskBox">
                    <h2 class="taskTitle ${elem.completed ? 'completed' : ''}">${elem.title}</h2>

                    <h3 class="taskDescription ${elem.completed ? 'completed' : ''}">
                        ${elem.description}
                    </h3>

                    <div class="taskBox-leftBottom">
                        <h4 class="taskBox-leftBottom-Date">
                            <i class="ri-calendar-line"></i>
                            <span class="taskDate">${elem.date}</span>
                        </h4>

                        <h4 class="taskBox-leftBottom-Category category-${elem.category}">
                            <i class="ri-menu-search-line"></i>
                            <span class="taskCategory ">${elem.category}</span>
                        </h4>
                    </div>
                </div>

                <div class="rightTaskBox">
                    <i onclick="toggleComplete(${index})" class="ri-check-line ${elem.completed ? 'done' : ''}"></i>

                    <i onclick="editTask(${index}, this)"
                       class="ri-edit-box-line"></i>

                    <i onclick="deleteTask(${index})"
                       class="ri-delete-bin-line"></i>
                </div>
            </div>
        `;
    });
}

//Task edit function
function editTask(index, btn) {

    const taskBox = btn.closest(".taskBox");

    const title = taskBox.querySelector(".taskTitle");
    const description = taskBox.querySelector(".taskDescription");

    title.contentEditable = true;
    description.contentEditable = true;

    title.focus();

    btn.classList.remove("ri-edit-box-line");
    btn.classList.add("ri-save-line");

    btn.title = "Save Changes";

    btn.onclick = function () {
        updateTask(index, taskBox, btn);
    };
}


function updateTask(index, taskBox, btn) {

    const title =
        taskBox.querySelector(".taskTitle").textContent.trim();

    const description =
        taskBox.querySelector(".taskDescription").textContent.trim();

    taskList[index].title = title;
    taskList[index].description = description;

    localStorage.setItem(
        "tasks",
        JSON.stringify(taskList)
    );

    taskBox.querySelector(".taskTitle").contentEditable = false;
    taskBox.querySelector(".taskDescription").contentEditable = false;

    btn.classList.remove("ri-save-line");
    btn.classList.add("ri-edit-box-line");

    btn.onclick = function () {
        editTask(index, btn);
    };
}


//task delete function
function deleteTask(index) {
    taskList.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTask();
}

//task complete mark function
function toggleComplete(index) {

    taskList[index].completed =
        !taskList[index].completed;

    localStorage.setItem(
        "tasks",
        JSON.stringify(taskList)
    );

    renderTask();
}
 

//filtering function
const dateFilter = document.querySelector("#dateFilter");
const filterCategory = document.querySelector("#filterCategory");


filterCategory.addEventListener(
    "change",
    filterTasks
);

dateFilter.addEventListener(
    "change",
    filterTasks
);

function filterTasks() {

    const category = filterCategory.value;
    const dateValue = dateFilter.value;

    const today = new Date();

    const filteredTasks = taskList.filter(task => {

        let categoryMatch =
            category === "all" ||
            task.category === category;

        let dateMatch = true;

        const taskDate = new Date(task.date);

        if (dateValue === "today") {
            dateMatch =
                taskDate.toDateString() ===
                today.toDateString();
        }

        if (dateValue === "week") {

            const firstDay = new Date(today);

            firstDay.setDate(
                today.getDate() - today.getDay()
            );

            const lastDay = new Date(firstDay);

            lastDay.setDate(
                firstDay.getDate() + 6
            );

            dateMatch =
                taskDate >= firstDay &&
                taskDate <= lastDay;
        }

        return categoryMatch && dateMatch;
    });

    renderTask(filteredTasks);
}



// search feature implimentation
const searchTask = document.querySelector("#search");

searchTask.addEventListener("input", () => {

    const searchValue =
        searchTask.value.toLowerCase();

    const filteredTasks = taskList.filter(task => {

        return (
            task.title
                .toLowerCase()
                .includes(searchValue) ||

            task.description
                .toLowerCase()
                .includes(searchValue)
        );
    });

    renderTask(filteredTasks);
});


//allTask feature
let allTask = document.querySelector(".allTask")

allTask.addEventListener("click", () => {
    allTask.classList.toggle('active');

    todaybtn.classList.remove('active');
    importantBtn.classList.remove('active');
    Completedbtn.classList.remove('active');

    renderTask();
})


// today filter
let todaybtn = document.querySelector(".today");

todaybtn.addEventListener("click", () => {

    const today = new Date();

    let filteredTasks = taskList.filter(task => {

        const taskDate = new Date(task.date);

        return (
            taskDate.toDateString() ===
            today.toDateString()
        );
    });

    console.log(filteredTasks);

    todaybtn.classList.add('active');

    importantBtn.classList.remove('active');
    allTask.classList.remove('active');
    Completedbtn.classList.remove('active');

    renderTask(filteredTasks);
});



// Important filter
let importantBtn = document.querySelector(".Important");
// console.log(importantBtn)

importantBtn.addEventListener("click", () => {
    
    const filteredTasks = taskList.filter(task => {
        return task.category === 'high';
    });

    importantBtn.classList.add('active')

    todaybtn.classList.remove('active');
    allTask.classList.remove('active');
    Completedbtn.classList.remove('active');

    renderTask(filteredTasks);
})


//Completed feature

let Completedbtn = document.querySelector(".Completed");

Completedbtn.addEventListener("click", () => {

    let filteredTasks = taskList.filter(task => {
        return task.completed === true;
    })

    Completedbtn.classList.add('active')

    todaybtn.classList.remove('active');
    allTask.classList.remove('active');
    importantBtn.classList.remove('active');

    renderTask(filteredTasks);
})


// statistics add
let totalTasksNumber = document.querySelector("#totalTasks")
let completedTasksNumber = document.querySelector("#completedTasks")
let pendingTasksNumber = document.querySelector("#pendingTasks")


let addStatistics = () => {
    totalTasksNumber.textContent = taskList.length;

    
    const pompletedTasks = taskList.filter(task => {
        return task.completed === true;
    });
    
    completedTasksNumber.textContent = pompletedTasks.length;
    
    // completedTasksNumber.textContent = taskList.filter(task => task.completed).length;

    const pendingTasks = taskList.filter(task => {
        return task.completed === false;
    });
    
    pendingTasksNumber.textContent = pendingTasks.length;

}

addStatistics();


// theme toggle
const themeBtn = document.querySelector(".theme-toggle");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
        localStorage.setItem("theme", "light");
        themeBtn.innerHTML = `
        <i class="ri-moon-fill"></i>
        `;
    } else {
        localStorage.setItem("theme", "dark");
        themeBtn.innerHTML = `
            <i class="ri-sun-fill"></i>
        `;
    }
});


//for page refresh
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
} else {
    document.body.classList.add("dark-theme");
}

//Event Propogation : 

const grandparent = document.querySelector(".grandparent");
const parent = document.querySelector(".parent");
const child = document.querySelector(".child-btn");

const bubbleBtn = document.querySelector("#bubbleBtn");
const captureBtn = document.querySelector("#captureBtn");

function grandparentHandler() {
    console.log("Grandparent");
}

function parentHandler() {
    console.log("Parent");
}

function childHandler() {
    console.log("Child");
}

// Enable Bubbling
bubbleBtn.addEventListener("click", () => {

    grandparent.removeEventListener(
        "click",
        grandparentHandler,
        true
    );

    parent.removeEventListener(
        "click",
        parentHandler,
        true
    );

    child.removeEventListener(
        "click",
        childHandler,
        true
    );

    grandparent.addEventListener(
        "click",
        grandparentHandler
    );

    parent.addEventListener(
        "click",
        parentHandler
    );

    child.addEventListener(
        "click",
        childHandler
    );

    console.clear();
    console.log("Bubbling Enabled");
});


// Enable Capturing
captureBtn.addEventListener("click", () => {

    grandparent.removeEventListener(
        "click",
        grandparentHandler
    );

    parent.removeEventListener(
        "click",
        parentHandler
    );

    child.removeEventListener(
        "click",
        childHandler
    );

    grandparent.addEventListener(
        "click",
        grandparentHandler,
        true
    );

    parent.addEventListener(
        "click",
        parentHandler,
        true
    );

    child.addEventListener(
        "click",
        childHandler,
        true
    );

    console.clear();
    console.log("Capturing Enabled");
});



// initial render 
renderTask();
