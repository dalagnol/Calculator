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
  },
  {
    label: "File",
    submenu: [{ role: "close" }, { role: "minimize" }]
  },
  {
    label: "Edit",
    submenu: [{ role: "copy" }, { role: "paste" }]
  },
  {
    label: "View",
    submenu: [
      {
        label: "Themes",
        submenu: [
          { type: "radio", label: "Light", enabled: true, checked: true },
          { type: "radio", label: "Dark", enabled: false, checked: false },
          { type: "radio", label: "Girly", enabled: false, checked: false }
        ]
      },
      { type: "radio", label: "Elementary", enabled: true, checked: true },
      { type: "radio", label: "Scientific", enabled: false, checked: false },
      { type: "radio", label: "Programmer", enabled: false, checked: false },
      { type: "separator" },
      {
        type: "normal",
        label: "Show thousand separators",
        enabled: false,
        checked: true
      }
    ]
  },
  {
    label: "Help",
    submenu: [{ type: "normal", label: "You are on your own" }]
  }
];

const menu = Menu.buildFromTemplate(menuTemplate);

Menu.setApplicationMenu(menu);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 255,
    height: 380,
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

  mainWindow.removeMenu();
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
