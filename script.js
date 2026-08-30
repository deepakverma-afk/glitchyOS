const timeElement = document.getElementById("timeElement");
const welcomeWindow = document.getElementById("welcome");
const welcomeClose = document.getElementById("welcomeclose");
const welcomeOpen = document.getElementById("welcomeOpen");
const desktopIcon = document.getElementById("desktopIcon");

let highestZIndex = 10;

function updateTime() {
  timeElement.textContent = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date());
}

function focusWindow(element) {
  highestZIndex += 1;
  element.style.zIndex = highestZIndex;
}

function openWindow(element) {
  element.style.display = "flex";
  focusWindow(element);
}

function closeWindow(element) {
  element.style.display = "none";
}

function dragElement(element) {
  let initialX = 0;
  let initialY = 0;
  let currentX = 0;
  let currentY = 0;

  const header = document.getElementById(element.id + "header");

  if (header) {
    header.onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(event) {
    event.preventDefault();
    initialX = event.clientX;
    initialY = event.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = drag;
    focusWindow(element);
  }

  function drag(event) {
    event.preventDefault();
    currentX = initialX - event.clientX;
    currentY = initialY - event.clientY;
    initialX = event.clientX;
    initialY = event.clientY;
    element.style.top = `${element.offsetTop - currentY}px`;
    element.style.left = `${element.offsetLeft - currentX}px`;
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

welcomeClose.addEventListener("click", () => closeWindow(welcomeWindow));
welcomeOpen.addEventListener("click", () => openWindow(welcomeWindow));
desktopIcon.addEventListener("click", () => openWindow(welcomeWindow));

dragElement(welcomeWindow);
updateTime();
setInterval(updateTime, 1000);