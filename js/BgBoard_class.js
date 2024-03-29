// BgBoard_class.js
'use strict';

class BgBoard {
  constructor(gamemode, arg1 = null, arg2 = null, arg3 = null) {
    let boardtype = null;
    let rotation = "ccw";
    this.boardAppFlag = false;
    this.gameObj = null;
    switch(gamemode) { //呼出し元アプリ毎の設定
    case "problemPager":
      boardtype = arg1;
      rotation = arg2;
      break;
    case "bgBoardApp":
      this.boardAppFlag = true;
      this.gameObj = arg1;
      break;
    case "bgKifuViewer":
    default:
      break;
    }

    this.xgidstr = "XGID=------------------------------:0:0:0:00:0:0:0:0:0";
    this.leftrightFlag = (rotation === 'cw'); //true: Left bearoff, false: Right bearoff
    this.topbottomFlag = true; //true: player2 is bottom, player1 is top
    this.mainBoard = $('#board'); //need to define before bgBoardConfig()
    this.bgBoardConfig();
    this.prepareSvgDice();
    this.mainBoard.addClass(boardtype);
    this.setDomNameAndStyle();
    if (this.leftrightFlag) { this.flipHorizOrientation(); }
  } //end of constructor()

  prepareSvgDice() {
    this.svgDice = [];
    this.svgDice[0]  = '';
    this.svgDice[1]  = '<svg class="dice-one" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">';
    this.svgDice[1] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[1] += '<circle cx="90" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[1] += '</svg>';
    this.svgDice[2]  = '<svg class="dice-two" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">';
    this.svgDice[2] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[2] += '<circle cx="50" cy="130" r="8" stroke-width="18"/>';
    this.svgDice[2] += '<circle cx="130" cy="50" r="8" stroke-width="18"/>';
    this.svgDice[2] += '</svg>';
    this.svgDice[3]  = '<svg class="dice-three" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">';
    this.svgDice[3] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[3] += '<circle cx="48" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[3] += '<circle cx="90" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[3] += '<circle cx="132" cy="48" r="8" stroke-width="18" />';
    this.svgDice[3] += '</svg>';
    this.svgDice[4]  = '<svg class="dice-four" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">';
    this.svgDice[4] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[4] += '<circle cx="48" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[4] += '<circle cx="48" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[4] += '<circle cx="132" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[4] += '<circle cx="132" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[4] += '</svg>';
    this.svgDice[5]  = '<svg class="dice-five" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">';
    this.svgDice[5] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[5] += '<circle cx="48" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[5] += '<circle cx="48" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[5] += '<circle cx="90" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[5] += '<circle cx="132" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[5] += '<circle cx="132" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[5] += '</svg>';
    this.svgDice[6]  = '<svg class="dice-six" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">';
    this.svgDice[6] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[6] += '<circle cx="48" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[6] += '<circle cx="48" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[6] += '<circle cx="48" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[6] += '<circle cx="132" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[6] += '<circle cx="132" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[6] += '<circle cx="132" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[6] += '</svg>';
    this.svgDice[7]  = '<svg class="dice-six" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">';
    this.svgDice[7] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[7] += '<circle cx="65" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[7] += '<circle cx="65" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[7] += '<circle cx="40" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[7] += '<circle cx="90" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[7] += '<circle cx="115" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[7] += '<circle cx="140" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[7] += '<circle cx="115" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[7] += '</svg>';
  }

