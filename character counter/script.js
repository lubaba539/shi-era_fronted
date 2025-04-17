function countCharacters(){
    var text = document.getElementById("myTextarea").value;
    var count = text.length;
    var limit = 50;
    document.getElementById("charCount").innerHTML = count;
    if(count > limit)
    {
        document.getElementById("charLimit").style.display = "block";
        document.getElementById("myTextarea").value = text.subString(0, limit);

    }
    else{
        document.getElementById("charLimit").style.display = "none";
    }
}