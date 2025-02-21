let count = 0;
const colors = ["#ff5733", "#33ff57", "#3357ff", "#f3ff33", "#ff33a1", "#95gh45f", "gray", "brown", "aqua", "lightblue", "lightgreem"];


document.getElementById("countButton").addEventListener("click", function() {
    count++;
    document.getElementById("count").innerText = count;
});

document.getElementById("resetButton").addEventListener("click", function(){
    count = 0;
    document.getElementById("count").innerText = count;  
});
document.getElementById("colorButton").addEventListener("click", function()
{
    const randomIndex = Math.floor(Math.random() * colors.length);
    document.body.style.backgroundColor = colors[randomIndex];
});