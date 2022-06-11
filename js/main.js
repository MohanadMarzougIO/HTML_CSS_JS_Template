// Skills Progress
let skills = document.getElementById("our-skills");
let listSpan = document.querySelectorAll(".progress span");
let progRun = false;
//Latest Event
let eventDate = new Date("Dec 31, 2022 23:59:59").getTime();
let days = document.getElementById("days");
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
// Stats
let stats = document.getElementById("stats");
let statsList = document.querySelectorAll(".stats .box .number");
let statsRun = false;
// Videos
let videosLinks = document.querySelectorAll(".videos .list ul li");
let previewBoxList = document.querySelectorAll(".videos .preview .box");

videosLinks.forEach((li) => {
  li.onclick = function (e) {
    videosLinks.forEach((li) => {
      li.classList.remove("active");
    });
    previewBoxList.forEach((box) => {
      box.classList.remove("active");
    });
    li.classList.add("active");
    previewBoxList[li.dataset.index].classList.add("active");
  };
});

// Reset Progress spans
listSpan.forEach((span) => {
  span.style.width = 0;
});
// Reset stats Numbers
statsList.forEach((span) => {
  span.textContent = "0";
});

window.onscroll = function () {
  if (!progRun) {
    if (window.scrollY >= skills.offsetTop) {
      listSpan.forEach((span) => {
        span.style.width = span.parentElement.dataset.prog;
      });
      startProg = true;
    }
  }

  if (!statsRun) {
    if (window.scrollY >= stats.offsetTop - 70) {
      statsList.forEach((span) => {
        let goal = span.dataset.goal;
        let code = span.dataset.code;
        let counter = setInterval(() => {
          span.textContent++;
          if (span.textContent == goal) {
            clearInterval(counter);
            if (code) {
              span.textContent += code;
            }
          }
        }, goal / 2000);
      });
      statsRun = true;
    }
  }
};

let counter = setInterval(() => {
  let dateNow = Date.now();
  let dateDiff = eventDate - dateNow;
  let eDay = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let eHours = Math.floor(
    (dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let eMinutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let eSeconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

  days.textContent = eDay < 10 ? `0${eDay}` : eDay;
  hours.textContent = eHours < 10 ? `0${eHours}` : eHours;
  minutes.textContent = eMinutes < 10 ? `0${eMinutes}` : eMinutes;
  seconds.textContent = eSeconds < 10 ? `0${eSeconds}` : eSeconds;
  if (dateDiff <= 0) {
    clearInterval(counter);
  }
}, 1000);