  setDomNameAndStyle() {
    let xh;

    //bar
    xh = '<div id="bar" class="bar"></div>';
    this.mainBoard.append(xh);
    $("#bar").css(this.getPosObj(this.pointX[0], 0));

    //offtray
    xh  = '<div id="offtray1" class="offtray"></div>';
    xh += '<div id="offtray2" class="offtray"></div>';
    this.mainBoard.append(xh);
    this.offtray = [null, $('#offtray1'), $('#offtray2')];
    if (this.boardAppFlag) {
      $("#offtray1").css(this.getPosObj(15 * this.pointWidth, 50 * this.vh));
      $("#offtray2").css(this.getPosObj(15 * this.pointWidth, 0));
      $("#offtray1, #offtray2").css({"border":"6px solid", "border-color":"inherit"});
    } else {
      $("#offtray1").css(this.getPosObj( 0 * this.pointWidth - this.offtrayMargin, 0));
      $("#offtray2").css(this.getPosObj(16 * this.pointWidth, 0));
    }

    //point triangles
    this.point = [];
    const pointColorClass = ["pt_dnev", "pt_dnod", "pt_upev", "pt_upod"];
    for (let i = 1; i < 29; i++) {
      const colfig = ((i>14) ? 1 : 0) * 2 + (i % 2); //0=under+even, 1=under+odd, 2=upper+even, 3=upper+odd
      const xh = '<div id="pt' + i + '" class="point ' + pointColorClass[colfig] + '"></div>';
      this.mainBoard.append(xh);
      this.point[i] = $('#pt' + i);
      const ey = (i > 14) ? 0 : this.mainBoardHeight - this.point[i].height();
      this.point[i].css(this.getPosObj(this.pointX[i], ey));
    }
    this.pointAll = $(".point");

    //label
    this.labels = [];
    for (let i = 1; i < 29; i++) {
      const xh = '<div id="lb' + i + '" class="label"></div>';
      this.mainBoard.append(xh);
      this.labels[i] = $('#lb'+i);
      const ey = (i > 14) ? this.upperlabelY : this.lowerlabelY;
      this.labels[i].css(this.getPosObj(this.pointX[i], ey));
      if (this.boardAppFlag) { this.labels[i].hide(); }
    }

    //cube
    xh  = '<div id="cube" class="cube">64</div>';
    this.mainBoard.append(xh);
    this.cube = $('#cube');
    this.cube.css(this.getPosObj(this.cubeX, this.cubeY[0]));

    //dice
    xh  = '<div id="dice10" class="dice"></div>';
    xh += '<div id="dice11" class="dice"></div>';
    xh += '<div id="dice20" class="dice"></div>';
    xh += '<div id="dice21" class="dice"></div>';
    this.mainBoard.append(xh);
    this.dice = [[],[$('#dice10'),$('#dice11')],[$('#dice20'),$('#dice21')]];
    this.dice[1][0].css(this.getPosObj(this.dice10X, this.diceY));
    this.dice[1][1].css(this.getPosObj(this.dice11X, this.diceY));
    this.dice[2][0].css(this.getPosObj(this.dice20X, this.diceY));
    this.dice[2][1].css(this.getPosObj(this.dice21X, this.diceY));

    //stack counter
    this.stacks = [];
    for (let i = 0; i < 32; i++) {
      const xh = '<div id="st' + i + '" class="stack"></div>';
      this.mainBoard.append(xh);
      this.stacks[i] = $('#st' + i);
    }

    //Chequer
    this.chequer = [[],[],[]];
    for (let j = 1; j < 3; j++) {
      for (let i = 0; i < 18; i++) {
        this.chequer[j][i] = new Chequer(j, i);
        const xh = this.chequer[j][i].domhtml;
        this.mainBoard.append(xh);
        this.chequer[j][i].dom = true;
      }
    }
  }

  flipHorizOrientation() {
    this.flipHoriz();
    this.pointX[28] = (this.leftrightFlag) ? this.leftSideOff  - this.offtrayMargin
                                           : this.rightSideOff + this.offtrayMargin;
//    this.leftrightFlag = !this.leftrightFlag;
//    this.showBoard(this.xgidstr);
  }

  flipHorizFlag() {
    this.leftrightFlag = !this.leftrightFlag;
  }

  flipHoriz() {
    let i, j;
    for (i = 1; i < 8; i++) {
      j = 15 - i;
      BgUtil.swap(this.pointX, i, j);
      BgUtil.swap(this.labels, i, j);
      BgUtil.swap(this.stacks, i, j);
    }
    for (i = 15; i < 22; i++) {
      j = 41 - i;
      BgUtil.swap(this.pointX, i, j);
      BgUtil.swap(this.labels, i, j);
      BgUtil.swap(this.stacks, i, j);
    }
  }

