import * as vscode from 'vscode';

export class StatusBarUi {

  private static _statusBarItem: vscode.StatusBarItem;


  private static get statusBarItem() {
    if (!StatusBarUi._statusBarItem) {
      StatusBarUi._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 200);
      this.statusBarItem.show();
    }

    return StatusBarUi._statusBarItem;
  }

  static init() {
    StatusBarUi.working("Starting...");
    setTimeout(function () {
      StatusBarUi.compileScss();
    }, 1000);
  }

  static compiling() {
    StatusBarUi.statusBarItem.text = `$(pulse) Compiling...`;
    StatusBarUi.statusBarItem.color = '#56ca00';
  }

  static compileScss() {
    StatusBarUi.statusBarItem.text = `$(eye) Compile SCSS`;
    StatusBarUi.statusBarItem.color = '#27c1ad';
    StatusBarUi.statusBarItem.command = 'vswebcompilerflow.compile';
    StatusBarUi.statusBarItem.tooltip = 'live compilation of SCSS to CSS';
  }

  static working(workingMsg: string = "Working on it...") {
    StatusBarUi.statusBarItem.text = `$(pulse) ${workingMsg}`;
    StatusBarUi.statusBarItem.tooltip = 'In case if it takes long time, Show output window and report.';
  }

  // Quick status bar messages after compile success or error
  static compilationSuccess() {
    StatusBarUi.statusBarItem.text = `$(check) Success`;
    StatusBarUi.statusBarItem.color = '#33ff00';

    StatusBarUi.compileScss();
  }
  static compilationError() {
    StatusBarUi.statusBarItem.text = `$(x) Error`;
    StatusBarUi.statusBarItem.color = '#ff0033';

    StatusBarUi.compileScss();
  }

  static dispose() {
    StatusBarUi.statusBarItem.dispose();
  }
}