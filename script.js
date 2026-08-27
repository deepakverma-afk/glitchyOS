const clock = document.getElementById("clock");
const windows = document.querySelectorAll(".os-window");
let highestZIndex = 10;

function updateClock() {
  clock.textContent = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date());
}

function focusWindow(windowElement) {
  highestZIndex += 1;
  windowElement.style.zIndex = highestZIndex;
}

function openWindow(windowId) {
  const windowElement = document.getElementById(windowId);
  if (!windowElement) return;

  windowElement.hidden = false;
  focusWindow(windowElement);
}

function closeWindow(windowElement) {
  windowElement.hidden = true;
}

function closeIntro() {
  const introWindow = document.getElementById("introPopup");
  if (introWindow) closeWindow(introWindow);
}

document.querySelectorAll("[data-open-window]").forEach((icon) => {
  icon.addEventListener("click", () => openWindow(icon.dataset.openWindow));
});

windows.forEach((windowElement) => {
  const closeButton = windowElement.querySelector(".window-close");
  const enterButton = windowElement.querySelector(".enter-btn");
  const header = windowElement.querySelector(".window-header");

  closeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    closeWindow(windowElement);
  });
  enterButton?.addEventListener("click", closeIntro);
  windowElement.addEventListener("pointerdown", () => focusWindow(windowElement));

  header.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;

    const startX = event.clientX;
    const startY = event.clientY;
    const startLeft = windowElement.offsetLeft;
    const startTop = windowElement.offsetTop;
    const onMove = (moveEvent) => {
      windowElement.style.left = `${startLeft + moveEvent.clientX - startX}px`;
      windowElement.style.top = `${startTop + moveEvent.clientY - startY}px`;
      windowElement.style.transform = "none";
    };
    const onUp = () => document.removeEventListener("pointermove", onMove);

    focusWindow(windowElement);
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp, { once: true });
  });
});

updateClock();
setInterval(updateClock, 1000);