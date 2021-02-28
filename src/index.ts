import { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron';
import * as chess from 'chess'
import { Game } from './gameInterface';
import { Position } from './gameTypes';
import { forEachAsync } from './async';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  createWindow();
  let gameId = "" + Date.now()
  let game: Game = { gameId, turn: 0, winner: "", gameBoard: await chess.initBoard(), history: { movementLog: [], beatenLog: { white: [], black: [] } } }
  ipcMain.on('start-up', (event, arg: Game) => {
    event.reply('update', game)
  })


  ipcMain.on('tryMove', async (event, arg: string) => {
    let pos: Position = { x: Number.parseInt(arg[0]), y: Number.parseInt(arg[1]) }
    let tempMoves: Position[] = (await chess.determinPossibleMoves(pos, game.history.movementLog, game.gameBoard)).pos
    let moves: Position[] = []
    await forEachAsync(tempMoves, async move => {
      // registers move 
      let flag = false
      let backup = await chess.doMove(game, game.gameBoard[(await chess.buildKey(pos))], game.gameBoard[(await chess.buildKey(move))])
      let check = await chess.kingInCheck(game, game.gameBoard[(await chess.buildKey(move))].player)
      // checks the position would be in check rule
      if (check.length > 0) {
        flag = true
      }
      // undo move 
      await chess.undoMove(game.gameBoard[(await chess.buildKey(pos))], game.gameBoard[(await chess.buildKey(move))], backup)
      // show only moves which are not in check rule
      if (!flag) moves.push({ x: move.x, y: move.y })
    })
    event.reply('tryMove-reply', moves)
  })

  ipcMain.on('makeMove', async (event, arg: string[]) => {
    game = await chess.executeMove(game, { x: Number.parseInt(arg[0][0]), y: Number.parseInt(arg[0][1]) }, { x: Number.parseInt(arg[1][0]), y: Number.parseInt(arg[1][1]) })
    event.reply('update', game)
  })

});



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
