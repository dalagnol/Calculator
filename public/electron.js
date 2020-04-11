const electron = require("electron");
const { app, BrowserWindow, Menu } = electron;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

const menuTemplate = [
  {
    label: app.name,
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services" },
      { type: "separator" },
      { role: "hide" },
      { role: "hideothers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" }
    ]
  }
];

const menu = Menu.buildFromTemplate(menuTemplate);

Menu.setApplicationMenu(menu);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 245,
    height: 355,
    resizable: false,
    titleBarStyle: "hidden",
    title: "Abacus",
    maximizable: false
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
