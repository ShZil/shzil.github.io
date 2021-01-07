const settings = {
  switcher: {
    logClicks: true,
    logChoice: true,
    mouseTracker: {
      color: "lime"
    }
  }
}

renderSwitcher();
document.querySelector("#switcher").onclick = switcherClicked;
