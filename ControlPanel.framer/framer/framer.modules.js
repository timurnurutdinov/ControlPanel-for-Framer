require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ControlPanel":[function(require,module,exports){
var createControlPanel, findStack, getStack, rowExists;

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
    name: sName,
    backgroundColor: "null",
    custom: {
      alignment: alignment,
      padding: padding,
      offset: offset
    }
  });
  stackView.on("change:children", function() {
    var i, item, j, key, len, ref, results;
    if (this.custom.alignment === "vertical") {
      key = {
        d: "y",
        s: "height",
        a: "x"
      };
    } else {
      key = {
        d: "x",
        s: "width",
        a: "y"
      };
    }
    ref = this.children;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      item = ref[i];
      if (i === 0) {
        results.push(item[key.d] = this.custom.offset);
      } else {
        results.push(item[key.d] = this.children[i - 1][key.d] + this.children[i - 1][key.s] + this.custom.padding);
      }
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

findStack = function(side, row) {
  var panel, selectedRow;
  if (side == null) {
    side = "left";
  }
  if (row == null) {
    row = "1";
  }
  if (side === "left") {
    panel = Layer.select("panels").children[0];
  } else {
    panel = Layer.select("panels").children[1];
  }
  selectedRow = rowExists(panel, row);
  if (selectedRow !== null) {
    return selectedRow;
  } else {
    selectedRow = getStack("horizontal", panel, row, panel.width, 40, 10);
  }
  return selectedRow;
};

exports.setHeader = function(label, side) {
  var headerView;
  if (label == null) {
    label = "Header";
  }
  if (side == null) {
    side = "left";
  }
  if (side !== "left" || side !== "right") {
    side = "left";
  }
  if (Layer.select("panels") === void 0) {
    createControlPanel();
  }
  headerView = new TextLayer({
    text: label,
    fontSize: 15,
    fontWeight: 500,
    color: "white",
    opacity: 0.6,
    padding: {
      top: 12,
      left: 3
    }
  });
  return headerView.parent = findStack(side, Utils.randomNumber());
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
  if (side !== "left" || side !== "right") {
    side = "left";
  }
  if (Layer.select("panels") === void 0) {
    createControlPanel();
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
  buttonView.parent = findStack(side, row);
  buttonView.on(Events.Tap, handler);
  return buttonView;
};


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Db250cm9sUGFuZWwtZm9yLUZyYW1lci9Db250cm9sUGFuZWwuZnJhbWVyL21vZHVsZXMvQ29udHJvbFBhbmVsLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXVxuXG5cblxuXG4jIFN0YWNrXG5cbmdldFN0YWNrID0gKGFsaWdubWVudCA9IFwidmVydGljYWxcIiwgcGFyZW50ID0gbnVsbCwgc05hbWUgPSBcInNvbWUgc3RhY2tcIiwgc1dpZHRoID0gMTAwLCBzSGVpZ2h0ID0gMTAwLCBwYWRkaW5nID0gMCwgb2Zmc2V0ID0gMjApIC0+XG5cdHN0YWNrVmlldyA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogcGFyZW50XG5cdFx0d2lkdGg6IHNXaWR0aFxuXHRcdGhlaWdodDogc0hlaWdodFxuXHRcdG5hbWU6IHNOYW1lXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIm51bGxcIlxuXHRcdGN1c3RvbTpcblx0XHRcdGFsaWdubWVudDogYWxpZ25tZW50XG5cdFx0XHRwYWRkaW5nOiBwYWRkaW5nXG5cdFx0XHRvZmZzZXQ6IG9mZnNldFxuXHRcblx0c3RhY2tWaWV3Lm9uIFwiY2hhbmdlOmNoaWxkcmVuXCIsIC0+XG5cdFx0aWYgQGN1c3RvbS5hbGlnbm1lbnQgPT0gXCJ2ZXJ0aWNhbFwiXG5cdFx0XHRrZXkgPSB7IGQ6IFwieVwiLCBzOiBcImhlaWdodFwiLCBhOiBcInhcIiB9XG5cdFx0ZWxzZSBrZXkgPSB7IGQ6IFwieFwiLCBzOiBcIndpZHRoXCIsIGE6IFwieVwiIH1cblx0XHRcblx0XHRmb3IgaXRlbSwgaSBpbiBAY2hpbGRyZW5cblx0XHRcdGlmIGkgPT0gMCB0aGVuIGl0ZW1ba2V5LmRdID0gQGN1c3RvbS5vZmZzZXRcblx0XHRcdGVsc2UgaXRlbVtrZXkuZF0gPSBAY2hpbGRyZW5baS0xXVtrZXkuZF0gKyBAY2hpbGRyZW5baS0xXVtrZXkuc10gKyBAY3VzdG9tLnBhZGRpbmdcblx0XHRcdFxuIyBcdFx0XHRpdGVtW2tleS5hXSA9IEFsaWduLmNlbnRlcigpXG5cdFxuXHRyZXR1cm4gc3RhY2tWaWV3XG5cblxuXG5cblxuXG5cbmNyZWF0ZUNvbnRyb2xQYW5lbCA9ICgpIC0+XG5cdHBhbmVscyA9IG5ldyBMYXllclxuXHRcdG5hbWU6IFwicGFuZWxzXCJcblx0XHR3aWR0aDogQ2FudmFzLndpZHRoXG5cdFx0aGVpZ2h0OiBDYW52YXMuaGVpZ2h0XG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIm51bGxcIlxuXHRcblx0bGVmdFBhbmVsID0gZ2V0U3RhY2soXCJ2ZXJ0aWNhbFwiLCBwYW5lbHMsIFwibGVmdCBwYW5lbFwiLCAzMjAsIENhbnZhcy5oZWlnaHQsIDAsIDIwKVxuXHRyaWdodFBhbmVsID0gZ2V0U3RhY2soXCJ2ZXJ0aWNhbFwiLCBwYW5lbHMsIFwicmlnaHQgcGFuZWxcIiwgMzIwLCBDYW52YXMuaGVpZ2h0LCAwLCAyMClcblx0cmlnaHRQYW5lbC54ID0gQWxpZ24ucmlnaHQoKVxuXG5cbnJvd0V4aXN0cyA9IChsYXllciwgcm93KSAtPlxuXHRmb3IgaXRlbSBpbiBsYXllci5jaGlsZHJlblxuXHRcdGlmIGl0ZW0ubmFtZSA9PSByb3cgdGhlbiByZXR1cm4gaXRlbVxuXHRyZXR1cm4gbnVsbFxuXG5maW5kU3RhY2sgPSAoc2lkZSA9IFwibGVmdFwiLCByb3cgPSBcIjFcIikgLT5cblx0aWYgc2lkZSA9PSBcImxlZnRcIlxuXHRcdHBhbmVsID0gTGF5ZXIuc2VsZWN0KFwicGFuZWxzXCIpLmNoaWxkcmVuWzBdXG5cdGVsc2UgcGFuZWwgPSBMYXllci5zZWxlY3QoXCJwYW5lbHNcIikuY2hpbGRyZW5bMV1cblx0XG5cdHNlbGVjdGVkUm93ID0gcm93RXhpc3RzKHBhbmVsLCByb3cpXG5cdGlmIHNlbGVjdGVkUm93ICE9IG51bGwgdGhlbiByZXR1cm4gc2VsZWN0ZWRSb3dcblx0ZWxzZSBzZWxlY3RlZFJvdyA9IGdldFN0YWNrKFwiaG9yaXpvbnRhbFwiLCBwYW5lbCwgcm93LCBwYW5lbC53aWR0aCwgNDAsIDEwKVxuXHRcblx0cmV0dXJuIHNlbGVjdGVkUm93XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5leHBvcnRzLnNldEhlYWRlciA9IChsYWJlbCA9IFwiSGVhZGVyXCIsIHNpZGUgPSBcImxlZnRcIikgLT5cblx0aWYgc2lkZSAhPSBcImxlZnRcIiBvciBzaWRlICE9IFwicmlnaHRcIiB0aGVuIHNpZGUgPSBcImxlZnRcIlxuXHRpZiBMYXllci5zZWxlY3QoXCJwYW5lbHNcIikgPT0gdW5kZWZpbmVkIHRoZW4gY3JlYXRlQ29udHJvbFBhbmVsKClcblx0XG5cdGhlYWRlclZpZXcgPSBuZXcgVGV4dExheWVyXG5cdFx0dGV4dDogbGFiZWxcblx0XHRmb250U2l6ZTogMTVcblx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0b3BhY2l0eTogMC42XG5cdFx0cGFkZGluZzogeyB0b3A6IDEyLCBsZWZ0OiAzIH1cblx0XG5cdGhlYWRlclZpZXcucGFyZW50ID0gZmluZFN0YWNrKHNpZGUsIFV0aWxzLnJhbmRvbU51bWJlcigpKVxuXG5leHBvcnRzLmJ1dHRvbiA9IChsYWJlbCA9IFwiQnV0dG9uXCIsIGhhbmRsZXIgPSBudWxsLCBzaWRlID0gXCJsZWZ0XCIsIHJvdyA9IFwiMVwiLCBwViA9IDYsIHBIID0gOCkgLT5cblx0aWYgc2lkZSAhPSBcImxlZnRcIiBvciBzaWRlICE9IFwicmlnaHRcIiB0aGVuIHNpZGUgPSBcImxlZnRcIlxuXHRpZiBMYXllci5zZWxlY3QoXCJwYW5lbHNcIikgPT0gdW5kZWZpbmVkIHRoZW4gY3JlYXRlQ29udHJvbFBhbmVsKClcblx0XG5cdGJ1dHRvblZpZXcgPSBuZXcgVGV4dExheWVyXG5cdFx0dGV4dDogbGFiZWxcblx0XHRwYWRkaW5nOiB7IHRvcDogcFYsIGJvdHRvbTogcFYgKyAyLCBsZWZ0OiBwSCwgcmlnaHQ6IHBIIH1cblx0XHRmb250U2l6ZTogMTVcblx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdFx0Ym9yZGVyUmFkaXVzOiA4XG5cdFxuXHRidXR0b25WaWV3LnN0YXRlcyA9XG5cdFx0XCJzaG93blwiOiB7IGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuOSlcIiB9XG5cdFx0XCJoaWRkZW5cIjogeyBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjQpXCIgfVxuXHRidXR0b25WaWV3LnN0YXRlU3dpdGNoKFwiaGlkZGVuXCIpXG5cdFxuXHRidXR0b25WaWV3LnBhcmVudCA9IGZpbmRTdGFjayhzaWRlLCByb3cpXG5cdGJ1dHRvblZpZXcub24oRXZlbnRzLlRhcCwgaGFuZGxlcilcblx0XG5cdHJldHVybiBidXR0b25WaWV3XG5cbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FESUEsSUFBQTs7QUFBQSxPQUFPLENBQUMsS0FBUixHQUFnQjs7QUFFaEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtTQUNwQixLQUFBLENBQU0sdUJBQU47QUFEb0I7O0FBR3JCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQOztBQU9sQixRQUFBLEdBQVcsU0FBQyxTQUFELEVBQXlCLE1BQXpCLEVBQXdDLEtBQXhDLEVBQThELE1BQTlELEVBQTRFLE9BQTVFLEVBQTJGLE9BQTNGLEVBQXdHLE1BQXhHO0FBQ1YsTUFBQTs7SUFEVyxZQUFZOzs7SUFBWSxTQUFTOzs7SUFBTSxRQUFROzs7SUFBYyxTQUFTOzs7SUFBSyxVQUFVOzs7SUFBSyxVQUFVOzs7SUFBRyxTQUFTOztFQUMzSCxTQUFBLEdBQWdCLElBQUEsS0FBQSxDQUNmO0lBQUEsTUFBQSxFQUFRLE1BQVI7SUFDQSxLQUFBLEVBQU8sTUFEUDtJQUVBLE1BQUEsRUFBUSxPQUZSO0lBR0EsSUFBQSxFQUFNLEtBSE47SUFJQSxlQUFBLEVBQWlCLE1BSmpCO0lBS0EsTUFBQSxFQUNDO01BQUEsU0FBQSxFQUFXLFNBQVg7TUFDQSxPQUFBLEVBQVMsT0FEVDtNQUVBLE1BQUEsRUFBUSxNQUZSO0tBTkQ7R0FEZTtF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
