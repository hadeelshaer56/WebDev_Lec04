document.addEventListener("DOMContentLoaded", () => {

    pageLoaded();
    //...
});

let txt1;
let txt2;
let btn;
let lblRes;
function pageLoaded() {
    txt1 = document.getElementById('txt1');
    txt2 = document.querySelector('#txt2');
    btn = document.getElementById('btnCalc');
    lblRes = document.getElementById('lblRes');
    btn.addEventListener('click', () => {
        calculate();
    });


}

function calculate() {
    let txt1Text = txt1.value;
    let num1 = parseInt(txt1Text);

    let txt2Text = txt2.value;
    let num2 = parseInt(txt2Text);

    let res = num1 + num2;
    lblRes.innerText = res;



}





const btn2 = document.getElementById("btn2");
btn2.addEventListener("click", () => {
    print("btn2 clicked :" + btn2.id + "|" + btn2.innerText);
});


// btn2.addEventListener("click",func1);

// function func1()
// {

// }
function print(msg) {

    //--Get TextArea Element Reference
    const ta = document.getElementById("output");
    //--Write msg to textArea text
    if (ta) ta.value = msg;
    //write Log
    else console.log(msg);
}



// =============================================
// STEP 1: JS NATIVE TYPES, USEFUL TYPES & OPERATIONS
// =============================================
function demoNative() {
    let out = "=== STEP 1: NATIVE TYPES ===\n";

    // String
    const s = "Hello World";
    out += "\n[String] s = " + s;
    out += "\nLength: " + s.length;
    out += "\nUpper: " + s.toUpperCase();

    // Number
    const n = 42;
    out += "\n\n[Number] n = " + n;

    // Boolean
    const b = true;
    out += "\n\n[Boolean] b = " + b;

    // Date
    const d = new Date();
    out += "\n\n[Date] now = " + d.toISOString();

    // Array
    const arr = [1, 2, 3, 4];
    out += "\n\n[Array] arr = [" + arr.join(", ") + "]";
    out += "\nPush 5 → " + (arr.push(5), arr.join(", "));
    out += "\nMap x2 → " + arr.map(x => x * 2).join(", ");

    // Functions as variables
    const add = function (a, b) { return a + b; };
    out += "\n\n[Function as variable] add(3,4) = " + add(3, 4);

    // Callback
    function calc(a, b, fn) {
        return fn(a, b);

    }
    const result = calc(10, 20, (x, y) => x + y);
    out += "\n[Callback] calc(10,20, x+y ) = " + result;

    //Print to Log
    print(out);
}

function calculateWithOperation() {
    const n1 = parseFloat(document.getElementById("txt1").value);
    const n2 = parseFloat(document.getElementById("txt2").value);
    const op = document.getElementById("operation").value;

    let result;

    switch (op) {
        case "+":
            result = n1 + n2;
            break;
        case "-":
            result = n1 - n2;
            break;
        case "*":
            result = n1 * n2;
            break;
        case "/":
            result = n1 / n2;
            break;
        default:
            result = "ERR";
    }

    document.getElementById("lblRes").innerText = result;
}

// override btnCalc click WITHOUT changing existing code
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnCalc");
    btn.addEventListener("click", calculateWithOperation);
});

// ================================
// EXTRA: UPDATED print FUNCTION
// ================================
(function () {
    const oldPrint = print;  // keep reference just in case

    print = function (msg, append = false) {
        const ta = document.getElementById("output");

        if (!ta) {
            console.log(msg);
            return;
        }

        if (append) {
            // add as a NEW LINE
            ta.value += (ta.value.length > 0 ? "\n" : "") + msg;
        } else {
            // replace content
            ta.value = msg;
        }
    };
})();


// ====================================================
// EXTRA: WRITE EACH CALCULATION AS A LOG LINE
// ====================================================
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnCalc");

    btn.addEventListener("click", () => {
        const n1 = document.getElementById("txt1").value;
        const n2 = document.getElementById("txt2").value;
        const op = document.getElementById("operation").value;
        const res = document.getElementById("lblRes").innerText;

        const logLine = `${n1} ${op} ${n2} = ${res}`;
        print(logLine, true);   // append mode
    });
});