  flipTopAndBottom(tbflag) {
    this.topbottomFlag = tbflag;
    this.filpDicePos();
    this.showBoard(this.xgidstr);
  }

  filpDicePos() {
    if (this.topbottomFlag) {
      this.dice[1][0].css(this.getPosObj(this.dice10X, this.diceY));
      this.dice[1][1].css(this.getPosObj(this.dice11X, this.diceY));
      this.dice[2][0].css(this.getPosObj(this.dice20X, this.diceY));
      this.dice[2][1].css(this.getPosObj(this.dice21X, this.diceY));
    } else {
      this.dice[1][0].css(this.getPosObj(this.dice20X, this.diceY));
      this.dice[1][1].css(this.getPosObj(this.dice21X, this.diceY));
      this.dice[2][0].css(this.getPosObj(this.dice10X, this.diceY));
      this.dice[2][1].css(this.getPosObj(this.dice11X, this.diceY));
    }
  }

  resetBoard() {
    this.showBoard("XGID=------------------------------:0:0:0:00:0:0:0:0:0");
  }

  showBoard(xgidstr) { // input for XGID string
    this.showBoard2( new Xgid(xgidstr) );
  }

  showBoard2(xg) { // input for XGID object
    this.xgidstr = xg.xgidstr;
    if (xg.get_boff(0) < 0 || xg.get_boff(1) < 0) {
      alert("Invalid XGID!!\n" + xg.xgidstr + "\nbearoff(0)=" + xg.get_boff(0) + "\nbearoff(1)=" + xg.get_boff(1));
    }
    this.showPosition(xg);
    this.showDiceAll(xg.get_turn(), xg.get_dice(1), xg.get_dice(2));
    this.showCube(xg);
    if (!this.boardAppFlag) { this.showLabels(xg.get_turn()); }
  }

  showCube(xg){
    const offer = xg.get_dbloffer();
    const pos = (!offer) ? xg.get_cubepos() : -1 * xg.get_turn();
    const val = (!offer) ? xg.get_cube() : xg.get_cube() + 1;
    const crawford = xg.get_crawford();
    const cubepos = BgUtil.cvtTurnXg2Bd(pos);
    const cubeval = BgUtil.calcCubeDisp(val, crawford);
    const cubePosClass = ["cubepos0", "cubepos1", "cubepos2"];
    const cubePosJoin = cubePosClass.join(" ");
    const which = (this.topbottomFlag) ? cubepos : BgUtil.getBdOppo(cubepos);
    this.cube.text(cubeval).css(this.getPosObj(this.cubeX, this.cubeY[which]))
             .removeClass(cubePosJoin).addClass(cubePosClass[cubepos])
             .toggleClass("cubeoffer", offer);
  }

  showDiceAll(turn, d1, d2) {
    switch( BgUtil.cvtTurnXg2Bd(turn) ) {
    case 0:
      this.showDice(1, d1, 0);
      this.showDice(2, d2, 0);
      break;
    case 1:
      this.showDice(1, d1, d2);
      this.showDice(2, 0,  0);
      break;
    case 2:
      this.showDice(1, 0,  0);
      this.showDice(2, d1, d2);
      break;
    }
  }

  showDice(turn, d0, d1) {
    const dicefaceClass = ["", "diceface1", "diceface2"];
    this.dice[turn][0].html(this.svgDice[d0]);
    this.dice[turn][1].html(this.svgDice[d1]);
    this.dice[turn][0].children("svg").addClass(dicefaceClass[turn]);
    this.dice[turn][1].children("svg").addClass(dicefaceClass[turn]);
    (d0 == 0) ? this.dice[turn][0].hide() : this.dice[turn][0].show();
    (d1 == 0) ? this.dice[turn][1].hide() : this.dice[turn][1].show();
  }

