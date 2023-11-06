const buttons = document.getElementsByClassName("btn");
const input = document.getElementById("input");
const output = document.getElementById("output");

for (let button of buttons) {
    button.addEventListener("click", (e) => {
        createMaterialPoint(e);
    });
    if (button.innerText == "C") {
        button.addEventListener("click", (e) => clearInput(e));
    } else if ("0123456789".includes(button.innerText)) {
        button.addEventListener("click", (e) => addNumber(e));
        button.addEventListener("click", (e) => calculate(e));
    } else if (button.innerText == "<") {
        button.addEventListener("click", (e) => delLastSign(e));
    } else if (button.innerText == "=") {
        button.addEventListener("click", (e) => equal());
    } else if ("+-x/.".includes(button.innerText)) {
        button.addEventListener("click", (e) => handleSign(e))
    }
}

createMaterialPoint = (e) => {
    let point = document.createElement("div");
    point.classList.add("material-point");
    point.style.left = e.clientX - e.target.offsetLeft + "px";
    point.style.top = e.clientY - e.target.offsetTop + "px";
    e.target.appendChild(point);
    setTimeout(() => {
        e.target.removeChild(point);
    }, 500);
}

handleSign = (e) => {
    if(e.target.innerText == ".") {
        let reverse_input = input.innerText.split("").reverse().join("");
        let point_pos = reverse_input.indexOf(".");
        if(point_pos == -1) {
            
            return;
        } else if (point_pos == 0) {
            return;
        }
        else {
            if(reverse_input.substring(0, point_pos).includes(".") 
            || reverse_input.substring(0, point_pos).includes("+")
            || reverse_input.substring(0, point_pos).includes("-")
            || reverse_input.substring(0, point_pos).includes("x")
            || reverse_input.substring(0, point_pos).includes("/"));
            return;
        }
    }
    else if ("+-/*".includes(input.innerText[input.innerText.length - 1])) {
        delLastSign();
    }
    input.innerText += e.target.innerText;
}

clearInput = (e) => {
    input.innerText = "0";
    output.innerText = "0";
}

addNumber = (e) => {
    if (input.innerText.endsWith(0) 
        && input.innerText.length > 1 
        && "+-/x".includes(input.innerText[input.innerText.length-2])
        && "0123456789".includes(e.target.innerText))
            delLastSign();
        
        input.innerText += e.target.innerText;
}

equal = () => {
    calculate()
    input.innerText = output.innerText;
}

calculate = () => {
    let result = input.innerText.replace("x", "*");
    output.innerText = eval(result);
}

delLastSign = () => {
    input.innerText = input.innerText.slice(0, -1);
}
