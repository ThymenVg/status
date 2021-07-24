async function getHappiness() {
    let res = await fetch("/happiness");
    let body = await res.json();
    let happinessValue = body.happiness;
    document.getElementById("happiness-value").innerHTML = happinessValue;
}
getHappiness();