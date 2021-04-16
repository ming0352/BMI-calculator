
(function () {
  let data = {
    advice: ["過輕", "理想", "過重", "輕度肥胖", "中度肥胖", "重度肥胖"],
    color: ["orange", "green", "#F55E25", "#F52B11", "#F52AAF", "red"],
    adviceLI: [],
    bmi: [],
    weight: [],
    height: [],
    date: [],
    lfColor: [],
  };
  let height = document.getElementById("height");
  let weight = document.getElementById("weight");
  let result;
  let btnClick = document.querySelector(".result_btn");
  let show_result = document.querySelector(".result_pic");
  let advice_sp = document.querySelector(".advice span");
  let lc = document.querySelector(".leftColor");
  let Vw, Vh;
  let daLI;
  let daBMI;
  let daWeight;
  let daHeight;
  let daDate;
  let dalfColor;
  let col = data.color[check_BMI(result)];
  window.onload=function(){
    updateList();
  }
  // updateList();
  function setLocal() {
    data.adviceLI.push(data.advice[check_BMI(result)]);
    data.bmi.push(result);
    data.weight.push(Vw);
    data.height.push(Vh * 100);
    data.date.push(getDate());
    data.lfColor.push(data.color[check_BMI(result)]);
    adviceString = toString(data.adviceLI);
    bmiString = toString(data.bmi);
    weightString = toString(data.weight);
    heightString = toString(data.height);
    dateString = toString(data.date);
    lfColorString = toString(data.lfColor);
    localStorage.setItem("advice", adviceString);
    localStorage.setItem("bmi", bmiString);
    localStorage.setItem("weight", weightString);
    localStorage.setItem("height", heightString);
    localStorage.setItem("date", dateString);
    localStorage.setItem("lfColor", lfColorString);
    load();
    updateList();
  }
  btnClick.addEventListener("click", cacBMI);
  function cacBMI() {
    load();
    updateList();
    Vh = height.value / 100;
    Vw = weight.value;
    heightSquare = Vh * Vh;
    let bmi = Vw / heightSquare;
    result = Math.floor(bmi * 100) / 100;
    changeBtn(result);
    setLocal();
    let resultPic = document.querySelector(".result_pic");
    resultPic.addEventListener("click", setDefault, false);

    document.querySelector(".list").style.display = "block";
  }
  function setDefault() {
    load();
    updateList();
    let winput = document.querySelector(".weight_input");
    let hinput = document.querySelector(".height_input");
    winput.value = "";
    hinput.value = "";
    show_result.style.display = "none";
    btnClick.style.display = "flex";
  }
  function getDate() {
    let dt = new Date();
    let date =
      dt.getFullYear() +
      " 年 " +
      (dt.getMonth() + 1) +
      " 月 " +
      dt.getDate() +
      " 日";
    return date;
  }
  function leftColorChange(color) {
    let leftColor = document.querySelector(".leftColor");
    leftColor.style.background = "color";
  }
  function check_BMI(result) {
    if (result < 18.5) {
      changeColor(data.color[0]);
      return 0;
    } else if (result >= 18.5 && result < 24) {
      changeColor(data.color[1]);
      return 1;
    } else if (result >= 24 && result < 27) {
      changeColor(data.color[2]);
      return 2;
    } else if (result >= 27 && result < 30) {
      changeColor(data.color[3]);
      return 3;
    } else if (result >= 30 && result < 35) {
      changeColor(data.color[4]);
      return 4;
    } else {
      changeColor(data.color[5]);
      return 5;
    }
  }
  function changeBtn(result) {
    btnClick.style.display = "none";
    show_result.style.display = "flex";
    advice_sp.textContent = result;
    let bmi_result = data.advice[check_BMI(result)];
    let rAd = document.querySelector(".r_Advice");
    rAd.textContent = bmi_result;
  }
  function toString(array) {
    return JSON.stringify(array);
  }
  function load() {
    daLI = JSON.parse(localStorage.getItem("advice")) || [];
    daBMI = JSON.parse(localStorage.getItem("bmi")) || [];
    daWeight = JSON.parse(localStorage.getItem("weight")) || [];
    daHeight = JSON.parse(localStorage.getItem("height")) || [];
    daDate = JSON.parse(localStorage.getItem("date")) || [];
    dalfColor = JSON.parse(localStorage.getItem("lfColor")) || [];
  }
  function updateList() {
    let tmp = "";
    load();
    let li = document.querySelector(".list");
    for (let i = 0; i < daLI.length; i++) {
      let str = "";
      let space =
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
      str +=
        "<li class=li-" +
        i +
        ">" +
        "<div " +
        " class='leftColor-" +
        i +
        "" +
        "'></div>" +
        "<div" +
        " data-index=" +
        i +
        " class='del btn-" +
        i +
        "'>刪除</div>" +
        daLI[i] +
        space +
        "BMI:" +
        daBMI[i] +
        space +
        "weight:" +
        daWeight[i] +
        space +
        "height:" +
        daHeight[i] +
        "cm" +
        space +
        space +
        daDate[i];
      tmp += str;
    }
    li.innerHTML = tmp;
    load();
    for (let r = 0; r < dalfColor.length; r++) {
      let lf = ".leftColor-" + r;
      let li = ".li-" + r;
      let lfC = document.querySelector(lf);
      let liC = document.querySelector(li);
      bl = "5px solid" + " " + dalfColor[r];
      lfC.style.borderLeft = bl;
      lfC.style.height = "70px";
      lfC.style.width = "10px";
      lfC.style.position = "absolute";
      lfC.style.left = "0px";
      lfC.style.top = "0px";
      liC.style.position = "relative";
    }
    for (let r = 0; r < dalfColor.length; r++) {
      let btn = ".btn-" + r;
      let del = document.querySelector(btn);
      del.addEventListener("click", deleteItem, false);
    }
  }
  function deleteItem(e) {
    load();
    let index = e.target.dataset.index;
    data.adviceLI.splice(index, 1);
    data.bmi.splice(index, 1);
    data.weight.splice(index, 1);
    data.height.splice(index, 1);
    data.date.splice(index, 1);
    data.lfColor.splice(index, 1);
    daLI.splice(index, 1);
    daBMI.splice(index, 1);
    daWeight.splice(index, 1);
    daHeight.splice(index, 1);
    daDate.splice(index, 1);
    dalfColor.splice(index, 1);
    localStorage.setItem("advice", JSON.stringify(daLI));
    localStorage.setItem("bmi", JSON.stringify(daBMI));
    localStorage.setItem("weight", JSON.stringify(daWeight));
    localStorage.setItem("height", JSON.stringify(daHeight));
    localStorage.setItem("date", JSON.stringify(daDate));
    localStorage.setItem("lfColor", JSON.stringify(dalfColor));
    updateList();
  }
  function changeColor(color) {
    let advice = document.querySelector(".advice");
    let ball_img = document.querySelector(".ball img");
    let result_pic = document.querySelector(".result_pic");
    let rAd = document.querySelector(".r_Advice");
    advice.style.color = color;
    ball_img.style.border = "5px solid " + color;
    ball_img.style.background = color;
    result_pic.style.border = "5px solid " + color;
    rAd.style.color = color;
    advice.style.color = color;
  }
})();