  showLabels(turn) {
    const which = (turn == 1 && this.topbottomFlag) || (turn == -1 && !this.topbottomFlag);
    for (let i = 1; i < 29; i++) {
      let c = (turn == 0) ? "" : (which) ? i : 29 - i;
      this.labels[i].text(c);
    }
  }

  showPosition(xg) {
    //XGIDから各ポイントの駒を数える
    let piecePointer = [0, 0, 0];
    for (let pt = 0; pt <= 29; pt++) {
      const num = xg.get_ptno(pt);
      const player = BgUtil.cvtTurnXg2Bd(xg.get_ptcol(pt));
      for (let j = 0; j < num; j++) {
        this.chequer[player][piecePointer[player]].point = pt;
        this.chequer[player][piecePointer[player]].stack = num;
        piecePointer[player] += 1;
      }
    }

    //XGIDにでてこない駒は上がっている駒
    for (let player = 1; player <= 2; player++) {
      for (let i = piecePointer[player]; i < 18; i++) {
        const pt = (player == 1) ? 30 : 31;
        this.chequer[player][i].point = pt;
        this.chequer[player][i].stack = 18 - piecePointer[player];
      }
    }

    //駒をボードに並べる
    let ex, ey, ty, sf, bf;
    let ptStack = Array(32);
    ptStack.fill(0);
    for (let player = 1; player <= 2; player++) {
      for (let i = 0; i < 18; i++) {
        const pt = this.chequer[player][i].point;
        const st = this.chequer[player][i].stack;
        const which = (this.topbottomFlag) ? player : BgUtil.getBdOppo(player);
        const which2 = (pt > 14 && this.topbottomFlag) || (pt <= 14 && !this.topbottomFlag);
        bf = false;

        if (pt == 30 || pt == 31) { //bear off
          bf = true;
          ex = this.pointX[30];
          sf = false;
          ey = (which == 1) ? this.offY[which] - (ptStack[pt] * this.boffHeight)
                            : this.offY[which] + (ptStack[pt] * this.boffHeight); //player==2
        } else if (pt == 0 || pt == 29) { //on the bar
          ex = this.pointX[pt];
          sf = (st > this.barStackThreshold + 1);
          ty = (ptStack[pt] > this.barStackThreshold) ? this.barStackThreshold : ptStack[pt];
          ey = (pt == 0) ? this.barY[which] + (ty * this.pieceHeight)
                         : this.barY[which] - (ty * this.pieceHeight); //pt==29
        } else { //in field
          ex = this.pointX[pt];
          sf = (st > this.pointStackThreshold + 1);
          ty = (ptStack[pt] > this.pointStackThreshold) ? this.pointStackThreshold : ptStack[pt];
          ey = (which2) ? this.yupper + (ty * this.pieceHeight)
                        : this.ylower - (ty * this.pieceHeight);
        }
        ptStack[pt] += 1;
        const position = this.getPosObj(ex, ey);
        const zindex = 10 + ptStack[pt];
        this.chequer[player][i].stackidx = ptStack[pt];
        this.chequer[player][i].dom.css(position).css("z-index", zindex).toggleClass("bearoff", bf);
        this.showStackInfo(sf, pt, st, position, player);
      }
    }

  }

  showStackInfo(stackflag, pt, num, position, player) {
    const stackColorClass = ["", "stackcol1", "stackcol2"];
    this.stacks[pt].text("").removeClass(stackColorClass.join(" "));
    if (stackflag) {
      this.stacks[pt].text(num).css(position).addClass(stackColorClass[player]);
    }
  }

  animateChequer(xg, move, delay) {
    const fromto = move.split("/");
    const frpt = parseInt(fromto[0]);
    const topt = parseInt(fromto[1]);
    const player = BgUtil.cvtTurnXg2Bd(xg.turn);
    const hitflag = (topt == 29); // or (frpt < topt);

    const p2move = this.findFromPointChequer(player, frpt, hitflag); //動かす駒を探す
    const idx = p2move.idx;

    const aftPosObj = this.calcAftPosition(player, topt); //動かす先の情報を得る
    const toPosition = aftPosObj[0];
    const sf         = aftPosObj[1];
    const num        = aftPosObj[2];
    const toabs      = aftPosObj[3];
    const ckerowner  = aftPosObj[4];
    const duration = (hitflag) ? delay/2 : delay;
    this.chequer[ckerowner][idx].point = toabs;
    this.chequer[ckerowner][idx].stackidx = num;
    const promise = this.chequer[ckerowner][idx].dom.css({"z-index": 50 + num}).animate(toPosition, duration).promise();
    this.showStackInfo(sf, toabs, num, toPosition, ckerowner);

    return promise;
  }

