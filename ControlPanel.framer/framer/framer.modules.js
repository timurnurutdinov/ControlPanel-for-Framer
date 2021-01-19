require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ControlPanel":[function(require,module,exports){
var createControlPanel, findStack, getPanelFromSide, getStack, panelName, rowExists;

panelName = ".ControlPanel";

getStack = function(alignment, parent, sName, sWidth, sHeight, padding, offset) {
  var stackView;
  if (alignment == null) {
    alignment = "vertical";
  }
  if (parent == null) {
    parent = null;
  }
  if (sName == null) {
    sName = "some stack";
  }
  if (sWidth == null) {
    sWidth = 100;
  }
  if (sHeight == null) {
    sHeight = 100;
  }
  if (padding == null) {
    padding = 0;
  }
  if (offset == null) {
    offset = 20;
  }
  stackView = new Layer({
    parent: parent,
    width: sWidth,
    height: sHeight,
    name: "" + sName,
    backgroundColor: "null",
    custom: {
      alignment: alignment,
      padding: padding,
      offset: offset
    }
  });
  stackView.on("change:children", function() {
    var i, item, j, key, len, ref, results, sumPos;
    if (this.custom.alignment === "vertical") {
      key = {
        d: "y",
        s: "height"
      };
    } else if (this.custom.alignment === "horizontal") {
      key = {
        d: "x",
        s: "width"
      };
    } else if (this.custom.alignment === "horizontal-reverse") {
      key = {
        d: "x",
        s: "width"
      };
    }
    sumPos = this.custom.offset;
    ref = this.children;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      item = ref[i];
      if (this.custom.alignment === "horizontal" || this.custom.alignment === "vertical") {
        item[key.d] = sumPos;
      } else if (this.custom.alignment === "horizontal-reverse") {
        item[key.d] = this.width - sumPos - item[key.s];
      }
      results.push(sumPos += item[key.s] + this.custom.padding);
    }
    return results;
  });
  return stackView;
};

createControlPanel = function() {
  var leftPanel, panels, rightPanel;
  panels = new Layer({
    name: panelName,
    width: Canvas.width,
    height: Canvas.height,
    backgroundColor: "null"
  });
  leftPanel = getStack("vertical", panels, "left panel", 320, Canvas.height, 0, 20);
  rightPanel = getStack("vertical", panels, "right panel", 320, Canvas.height, 0, 20);
  return rightPanel.x = Align.right();
};

rowExists = function(layer, row) {
  var item, j, len, ref;
  ref = layer.children;
  for (j = 0, len = ref.length; j < len; j++) {
    item = ref[j];
    if (item.name === row) {
      return item;
    }
  }
  return null;
};

findStack = function(panel, row) {
  var selectedRow, stackAlignment;
  if (row == null) {
    row = "1";
  }
  if (panel.name === "right panel") {
    stackAlignment = "horizontal-reverse";
  } else {
    stackAlignment = "horizontal";
  }
  selectedRow = rowExists(panel, row);
  if (selectedRow !== null) {
    return selectedRow;
  } else {
    selectedRow = getStack(stackAlignment, panel, row, panel.width, 40, 6);
  }
  return selectedRow;
};

exports.breaker = function(side) {
  if (side == null) {
    side = "left";
  }
  return this.header("", side);
};

exports.header = function(label, side) {
  var headerView;
  if (label == null) {
    label = "Header";
  }
  if (side == null) {
    side = "left";
  }
  if (Layer.select(panelName) === void 0) {
    createControlPanel();
  }
  if (getPanelFromSide(side) === null) {
    return null;
  }
  headerView = new TextLayer({
    text: label,
    fontSize: 15,
    fontWeight: 500,
    color: "white",
    opacity: 0.6,
    padding: {
      top: 12,
      left: side === "left" ? 3 : 0,
      right: side === "right" ? 3 : 0
    }
  });
  headerView.parent = findStack(getPanelFromSide(side), Utils.randomNumber());
  return headerView;
};

getPanelFromSide = function(side) {
  if (side === "left") {
    return Layer.select(panelName).children[0];
  } else if (side === "right") {
    return Layer.select(panelName).children[1];
  }
  return null;
};

