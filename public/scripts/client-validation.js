document.getElementById('pizza-form').onsubmit = () => {

    let isValid = true;

    // Validate first name
    let fname = document.getElementById('fname').value.trim();
    if (fname === ""){
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }
    
    return isValid;
}
