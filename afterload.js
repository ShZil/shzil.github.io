const settings = {
  switcher: {
    logClicks: true,
    logChoice: true,
    mouseTracker: {
      color: "red"
    }
  },
  update: {
    speed: 0.3,
    continuity: 5,
    header: 6,
    interactedWith: false,
    picked: undefined
  },
  header: {
    starRadius: 0.8,
    starCount: 100
  }
}

renderSwitcher();
document.querySelector("#switcher").onclick = switcherClicked;

init();
const updater = window.setInterval(update, 10);
