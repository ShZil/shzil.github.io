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
    interactedWith: false,
    picked: undefined
  }
}

renderSwitcher();
document.querySelector("#switcher").onclick = switcherClicked;

const updater = window.setInterval(update, 10);
