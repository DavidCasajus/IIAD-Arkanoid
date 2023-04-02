function myFunction() {
    var x = document.getElementById("instructions");
    var btn = document.getElementById("showHideButton");
    if (x.style.display === "none") {
      x.style.display = "block";
      btn.innerHTML = "Hide instructions"
    } else {
      x.style.display = "none";
      btn.innerHTML = "Show instructions"
    }
  }
