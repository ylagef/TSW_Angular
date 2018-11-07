function copy() {
    var copy = document.getElementById("copyValue");

    copy.disabled = false;
    
    copy.select(); // Select value
    document.execCommand("copy"); // Copy value to clipboard
    copy.setSelectionRange(0,0); // Unselect field
    
    copy.disabled = true;
}