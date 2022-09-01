let message_content = document.querySelector("#message-content");
let add_button = document.querySelector("#add-button");
let clear_button = document.querySelector("#clear-button");
let toasts = document.querySelector("#toasts");
let input = document.querySelector(".input");

//#region 
let duration = document.querySelector("#duration");
let cancelable = document.querySelector("#cancelable");
let success = document.querySelector("#success");
let error = document.querySelector("#error");
let removeOneToaster;
//#endregion

add_button.addEventListener("click",function(){
    createToaster();
});
clear_button.addEventListener("click",function(){
    removeAllToasters();
})

function createToaster(){
    const newDiv = document.createElement("div");
    toasts.append(newDiv);
    newDiv.classList.add('toast');
    const newDivContent = document.createElement("p");
    newDivContent.classList.add("message");
    newDivContent.innerText = message_content;
    newDiv.append(newDivContent);
    if (message_content.value=="") {
        if (success.checked) {
            newDivContent.innerText = "Success!";
        }
        else if(error.checked){
            newDiv.innerText = "Error.";
        }
    }
    else{
        newDiv.innerText = message_content.value;
    }
    let numDuration = Number.parseInt(duration.value);
    if (!numDuration || numDuration<500 || typeof numDuration!="number") {
        numDuration = 500;
    }
    if (success.checked) {
     newDiv.classList.add('success-toast');   
    }
    else if(error.checked){
        newDiv.classList.add('error-toast');  
    }
    if (cancelable.checked) {
        const cancelToast = document.createElement("button");
        cancelToast.classList.add("cancel-button");
        newDiv.append(cancelToast);
        cancelToast.style.cursor = "pointer";
        cancelToast.innerText = "X";
        removeOneToaster = document.querySelectorAll(".cancel-button");

    }
    if (cancelable.checked) {
        removeOneToaster.forEach(element => {
            element.addEventListener("click",function(e){
                e.target.parentElement.remove();
            });
        });
       
    }

  
    setTimeout(function(){
        newDiv.remove();
    },numDuration);

}

function removeAllToasters(){
    toasts.innerHTML = "";
}