exports.button = function(label, handler, side, row, pV, pH) {
  var buttonView;
  if (label == null) {
    label = "Button";
  }
  if (handler == null) {
    handler = null;
  }
  if (side == null) {
    side = "left";
  }
  if (row == null) {
    row = "1";
  }
  if (pV == null) {
    pV = 6;
  }
  if (pH == null) {
    pH = 8;
  }
  if (Layer.select(panelName) === void 0) {
    createControlPanel();
  }
  if (getPanelFromSide(side) === null) {
    return null;
  }
  buttonView = new TextLayer({
    text: label,
    padding: {
      top: pV,
      bottom: pV + 2,
      left: pH,
      right: pH
    },
    fontSize: 15,
    fontWeight: 500,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8
  });
  buttonView.states = {
    "shown": {
      backgroundColor: "rgba(0,0,0,0.9)"
    },
    "hidden": {
      backgroundColor: "rgba(0,0,0,0.4)"
    }
  };
  buttonView.stateSwitch("hidden");
  buttonView.parent = findStack(getPanelFromSide(side), row);
  buttonView.on(Events.Tap, handler);
  return buttonView;
};


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Db250cm9sUGFuZWwtZm9yLUZyYW1lci9Db250cm9sUGFuZWwuZnJhbWVyL21vZHVsZXMvQ29udHJvbFBhbmVsLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cbnBhbmVsTmFtZSA9IFwiLkNvbnRyb2xQYW5lbFwiXG5cblxuIyBTdGFja1xuXG5nZXRTdGFjayA9IChhbGlnbm1lbnQgPSBcInZlcnRpY2FsXCIsIHBhcmVudCA9IG51bGwsIHNOYW1lID0gXCJzb21lIHN0YWNrXCIsIHNXaWR0aCA9IDEwMCwgc0hlaWdodCA9IDEwMCwgcGFkZGluZyA9IDAsIG9mZnNldCA9IDIwKSAtPlxuXHRzdGFja1ZpZXcgPSBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IHBhcmVudFxuXHRcdHdpZHRoOiBzV2lkdGhcblx0XHRoZWlnaHQ6IHNIZWlnaHRcblx0XHRuYW1lOiBcIiN7c05hbWV9XCJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwibnVsbFwiXG5cdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMCwwLC4yXCJcblx0XHRjdXN0b206XG5cdFx0XHRhbGlnbm1lbnQ6IGFsaWdubWVudFxuXHRcdFx0cGFkZGluZzogcGFkZGluZ1xuXHRcdFx0b2Zmc2V0OiBvZmZzZXRcblx0XG5cdHN0YWNrVmlldy5vbiBcImNoYW5nZTpjaGlsZHJlblwiLCAtPlxuXHRcdGlmIEBjdXN0b20uYWxpZ25tZW50ID09IFwidmVydGljYWxcIiB0aGVuIGtleSA9IHsgZDogXCJ5XCIsIHM6IFwiaGVpZ2h0XCIgfVxuXHRcdGVsc2UgaWYgQGN1c3RvbS5hbGlnbm1lbnQgPT0gXCJob3Jpem9udGFsXCIgdGhlbiBrZXkgPSB7IGQ6IFwieFwiLCBzOiBcIndpZHRoXCIgfVxuXHRcdGVsc2UgaWYgQGN1c3RvbS5hbGlnbm1lbnQgPT0gXCJob3Jpem9udGFsLXJldmVyc2VcIiB0aGVuIGtleSA9IHsgZDogXCJ4XCIsIHM6IFwid2lkdGhcIiB9XG5cdFx0XG5cdFx0c3VtUG9zID0gQGN1c3RvbS5vZmZzZXRcblx0XHRmb3IgaXRlbSwgaSBpbiBAY2hpbGRyZW5cblxuXHRcdFx0aWYgQGN1c3RvbS5hbGlnbm1lbnQgPT0gXCJob3Jpem9udGFsXCIgb3IgQGN1c3RvbS5hbGlnbm1lbnQgPT0gXCJ2ZXJ0aWNhbFwiIHRoZW4gaXRlbVtrZXkuZF0gPSBzdW1Qb3Ncblx0XHRcdGVsc2UgaWYgQGN1c3RvbS5hbGlnbm1lbnQgPT0gXCJob3Jpem9udGFsLXJldmVyc2VcIiB0aGVuIGl0ZW1ba2V5LmRdID0gQHdpZHRoIC0gc3VtUG9zIC0gaXRlbVtrZXkuc11cblxuXHRcdFx0c3VtUG9zICs9IGl0ZW1ba2V5LnNdICsgQGN1c3RvbS5wYWRkaW5nXG5cblx0XG5cdHJldHVybiBzdGFja1ZpZXdcblxuXG5cblxuXG5cblxuY3JlYXRlQ29udHJvbFBhbmVsID0gKCkgLT5cblx0cGFuZWxzID0gbmV3IExheWVyXG5cdFx0bmFtZTogcGFuZWxOYW1lXG5cdFx0d2lkdGg6IENhbnZhcy53aWR0aFxuXHRcdGhlaWdodDogQ2FudmFzLmhlaWdodFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJudWxsXCJcblx0XG5cdGxlZnRQYW5lbCA9IGdldFN0YWNrKFwidmVydGljYWxcIiwgcGFuZWxzLCBcImxlZnQgcGFuZWxcIiwgMzIwLCBDYW52YXMuaGVpZ2h0LCAwLCAyMClcblx0cmlnaHRQYW5lbCA9IGdldFN0YWNrKFwidmVydGljYWxcIiwgcGFuZWxzLCBcInJpZ2h0IHBhbmVsXCIsIDMyMCwgQ2FudmFzLmhlaWdodCwgMCwgMjApXG5cdHJpZ2h0UGFuZWwueCA9IEFsaWduLnJpZ2h0KClcblxuXG5yb3dFeGlzdHMgPSAobGF5ZXIsIHJvdykgLT5cblx0Zm9yIGl0ZW0gaW4gbGF5ZXIuY2hpbGRyZW5cblx0XHRpZiBpdGVtLm5hbWUgPT0gcm93IHRoZW4gcmV0dXJuIGl0ZW1cblx0cmV0dXJuIG51bGxcblxuZmluZFN0YWNrID0gKHBhbmVsLCByb3cgPSBcIjFcIikgLT5cblx0aWYgcGFuZWwubmFtZSA9PSBcInJpZ2h0IHBhbmVsXCIgdGhlbiBzdGFja0FsaWdubWVudCA9IFwiaG9yaXpvbnRhbC1yZXZlcnNlXCJcblx0ZWxzZSBzdGFja0FsaWdubWVudCA9IFwiaG9yaXpvbnRhbFwiXG5cblx0c2VsZWN0ZWRSb3cgPSByb3dFeGlzdHMocGFuZWwsIHJvdylcblx0aWYgc2VsZWN0ZWRSb3cgIT0gbnVsbCB0aGVuIHJldHVybiBzZWxlY3RlZFJvd1xuXHRlbHNlIHNlbGVjdGVkUm93ID0gZ2V0U3RhY2soc3RhY2tBbGlnbm1lbnQsIHBhbmVsLCByb3csIHBhbmVsLndpZHRoLCA0MCwgNilcblx0XG5cdHJldHVybiBzZWxlY3RlZFJvd1xuXG5cblxuXG5cblxuXG5cblxuXG5leHBvcnRzLmJyZWFrZXIgPSAoc2lkZSA9IFwibGVmdFwiKSAtPlxuXHRyZXR1cm4gdGhpcy5oZWFkZXIoXCJcIiwgc2lkZSlcblxuXG5leHBvcnRzLmhlYWRlciA9IChsYWJlbCA9IFwiSGVhZGVyXCIsIHNpZGUgPSBcImxlZnRcIikgLT5cblx0aWYgTGF5ZXIuc2VsZWN0KHBhbmVsTmFtZSkgPT0gdW5kZWZpbmVkIHRoZW4gY3JlYXRlQ29udHJvbFBhbmVsKClcblx0aWYgZ2V0UGFuZWxGcm9tU2lkZShzaWRlKSA9PSBudWxsIHRoZW4gcmV0dXJuIG51bGxcblx0XG5cdGhlYWRlclZpZXcgPSBuZXcgVGV4dExheWVyXG5cdFx0dGV4dDogbGFiZWxcblx0XHRmb250U2l6ZTogMTVcblx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0IyB0ZXh0QWxpZ246IHNpZGVcblx0XHRvcGFjaXR5OiAwLjZcblx0XHRwYWRkaW5nOlxuXHRcdFx0dG9wOiAxMlxuXHRcdFx0bGVmdDogaWYgc2lkZSA9PSBcImxlZnRcIiB0aGVuIDMgZWxzZSAwXG5cdFx0XHRyaWdodDogaWYgc2lkZSA9PSBcInJpZ2h0XCIgdGhlbiAzIGVsc2UgMFxuXHRcblx0aGVhZGVyVmlldy5wYXJlbnQgPSBmaW5kU3RhY2soZ2V0UGFuZWxGcm9tU2lkZShzaWRlKSwgVXRpbHMucmFuZG9tTnVtYmVyKCkpXG5cdHJldHVybiBoZWFkZXJWaWV3XG5cbmdldFBhbmVsRnJvbVNpZGUgPSAoc2lkZSkgLT5cblx0aWYgc2lkZSA9PSBcImxlZnRcIiB0aGVuIHJldHVybiBMYXllci5zZWxlY3QocGFuZWxOYW1lKS5jaGlsZHJlblswXVxuXHRlbHNlIGlmIHNpZGUgPT0gXCJyaWdodFwiIHRoZW4gcmV0dXJuIExheWVyLnNlbGVjdChwYW5lbE5hbWUpLmNoaWxkcmVuWzFdXG5cdHJldHVybiBudWxsXG5cbmV4cG9ydHMuYnV0dG9uID0gKGxhYmVsID0gXCJCdXR0b25cIiwgaGFuZGxlciA9IG51bGwsIHNpZGUgPSBcImxlZnRcIiwgcm93ID0gXCIxXCIsIHBWID0gNiwgcEggPSA4KSAtPlxuXHRpZiBMYXllci5zZWxlY3QocGFuZWxOYW1lKSA9PSB1bmRlZmluZWQgdGhlbiBjcmVhdGVDb250cm9sUGFuZWwoKVxuXHRpZiBnZXRQYW5lbEZyb21TaWRlKHNpZGUpID09IG51bGwgdGhlbiByZXR1cm4gbnVsbFxuXHRcblx0YnV0dG9uVmlldyA9IG5ldyBUZXh0TGF5ZXJcblx0XHR0ZXh0OiBsYWJlbFxuXHRcdHBhZGRpbmc6IHsgdG9wOiBwViwgYm90dG9tOiBwViArIDIsIGxlZnQ6IHBILCByaWdodDogcEggfVxuXHRcdGZvbnRTaXplOiAxNVxuXHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0XHRib3JkZXJSYWRpdXM6IDhcblx0XG5cdGJ1dHRvblZpZXcuc3RhdGVzID1cblx0XHRcInNob3duXCI6IHsgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC45KVwiIH1cblx0XHRcImhpZGRlblwiOiB7IGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuNClcIiB9XG5cdGJ1dHRvblZpZXcuc3RhdGVTd2l0Y2goXCJoaWRkZW5cIilcblx0XG5cdGJ1dHRvblZpZXcucGFyZW50ID0gZmluZFN0YWNrKGdldFBhbmVsRnJvbVNpZGUoc2lkZSksIHJvdylcblx0YnV0dG9uVmlldy5vbihFdmVudHMuVGFwLCBoYW5kbGVyKVxuXHRcblx0cmV0dXJuIGJ1dHRvblZpZXdcblxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFDQUE7QURFQSxJQUFBOztBQUFBLFNBQUEsR0FBWTs7QUFLWixRQUFBLEdBQVcsU0FBQyxTQUFELEVBQXlCLE1BQXpCLEVBQXdDLEtBQXhDLEVBQThELE1BQTlELEVBQTRFLE9BQTVFLEVBQTJGLE9BQTNGLEVBQXdHLE1BQXhHO0FBQ1YsTUFBQTs7SUFEVyxZQUFZOzs7SUFBWSxTQUFTOzs7SUFBTSxRQUFR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
