var btns = document.querySelectorAll(".redian-xuanxiangka a");
var divs = document.querySelectorAll(".redian-kuangjiang #bottom");
console.log(document.querySelectorAll(".redian-kuangjiang #bottom"));
for (var i = 0; i < btns.length; i++) {
  btns[i].index = i;
  btns[i].onclick = function () {
    for (var i = 0; i < btns.length; i++) {
      btns[i].className = "weidianji";
      divs[i].className = "redian-bottom-display";
    }
    this.className = "dianji";
    divs[this.index].className = "redian-bottom";
  };
}