  findFromPointChequer(player, frpt, hitflag) {
    const frabs = (player == 1) ? frpt : 29 - frpt;
    const ckerowner = (hitflag) ? BgUtil.getBdOppo(player) : player;

    const frPtChkers = this.chequer[ckerowner].filter(elem => (elem.point == frabs)); //ポイントの駒を得る
    const stackidxmax = Math.max(...frPtChkers.map(elem => elem.stackidx)); //一番上に積まれた駒番号を得て、
    const p2move = frPtChkers.find(elem => (elem.stackidx == stackidxmax)); //その駒オブジェクトを返す
    return p2move;
  }

  countToPointChequer(player, toabs) {
    const ckerowner = (toabs == 0 || toabs == 29) ? BgUtil.getBdOppo(player) : player;
    const toPtChkers = this.chequer[ckerowner].filter(elem => (elem.point == toabs)); //移動先の駒を数える
    return toPtChkers.length;
  }

  calcAftPosition(player, topt) {
    const ckerowner = (topt == 29) ? BgUtil.getBdOppo(player) : player;

    let toabs;
    if (topt == 0)       { toabs = (player == 1) ? 30 : 31; } //bear off
    else if (topt == 29) { toabs = (player == 1) ? 0 : 29; } //to bar
    else                 { toabs = (player == 1) ? topt : 29 - topt; } //in field

    const which = (this.topbottomFlag) ? ckerowner : BgUtil.getBdOppo(ckerowner);
    const which2 = (toabs > 14 && this.topbottomFlag) || (toabs <= 14 && !this.topbottomFlag);
    const num = this.countToPointChequer(player, toabs);

    //動かす先の駒の位置を計算
    let ty, ey, ex, st, sf;
    if (toabs == 30 || toabs == 31) { //bear off
      ex = this.pointX[30];
      sf = false;
      ey = (which == 1) ? this.offY[which] - (num * this.boffHeight)
                        : this.offY[which] + (num * this.boffHeight); //player==2
    } else if (toabs == 0 || toabs == 29) { //on the bar
      ex = this.pointX[topt];
      sf = (num > this.barStackThreshold + 1);
      ty = (num > this.barStackThreshold) ? this.barStackThreshold : num;
      ey = (toabs == 0) ? this.barY[which] + (ty * this.pieceHeight)
                        : this.barY[which] - (ty * this.pieceHeight); //topt==29
    } else { //in field
      ex = this.pointX[toabs];
      sf = (num > this.pointStackThreshold + 1);
      ty = (num > this.pointStackThreshold) ? this.pointStackThreshold : num;
      ey = (which2) ? this.yupper + (ty * this.pieceHeight)
                    : this.ylower - (ty * this.pieceHeight);
    }

    const toPosition = this.getPosObj(ex, ey);
    return [toPosition, sf, num + 1, toabs, ckerowner];
  }

  animateDice(msec) {
    const diceanimclass = "faa-shake animated"; //ダイスを揺らすアニメーション
    this.dice[1][0].addClass(diceanimclass);
    this.dice[1][1].addClass(diceanimclass);
    this.dice[2][0].addClass(diceanimclass); //見せないダイスも一緒に揺らす
    this.dice[2][1].addClass(diceanimclass);

    const defer = $.Deferred(); //deferオブジェクトからpromiseを作る
    setTimeout(() => { //msec秒待ってアニメーションを止める
      this.dice[1][0].removeClass(diceanimclass);
      this.dice[1][1].removeClass(diceanimclass);
      this.dice[2][0].removeClass(diceanimclass);
      this.dice[2][1].removeClass(diceanimclass);
      defer.resolve();
    }, msec);

    return defer.promise();
  }

