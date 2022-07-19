const timeSlider = document.getElementById("time");
const timeVal = document.getElementById("timevalue");

timeVal.innerHTML = timeSlider.value + " minutes";

timeSlider.oninput = () => {
    timeVal.innerHTML = timeSlider.value + " minutes";
}

const nbPlayerSlider = document.getElementById("nbplayer");
const nbPlayerVal = document.getElementById("nbplayervalue");

nbPlayerVal.innerHTML = nbPlayerSlider.value + " players";

nbPlayerSlider.oninput = () => {
    nbPlayerVal.innerHTML = nbPlayerSlider.value + " players";
}
