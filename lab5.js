window.onload = dialogBoxCookies()

//1st task

function changeText(){
    const div1 = document.getElementById("leftDiv1")
    const div2 = document.getElementById("div1InDiv2")
    const tempText = div1.innerHTML
    div1.innerHTML = div2.innerHTML
    div2.innerHTML = tempText
}

//2nd task

function ellipseArea(r = 5, R = 12){
    const area = Math.PI * r * R
    const div3 = document.getElementById("rightDiv3")
    const result = document.createTextNode("Ellipse area = " + area)
    div3.appendChild(result)
}

// 3rd task

function calculateDividers(){
    const form1  = document.getElementById("naturalNForm");
    form1.addEventListener("submit", (event) => {
        const number = form1.elements["N"].value;
        let valuesList = []
        for(let i = 0; i < number; i++){
            if (number % i == 0){
                valuesList.push(i)
            }
        }
        valuesList.push(number)
        const result = valuesList.join(",")
        setCookie("dividers", result)
        alert("dividers are: " + result)
    })
    event.preventDefault();
} 

function dialogBoxCookies(){
    let cook = document.cookie
    if(!(cook.indexOf("dividers") === -1)){
        let conf = confirm (cook + " Видалити cookies?")
        if(conf){
            deleteCookie("dividers")
            location.reload()
        }
        else{
            conf = alert("Наявні cookies. Перезавантажте сторінку")
        }
    }
}

function deleteCookie(name)
{
    document.cookie=name + "=null; expires=Wed, 16 Nov 2022 00:00:00 UTC"
}


function setCookie(name, value)
{
    document.cookie = name + "=" + value + ";"
}

// 4th task

function rightAlignSave(){
    let box1 = document.getElementById("block1Box")
    let box2 = document.getElementById("block2Box")
    if(box1.checked){
        window.localStorage.setItem('box1', 'right');
    }
    else{
        window.localStorage.setItem('box1', 'center')
    }
    if(box2.checked){
        window.localStorage.setItem('box2', 'right');
    }
    else{
        window.localStorage.setItem('box2', 'left')
    }
}

function setAlign(){
    disableForms("formDiv1")     // for 5th task
    disableForms("formDiv2")
    disableForms("formDiv3") 
    disableForms("formDiv4")
    disableForms("formDiv5")
    displayOnlyList("leftDiv1", "formDiv1", "div1List")
    displayOnlyList("rightDiv2", "formDiv2", "div2List")
    displayOnlyList("rightDiv3", "formDiv3", "div3List")
    displayOnlyList("leftDiv4", "formDiv4", "div4List")
    displayOnlyList("rightDiv5", "formDiv5", "div5List")
    let box1Align = window.localStorage.getItem('box1')
    let box2Align = window.localStorage.getItem('box2')
    let box1 = document.getElementById("block1Box")
    let box2 = document.getElementById("block2Box")
    if(box1Align == 'right'){
        rightAlign1()
        if(box1)
            box1.checked = true
    }
    if(box2Align == 'right'){
        rightAlign2()
        if(box2)
            box2.checked = true
    }
}

function rightAlign1(){
    let div = document.getElementById("leftDiv1")
    if(div)
        div.style.textAlign = "right"
}

function rightAlign2(){
    let div = document.getElementById("div1InDiv2")
    if(div)
        div.style.textAlign = "right"
}

// 5th task

function disableForms(idForm){
    document.getElementById(idForm).style.visibility = "hidden"
}

function enableForm(idForm){
    document.getElementById(idForm).style.visibility = "visible"
}

function makeList(source, list){
    let li = document.createElement('li');
    let info = document.getElementById(source).value
    const textForLi = document.createTextNode(info)
    li.appendChild(textForLi)
    document.getElementById(source).value = ''
    document.getElementById(list).appendChild(li)
}

function makeListAgain(source, list){
    let li = document.createElement('li');
    const textForLi = document.createTextNode(source)
    li.appendChild(textForLi)
    document.getElementById(list).appendChild(li)
}

function saveListToLS(id){
    let nodeList = document.getElementById(id).getElementsByTagName("li")
    let result = []
    for (let i = 0; i < nodeList.length; i++) {
        result.push(nodeList[i].innerHTML)
    }
    const res = result.toString()
    window.localStorage.setItem(id, JSON.stringify(res))
}

function removeList(id){
    window.localStorage.removeItem(id)
}

function displayOnlyList(idBlock, idForm, idUl){
    if(localStorage.getItem(idUl) !== null){
    console.log("exist")
    let parsedArray = JSON.parse(localStorage.getItem(idUl)).toString()
    let arr = parsedArray.split(',')
    arr.forEach(element => {
        makeListAgain(element, idUl)
    });
    const form = document.getElementById(idForm)
    const Ul = document.getElementById(idUl)
    document.getElementById(idBlock).replaceChildren(form, Ul)
    enableForm(idForm)
    }
}