  animateCube(msec) {
    const cubeanimclass = "faa-tada animated faa-fast"; //キューブオファーのアニメーション
    this.cube.addClass(cubeanimclass);

    const defer = $.Deferred(); //deferオブジェクトからpromiseを作る
    setTimeout(() => { //msec秒待ってアニメーションを止める
      this.cube.removeClass(cubeanimclass);
      defer.resolve();
    }, msec);

    return defer.promise();
  }

  bgBoardConfig() {
    //CSSで定義された数値情報を取得
    const style = getComputedStyle(document.documentElement);
    const boardHeightNum   = parseFloat(style.getPropertyValue('--boardHeightNum'));
    const boardWidthNum    = parseFloat(style.getPropertyValue('--boardWidthNum'));
    const pointWidthNum    = parseFloat(style.getPropertyValue('--pointWidthNum'));
    const cubeSizeNum      = parseFloat(style.getPropertyValue('--cubeSizeNum'));
    const frameSizeNum     = parseFloat(style.getPropertyValue('--frameSizeNum'));
    const offtrayMarginNum = parseFloat(style.getPropertyValue('--offtrayMarginNum'));

    //ボード表示のための位置と大きさの定数を計算
    this.mainBoardHeight = this.mainBoard.height();
    this.mainBoardWidth = this.mainBoard.width();

    this.vw = this.mainBoardWidth / boardWidthNum;
    this.vh = this.mainBoardHeight / boardHeightNum;

    this.pointWidth = pointWidthNum * this.vw;
    this.cubeSize = cubeSizeNum * this.vw;
    this.pieceWidth = this.pointWidth;
    const phr = this.mainBoardHeight / 15 / this.pieceWidth;
    const pieceHeightRatio = (phr > 1) ? 1 : phr;
    this.pieceHeight = this.pieceWidth * pieceHeightRatio;
    this.boffHeight = this.pieceWidth / 4 ;  //ベアオフの駒は立てたように表示
    this.offtrayMargin = offtrayMarginNum;

    if (this.boardAppFlag) {
      this.pointX = [7, 14, 13, 12, 11, 10,  9,  8,  6,  5,  4,  3,  2,  1,  0,
                         0,  1,  2,  3,  4,  5,  6,  8,  9, 10, 11, 12, 13, 14,  7, 15];
    } else {
      this.pointX = [8, 15, 14, 13, 12, 11, 10,  9,  7,  6,  5,  4,  3,  2,  1,
                         1,  2,  3,  4,  5,  6,  7,  9, 10, 11, 12, 13, 14, 15,  8, 16];
    }
    for (let i=0; i< this.pointX.length; i++) {
      this.pointX[i] *= this.pointWidth;
    }

    this.yupper = 0;
    this.ylower = this.mainBoardHeight - this.pieceWidth;

    const tray2Y = -0.4 * this.pieceHeight;
    const tray1Y = this.mainBoardHeight - this.pieceWidth - tray2Y;
    this.offY = [null, tray1Y, tray2Y];

    this.diceSize = this.pointWidth;
    this.diceY = this.mainBoardHeight / 2 - this.diceSize / 2;
    this.dice10X = this.pointX[3];
    this.dice11X = this.pointX[5];
    this.dice20X = this.pointX[10];
    this.dice21X = this.pointX[12];

    this.pointStackThreshold = 5;
    this.barStackThreshold = 3;


    this.cubeX = this.pointX[0] + 0.1 * this.vw; // cube class widthを加味
    const cubeY0 = Math.round(this.mainBoardHeight / 2 - this.cubeSize / 2);
    const cubeY2 = 5;
    const cubeY1 = this.mainBoardHeight - this.cubeSize - cubeY2;
    this.cubeY = [cubeY0, cubeY1, cubeY2];

    const bar1Y = this.mainBoardHeight / 2 - (this.pieceHeight * 2);
    const bar2Y = this.mainBoardHeight / 2 + this.pieceHeight;
    this.barY = [null, bar1Y, bar2Y];

    this.upperlabelY = - frameSizeNum * this.vw;
    this.lowerlabelY = this.mainBoardHeight;

    this.leftSideOff = 0;
    this.rightSideOff = this.mainBoardWidth - this.pieceWidth;

    if (this.boardAppFlag) {
      this.pointX[30] += offtrayMarginNum;
    } else {
      this.pointX[30] = (this.leftrightFlag) ? this.leftSideOff  - this.offtrayMargin
                                             : this.rightSideOff + this.offtrayMargin;
    }
  }

