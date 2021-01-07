const settings = {
  switcher: {
    logClicks: true,
    logChoice: true,
    mouseTracker: {
      color: "red"
    }
  }
}

renderSwitcher();
document.querySelector("#switcher").onclick = switcherClicked;
