document.getElementById("form").onsubmit = submit;

function submit(e) {
    e.preventDefault();
    const happinessValue = document.getElementById("happiness-input").value
    if (isNaN(happinessValue)) return happinessValueError("The value is not a number!");
    if (happinessValue > 10 || happinessValue < 0) return happinessValueError("The number has to be between 0 and 10!");

    fetch("/updateHappiness", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            happinessValue
        })
    });

    document.getElementById("happiness-input").value = "";
}

function happinessValueError(msg) {
    alert(msg);
    document.getElementById("happiness-input").value = "";
}