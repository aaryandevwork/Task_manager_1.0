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

openInputBox.addEventListener('click', () =>{
    inputSection.style.display = "flex";
    // renderTask();
})

closeInput.addEventListener('click', () => {
    inputSection.style.display = "none";
})

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
        id : Date.now(),
        title,
        description,
        date,
        category,
        completed : false
    }

    taskList.push(task);
    // localStorage.setItem("products", JSON.stringify(productsArr));
    localStorage.setItem("tasks", JSON.stringify(taskList));
    

    renderTask();
    console.log(taskList);

    taskTitle.value = "";
    taskDescription.value = "";
    taskDate.value = "";
    taskCategory.value = "";

})


function renderTask(){
    taskContainer.innerHTML = "";
    taskList.forEach((elem,index) => {
        taskContainer.innerHTML +=`
        <div class="taskBox">
                    <div class="leftTaskBox">
                        <h2>${elem.title}</h2>
                        <h3>${elem.description}</h3>
                        <div class="taskBox-leftBottom">
                            <h4><i class="ri-calendar-line"></i> ${elem.date}</h4>
                            <h4><i class="ri-menu-search-line"></i>${elem.category}</h4>
                        </div>
                    </div>
                    <div class="rightTaskBox">
                        <i class="ri-check-line"></i>
                        <i class="ri-edit-box-line"></i>
                        <i onclick="deleteTask(${index})" class="ri-delete-bin-line"></i>
                    </div>
                </div>
        `;
    });
}

function deleteTask(index){
    taskList.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(taskList));
    renderTask();
}

renderTask();

// console.log(innnerInputSection)

// innnerInputSection.addEventListener("click", (event) => {
//     console.log(event.target)

// })

// console.log(taskContainer);