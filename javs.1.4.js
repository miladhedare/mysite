const increas = document.getElementById("increasebton");
const resetbton = document.getElementById("resetbton");
const decresebton = document.getElementById("decresebton");
const countlable = document.getElementById("countlable")
let count = 0 ;

increas.onclick = function(){
   
    count++;
    countlable.textContent = count;
}
resetbton.onclick = function(){
     count = 0
    countlable.textContent = count;
    alert("reset secussfuly !!")
}
decresebton.onclick = function(){
     if (countlable.textContent > 0){
       count--
     } else{
        alert("it is already 0")
     }
    countlable.textContent = count;
}