  getPosObj(x, y) {
    return {left:x, top:y}
  }

  getVw() {
    return this.vw;
  }
  getVh() {
    return this.vh;
  }

  getBarPos(player) {
    return this.getPosObj(this.pointX[29], this.barY[player]);
  }

  getDragEndPoint(pos, player) {
    const pos2ptz = [15,16,17,18,19,20,21,29,22,23,24,25,26,27,28,0,
                     14,13,12,11,10, 9, 8,29, 7, 6, 5, 4, 3, 2, 1,0];
    const px = Math.floor(pos.left / this.pointWidth + 0.5);
    const py = Math.floor(pos.top / this.mainBoardHeight * 2);
    const pt = pos2ptz[px + py * 16];

    if (pt == 0 || pt == 29) { return pt; }
    else {
      return (player == 1) ? pt : 29 - pt;
    }
  }

  getDragStartPoint(id, player) {
    const chker = this.chequer[player].find(elem => elem.domid == id);
    const pt = chker.point;
    const p = (player == 1) ? pt : 29 - pt;
    return p;
  }

  getChequerOnDragging(pt, player) {
    const aryreverse = this.chequer[player].reverse();
    const chker = aryreverse.find(elem => elem.point == pt); //一番上の(最後の)チェッカーを返す
    return chker;
  }

  getChequerHitted(ptt, player) {
    const pt = (player == 1) ? 29 - ptt : ptt;
    const chker = this.chequer[player].find(elem => elem.point == pt);
    return chker;
  }

  flashOnMovablePoint(destpt, player) {
    for (const dp of destpt) {
      if (dp == 0) { this.offtray[player].toggleClass("flash", true); }
      else { this.point[dp].toggleClass("flash", true); }
    }
  }

  flashOffMovablePoint() {
    this.pointAll.removeClass("flash");
    this.offtray[1].removeClass("flash");
    this.offtray[2].removeClass("flash");
  }

  redraw() {
    this.bgBoardConfig();

    //bar
    $("#bar").css(this.getPosObj(this.pointX[0], 0));
    //offtray
    if (this.boardAppFlag) {
      $("#offtray1").css(this.getPosObj(15 * this.pointWidth, 50 * this.vh));
      $("#offtray2").css(this.getPosObj(15 * this.pointWidth, 0));
    } else {
      $("#offtray1").css(this.getPosObj( 0 * this.pointWidth - this.offtrayMargin, 0));
      $("#offtray2").css(this.getPosObj(16 * this.pointWidth, 0));
    }
    //point triangles
    for (let i = 1; i < 29; i++) {
      const ey = (i > 14) ? 0 : this.mainBoardHeight - this.point[i].height();
      this.point[i].css(this.getPosObj(this.pointX[i], ey));
    }
    //label
    for (let i = 1; i < 29; i++) {
      const ey = (i > 14) ? this.upperlabelY : this.lowerlabelY;
      this.labels[i].css(this.getPosObj(this.pointX[i], ey));
    }
    //dice
    this.dice[1][0].css(this.getPosObj(this.dice10X, this.diceY));
    this.dice[1][1].css(this.getPosObj(this.dice11X, this.diceY));
    this.dice[2][0].css(this.getPosObj(this.dice20X, this.diceY));
    this.dice[2][1].css(this.getPosObj(this.dice21X, this.diceY));

    this.showBoard(this.xgidstr);
  }

} //class BgBoard
