const localArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")):[];
  //alert(localArray);
  
  function displayItems(){
    let items = "";
    for(let i=0;i<localArray.length;i++){
      items += `
       <div class="item">
       <div class="input-controller">
      <textarea disabled>${localArray[i]}</textarea>
      <div class="edit-controller">
      <button class="deleteBtn">Delete</button>
      <button class="editBtn">Edit</button>
      </div>
      </div>
      <div class="update-controller">
      <button class="saveBtn">Save</button>
      <button class="cancelBtn">Cancel</button>
      </div>
      </div>
      `;
    }
      document.querySelector(".todo-list").innerHTML = items;
      deleteListener();
      editListener();
      saveListener();
      cancelListener();
  }
  
  function deleteListener(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    
    deleteBtn.forEach((db,i)=>{
      db.addEventListener("click",()=>{deleteItem(i)})
    })
  }
  
  function deleteItem(i){
    if(prompt("Are you sure you want to delete ?","yes")){
    localArray.splice(i,1);
    localStorage.setItem("items",JSON.stringify(localArray));
    location.reload();
    }
  }
  
  function editListener(){
    
    const editBtn = document.querySelectorAll(".editBtn")
    const updateController = document.querySelectorAll(".update-controller");
    const textarea = document.querySelectorAll(".input-controller textarea");
    editBtn.forEach((eb,i)=>{
      eb.addEventListener("click",()=>{
       updateController[i].style.display = "block";
       textarea[i].disabled = false;
      }) 
    })
  }
  
 function saveListener(){
   const saveBtn = document.querySelectorAll(".saveBtn");
   const textarea = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sb,i)=>{
      sb.addEventListener("click",()=>{
       updateItem(textarea[i].value,i);
      }) 
    })
 } 
function updateItem(text,i){
  localArray[i]= text;
  localStorage.setItem("items",JSON.stringify(localArray));
  location.reload();
}
  
function cancelListener(){
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const textarea = document.querySelectorAll(".input-controller textarea");
  const updateController = document.querySelectorAll(".update-controller");
    cancelBtn.forEach((cb,i)=>{
      cb.addEventListener("click",()=>{
       textarea[i].disabled = true;
       updateController[i].style.display = "none";
      }) 
    })
}  
  
  
  
  
  document.querySelector(".btn").addEventListener("click",()=>{
    const item = document.querySelector("#input-data");
   //alert(typeof item.value);
    item.value.length === 0 | item.value === null ? alert("please write somethings.."):createItems(item);   
  })
  
  function createItems(item){
    localArray.push(item.value);
    localStorage.setItem("items",JSON.stringify(localArray));
    location.reload();
  }
  
  function displayDate(){
    let date = new Date();
    date = date.toString().split(" ");
    document.querySelector("#date-holder").innerHTML = date[2] +" "+ date[1]+ " "+date[3];
     }
  window.onload = function(){
    displayDate();
    displayItems();
  }