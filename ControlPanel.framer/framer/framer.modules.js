require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ControlPanel":[function(require,module,exports){
var createControlPanel, findStack, getPanelFromSide, getStack, rowExists;

exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];

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
    name: "panels",
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
    selectedRow = getStack(stackAlignment, panel, row, panel.width, 40, 10);
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
  var headerView, panel;
  if (label == null) {
    label = "Header";
  }
  if (side == null) {
    side = "left";
  }
  if (Layer.select("panels") === void 0) {
    createControlPanel();
  }
  if (side === "left") {
    panel = Layer.select("panels").children[0];
  } else {
    panel = Layer.select("panels").children[1];
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
  headerView.parent = findStack(panel, Utils.randomNumber());
  return headerView;
};

getPanelFromSide = function(side) {
  if (side === "left") {
    return Layer.select("panels").children[0];
  } else if (side === "right") {
    return Layer.select("panels").children[1];
  } else {
    return null;
  }
};

exports.button = function(label, handler, side, row, pV, pH) {
  var buttonView, panel;
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
  if (Layer.select("panels") === void 0) {
    createControlPanel();
  }
  if (side === "left") {
    panel = Layer.select("panels").children[0];
  } else if (side === "right") {
    panel = Layer.select("panels").children[1];
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
  buttonView.parent = findStack(panel, row);
  buttonView.on(Events.Tap, handler);
  return buttonView;
};


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Db250cm9sUGFuZWwtZm9yLUZyYW1lci9Db250cm9sUGFuZWwuZnJhbWVyL21vZHVsZXMvQ29udHJvbFBhbmVsLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXVxuXG5cblxuXG4jIFN0YWNrXG5cbmdldFN0YWNrID0gKGFsaWdubWVudCA9IFwidmVydGljYWxcIiwgcGFyZW50ID0gbnVsbCwgc05hbWUgPSBcInNvbWUgc3RhY2tcIiwgc1dpZHRoID0gMTAwLCBzSGVpZ2h0ID0gMTAwLCBwYWRkaW5nID0gMCwgb2Zmc2V0ID0gMjApIC0+XG5cdHN0YWNrVmlldyA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogcGFyZW50XG5cdFx0d2lkdGg6IHNXaWR0aFxuXHRcdGhlaWdodDogc0hlaWdodFxuXHRcdG5hbWU6IFwiI3tzTmFtZX1cIlxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJudWxsXCJcblx0XHQjIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwwLDAsLjJcIlxuXHRcdGN1c3RvbTpcblx0XHRcdGFsaWdubWVudDogYWxpZ25tZW50XG5cdFx0XHRwYWRkaW5nOiBwYWRkaW5nXG5cdFx0XHRvZmZzZXQ6IG9mZnNldFxuXHRcblx0c3RhY2tWaWV3Lm9uIFwiY2hhbmdlOmNoaWxkcmVuXCIsIC0+XG5cdFx0aWYgQGN1c3RvbS5hbGlnbm1lbnQgPT0gXCJ2ZXJ0aWNhbFwiIHRoZW4ga2V5ID0geyBkOiBcInlcIiwgczogXCJoZWlnaHRcIiB9XG5cdFx0ZWxzZSBpZiBAY3VzdG9tLmFsaWdubWVudCA9PSBcImhvcml6b250YWxcIiB0aGVuIGtleSA9IHsgZDogXCJ4XCIsIHM6IFwid2lkdGhcIiB9XG5cdFx0ZWxzZSBpZiBAY3VzdG9tLmFsaWdubWVudCA9PSBcImhvcml6b250YWwtcmV2ZXJzZVwiIHRoZW4ga2V5ID0geyBkOiBcInhcIiwgczogXCJ3aWR0aFwiIH1cblx0XHRcblx0XHRzdW1Qb3MgPSBAY3VzdG9tLm9mZnNldFxuXHRcdGZvciBpdGVtLCBpIGluIEBjaGlsZHJlblxuXG5cdFx0XHRpZiBAY3VzdG9tLmFsaWdubWVudCA9PSBcImhvcml6b250YWxcIiBvciBAY3VzdG9tLmFsaWdubWVudCA9PSBcInZlcnRpY2FsXCIgdGhlbiBpdGVtW2tleS5kXSA9IHN1bVBvc1xuXHRcdFx0ZWxzZSBpZiBAY3VzdG9tLmFsaWdubWVudCA9PSBcImhvcml6b250YWwtcmV2ZXJzZVwiIHRoZW4gaXRlbVtrZXkuZF0gPSBAd2lkdGggLSBzdW1Qb3MgLSBpdGVtW2tleS5zXVxuXG5cdFx0XHRzdW1Qb3MgKz0gaXRlbVtrZXkuc10gKyBAY3VzdG9tLnBhZGRpbmdcblxuXHRcblx0cmV0dXJuIHN0YWNrVmlld1xuXG5cblxuXG5cblxuXG5jcmVhdGVDb250cm9sUGFuZWwgPSAoKSAtPlxuXHRwYW5lbHMgPSBuZXcgTGF5ZXJcblx0XHRuYW1lOiBcInBhbmVsc1wiXG5cdFx0d2lkdGg6IENhbnZhcy53aWR0aFxuXHRcdGhlaWdodDogQ2FudmFzLmhlaWdodFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJudWxsXCJcblx0XG5cdGxlZnRQYW5lbCA9IGdldFN0YWNrKFwidmVydGljYWxcIiwgcGFuZWxzLCBcImxlZnQgcGFuZWxcIiwgMzIwLCBDYW52YXMuaGVpZ2h0LCAwLCAyMClcblx0cmlnaHRQYW5lbCA9IGdldFN0YWNrKFwidmVydGljYWxcIiwgcGFuZWxzLCBcInJpZ2h0IHBhbmVsXCIsIDMyMCwgQ2FudmFzLmhlaWdodCwgMCwgMjApXG5cdHJpZ2h0UGFuZWwueCA9IEFsaWduLnJpZ2h0KClcblxuXG5yb3dFeGlzdHMgPSAobGF5ZXIsIHJvdykgLT5cblx0Zm9yIGl0ZW0gaW4gbGF5ZXIuY2hpbGRyZW5cblx0XHRpZiBpdGVtLm5hbWUgPT0gcm93IHRoZW4gcmV0dXJuIGl0ZW1cblx0cmV0dXJuIG51bGxcblxuZmluZFN0YWNrID0gKHBhbmVsLCByb3cgPSBcIjFcIikgLT5cblx0aWYgcGFuZWwubmFtZSA9PSBcInJpZ2h0IHBhbmVsXCIgdGhlbiBzdGFja0FsaWdubWVudCA9IFwiaG9yaXpvbnRhbC1yZXZlcnNlXCJcblx0ZWxzZSBzdGFja0FsaWdubWVudCA9IFwiaG9yaXpvbnRhbFwiXG5cblx0c2VsZWN0ZWRSb3cgPSByb3dFeGlzdHMocGFuZWwsIHJvdylcblx0aWYgc2VsZWN0ZWRSb3cgIT0gbnVsbCB0aGVuIHJldHVybiBzZWxlY3RlZFJvd1xuXHRlbHNlIHNlbGVjdGVkUm93ID0gZ2V0U3RhY2soc3RhY2tBbGlnbm1lbnQsIHBhbmVsLCByb3csIHBhbmVsLndpZHRoLCA0MCwgMTApXG5cdFxuXHRyZXR1cm4gc2VsZWN0ZWRSb3dcblxuXG5cblxuXG5cblxuXG5cblxuZXhwb3J0cy5icmVha2VyID0gKHNpZGUgPSBcImxlZnRcIikgLT5cblx0cmV0dXJuIHRoaXMuaGVhZGVyKFwiXCIsIHNpZGUpXG5cblxuZXhwb3J0cy5oZWFkZXIgPSAobGFiZWwgPSBcIkhlYWRlclwiLCBzaWRlID0gXCJsZWZ0XCIpIC0+XG5cdGlmIExheWVyLnNlbGVjdChcInBhbmVsc1wiKSA9PSB1bmRlZmluZWQgdGhlbiBjcmVhdGVDb250cm9sUGFuZWwoKVxuXHRpZiBzaWRlID09IFwibGVmdFwiIHRoZW4gcGFuZWwgPSBMYXllci5zZWxlY3QoXCJwYW5lbHNcIikuY2hpbGRyZW5bMF1cblx0ZWxzZSBwYW5lbCA9IExheWVyLnNlbGVjdChcInBhbmVsc1wiKS5jaGlsZHJlblsxXVxuXHRcblx0aGVhZGVyVmlldyA9IG5ldyBUZXh0TGF5ZXJcblx0XHR0ZXh0OiBsYWJlbFxuXHRcdGZvbnRTaXplOiAxNVxuXHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHQjIHRleHRBbGlnbjogc2lkZVxuXHRcdG9wYWNpdHk6IDAuNlxuXHRcdHBhZGRpbmc6XG5cdFx0XHR0b3A6IDEyXG5cdFx0XHRsZWZ0OiBpZiBzaWRlID09IFwibGVmdFwiIHRoZW4gMyBlbHNlIDBcblx0XHRcdHJpZ2h0OiBpZiBzaWRlID09IFwicmlnaHRcIiB0aGVuIDMgZWxzZSAwXG5cdFxuXHRoZWFkZXJWaWV3LnBhcmVudCA9IGZpbmRTdGFjayhwYW5lbCwgVXRpbHMucmFuZG9tTnVtYmVyKCkpXG5cdHJldHVybiBoZWFkZXJWaWV3XG5cbmdldFBhbmVsRnJvbVNpZGUgPSAoc2lkZSkgLT5cblx0aWYgc2lkZSA9PSBcImxlZnRcIiB0aGVuIHJldHVybiBMYXllci5zZWxlY3QoXCJwYW5lbHNcIikuY2hpbGRyZW5bMF1cblx0ZWxzZSBpZiBzaWRlID09IFwicmlnaHRcIiB0aGVuIHJldHVybiBMYXllci5zZWxlY3QoXCJwYW5lbHNcIikuY2hpbGRyZW5bMV1cblx0ZWxzZSByZXR1cm4gbnVsbFxuXG5leHBvcnRzLmJ1dHRvbiA9IChsYWJlbCA9IFwiQnV0dG9uXCIsIGhhbmRsZXIgPSBudWxsLCBzaWRlID0gXCJsZWZ0XCIsIHJvdyA9IFwiMVwiLCBwViA9IDYsIHBIID0gOCkgLT5cblx0aWYgTGF5ZXIuc2VsZWN0KFwicGFuZWxzXCIpID09IHVuZGVmaW5lZCB0aGVuIGNyZWF0ZUNvbnRyb2xQYW5lbCgpXG5cdGlmIHNpZGUgPT0gXCJsZWZ0XCIgdGhlbiBwYW5lbCA9IExheWVyLnNlbGVjdChcInBhbmVsc1wiKS5jaGlsZHJlblswXVxuXHRlbHNlIGlmIHNpZGUgPT0gXCJyaWdodFwiIHRoZW4gcGFuZWwgPSBMYXllci5zZWxlY3QoXCJwYW5lbHNcIikuY2hpbGRyZW5bMV1cblx0XG5cdGJ1dHRvblZpZXcgPSBuZXcgVGV4dExheWVyXG5cdFx0dGV4dDogbGFiZWxcblx0XHRwYWRkaW5nOiB7IHRvcDogcFYsIGJvdHRvbTogcFYgKyAyLCBsZWZ0OiBwSCwgcmlnaHQ6IHBIIH1cblx0XHRmb250U2l6ZTogMTVcblx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdFx0Ym9yZGVyUmFkaXVzOiA4XG5cdFxuXHRidXR0b25WaWV3LnN0YXRlcyA9XG5cdFx0XCJzaG93blwiOiB7IGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuOSlcIiB9XG5cdFx0XCJoaWRkZW5cIjogeyBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjQpXCIgfVxuXHRidXR0b25WaWV3LnN0YXRlU3dpdGNoKFwiaGlkZGVuXCIpXG5cdFxuXHRidXR0b25WaWV3LnBhcmVudCA9IGZpbmRTdGFjayhwYW5lbCwgcm93KVxuXHRidXR0b25WaWV3Lm9uKEV2ZW50cy5UYXAsIGhhbmRsZXIpXG5cdFxuXHRyZXR1cm4gYnV0dG9uVmlld1xuXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBRElBLElBQUE7O0FBQUEsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBRWhCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7U0FDcEIsS0FBQSxDQUFNLHVCQUFOO0FBRG9COztBQUdyQixPQUFPLENBQUMsT0FBUixHQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUDs7QUFPbEIsUUFBQSxHQUFXLFNBQUMsU0FBRCxFQUF5QixNQUF6QixFQUF3QyxLQUF4QyxFQUE4RCxNQUE5RCxFQUE0RSxPQUE1RSxFQUEyRixPQUEzRixFQUF3RyxNQUF4RztBQUNWLE1BQUE7O0lBRFcsWUFBWTs7O0lBQVksU0FBUzs7O0lBQU0sUUFBUTs7O0lBQWMsU0FBUzs7O0lBQUssVUFBVTs7O0lBQUssVUFBVTs7O0lBQUcsU0FBUzs7RUFDM0gsU0FBQSxHQUFnQixJQUFBLEtBQUEsQ0FDZjtJQUFBLE1BQUEsRUFBUSxNQUFSO0lBQ0EsS0FBQSxFQUFPLE1BRFA7SUFFQSxNQUFBLEVBQVEsT0FGUjtJQUdBLElBQUEsRUFBTSxFQUFBLEdBQUcsS0FIVDtJQUlBLGVBQUEsRUFBaUIsTUFKakI7SUFNQSxNQUFBLEVBQ0M7TUFBQSxTQUFBLEVBQVcsU0FBWDtNQUNBLE9BQUEsRUFBUyxPQURUO01BRUEsTUFBQSxFQUFRLE1BRlI7S0FQRDtHQURlO0VBWWhCLFNBQVMsQ0FBQyxFQUFWLENBQWEsaUJBQWIsRUFBZ0MsU0FBQTtBQUMvQixRQUFBO0lBQUEsSUFBRyxJQUFDLENB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
