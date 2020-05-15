const electron = require("electron");
const { app, ipcMain, BrowserWindow, Menu, nativeTheme } = electron;

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
      { type: "radio", label: "Elementary", enabled: true, checked: true },
      { type: "radio", label: "Scientific", enabled: false, checked: false },
      { type: "radio", label: "Programmer", enabled: false, checked: false },
      { type: "separator" },
      {
        label: "Themes",
        submenu: [
          {
            type: "radio",
            label: "Light",
            enabled: true,
            checked: false,
            click() {
              mainWindow.webContents.send("theme", "light");
            }
          },
          {
            type: "radio",
            label: "Dark",
            enabled: true,
            checked: false,
            click() {
              mainWindow.webContents.send("theme", "dark");
            }
          },
          {
            type: "radio",
            label: "Automatic",
            enabled: true,
            checked: false,
            click() {
              mainWindow.webContents.send(
                "theme",
                "automatic",
                nativeTheme.shouldUseDarkColors
              );
            }
          }
        ]
      },
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

const byLabel = label => entry => entry.label === label;

Menu.setApplicationMenu(menu);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 255,
    height: 380,
    resizable: false,
    titleBarStyle: "hidden",
    title: "Abacus",
    webPreferences: {
      nodeIntegration: true
    },
    maximizable: false
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.removeMenu();
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.webContents.openDevTools();
  ipcMain.on("init", (...args) => {
    menuTemplate
      .find(byLabel("View"))
      .submenu.find(byLabel("Themes"))
      .submenu.forEach(
        x =>
          (x.checked =
            (["automatic", "light", "dark"].includes(args[1]) &&
              x.label.toLowerCase() === args[1]) ||
            (args[1] ? x.label === args[1] : x.label === "Automatic"))
      );

    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
    //Menu.setApplicationMenu([]);
    mainWindow.webContents.send(
      "theme",
      menuTemplate
        .find(byLabel("View"))
        .submenu.find(byLabel("Themes"))
        .submenu.find(x => x.checked === true)?.label
    );
  });
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
