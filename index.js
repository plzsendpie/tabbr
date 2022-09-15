let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){  
 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        if (myLeads.includes(tabs[0].url)){
            alert("already in list")
        }else{
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
        }
    })
})

function render(leads) {

    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li> <button type="button" class="del-row-btn">x</button>
               <span class="li-link"> 
                    <a target='_blank' href='${leads[i]}'>
                        ${leads[i]}
                    </a>
                </span>
            </li>
        `
  
    }
    ulEl.innerHTML = listItems


    const deleteBtns = document.querySelectorAll('.del-row-btn')
    deleteBtns.forEach(function(el){
        el.addEventListener('click', function () {
            deleteRow(this)
         });
    });



    // setTimeout(function(){
    //     // console.log(document.querySelector('.del-row-btn'))
    //         document.querySelectorAll('.del-row-btn').addEventListener('click', function(){
    //             deleteRow(this)
    //         })
    // },500)
  
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

function deleteSpecificSite(site){

    myLeads = myLeads.filter(function(value, index, arr){ 
        return value != site;
    });

    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    if(localStorage.myLeads === "[]"){
        return
    }else{
        render(myLeads)
    }

}

function deleteRow(buttonPressed){

    const urlToRemove = buttonPressed.parentElement.innerText.split(" ")[1]
    console.log(urlToRemove)
    deleteSpecificSite(urlToRemove)
    buttonPressed.parentElement.remove()

}
