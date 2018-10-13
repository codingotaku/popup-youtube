const { remote } = require("electron");
const maximize = document.getElementById("maximize");
const minimize = document.getElementById("minimize");
const close = document.getElementById("close");
const linkField = document.getElementById("url");
const frame = document.getElementById("frame");
const container = document.getElementById("container");
const pin = document.getElementById("top");
const youtube = "https://www.youtube-nocookie.com";
const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|playlist\?|\/watch\?v=|\&v=|\?v=)([^#\&\?]*)(.*)/; //untested regex

const win = remote.BrowserWindow.getFocusedWindow();
container.onmouseover = () => (linkField.style.display = "block");
container.onmouseout = () => {
  if (frame.src) {
    linkField.style.display = "none";
  }
};

pin.onclick = () => {
  if (win.isAlwaysOnTop()) {
    win.setAlwaysOnTop(false);
    pin.innerText = "pin";
  } else {
    win.setAlwaysOnTop(true);
    pin.innerText = "unpin";
  }
};
maximize.onclick = () => {
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
};

minimize.onclick = () => win.minimize();
close.onclick = () => win.close();

linkField.onkeypress = event => {
  if (event.key === "Enter") {
    url = linkField.value;
    if (url != undefined || url != "") {
      let match = url.match(regExp);
      if (match) {
        let src = `${youtube}/embed/${match[2]}`;
        if (match[2].length === 11 && match[3]) {
          src = `${youtube}/embed/videoseries?v=${match[2]}&${match[3]}`;
        } else if (match[2].startsWith("list")) {
          src = `${youtube}/embed/videoseries?${match[2]}`;
        }

        //No related video on ending screen, autoplay videos, and remove annotations.
        src += "&rel=0&autoplay=1&iv_load_policy=3";
        frame.setAttribute("src", src);
        linkField.style.display = "none";
      } else {
        linkField.select();
        alert("Invalid URL!");
      }
    }
  }
};
