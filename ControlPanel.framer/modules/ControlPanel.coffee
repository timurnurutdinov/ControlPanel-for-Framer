# Add the following line to your project in Framer Studio. 
# myModule = require "myModule"
# Reference the contents by name, like myModule.myFunction() or myModule.myVar

exports.myVar = "myVariable"

exports.myFunction = ->
	print "myFunction is running"

exports.myArray = [1, 2, 3]




# Stack

getStack = (alignment = "vertical", parent = null, sName = "some stack", sWidth = 100, sHeight = 100, padding = 0, offset = 20) ->
	stackView = new Layer
		parent: parent
		width: sWidth
		height: sHeight
		name: "#{sName}"
		backgroundColor: "null"
		# backgroundColor: "rgba(255,0,0,.2"
		custom:
			alignment: alignment
			padding: padding
			offset: offset
	
	stackView.on "change:children", ->
		if @custom.alignment == "vertical" then key = { d: "y", s: "height" }
		else if @custom.alignment == "horizontal" then key = { d: "x", s: "width" }
		else if @custom.alignment == "horizontal-reverse" then key = { d: "x", s: "width" }
		
		sumPos = @custom.offset
		for item, i in @children

			if @custom.alignment == "horizontal" or @custom.alignment == "vertical" then item[key.d] = sumPos
			else if @custom.alignment == "horizontal-reverse" then item[key.d] = @width - sumPos - item[key.s]

			sumPos += item[key.s] + @custom.padding

	
	return stackView







createControlPanel = () ->
	panels = new Layer
		name: "panels"
		width: Canvas.width
		height: Canvas.height
		backgroundColor: "null"
	
	leftPanel = getStack("vertical", panels, "left panel", 320, Canvas.height, 0, 20)
	rightPanel = getStack("vertical", panels, "right panel", 320, Canvas.height, 0, 20)
	rightPanel.x = Align.right()


rowExists = (layer, row) ->
	for item in layer.children
		if item.name == row then return item
	return null

findStack = (panel, row = "1") ->
	if panel.name == "right panel" then stackAlignment = "horizontal-reverse"
	else stackAlignment = "horizontal"

	selectedRow = rowExists(panel, row)
	if selectedRow != null then return selectedRow
	else selectedRow = getStack(stackAlignment, panel, row, panel.width, 40, 10)
	
	return selectedRow










exports.breaker = (side = "left") ->
	return this.header("", side)


exports.header = (label = "Header", side = "left") ->
	if Layer.select("panels") == undefined then createControlPanel()
	if side == "left" then panel = Layer.select("panels").children[0]
	else panel = Layer.select("panels").children[1]
	
	headerView = new TextLayer
		text: label
		fontSize: 15
		fontWeight: 500
		color: "white"
		# textAlign: side
		opacity: 0.6
		padding:
			top: 12
			left: if side == "left" then 3 else 0
			right: if side == "right" then 3 else 0
	
	headerView.parent = findStack(panel, Utils.randomNumber())
	return headerView

getPanelFromSide = (side) ->
	if side == "left" then return Layer.select("panels").children[0]
	else if side == "right" then return Layer.select("panels").children[1]
	else return null

exports.button = (label = "Button", handler = null, side = "left", row = "1", pV = 6, pH = 8) ->
	if Layer.select("panels") == undefined then createControlPanel()
	if side == "left" then panel = Layer.select("panels").children[0]
	else if side == "right" then panel = Layer.select("panels").children[1]
	
	buttonView = new TextLayer
		text: label
		padding: { top: pV, bottom: pV + 2, left: pH, right: pH }
		fontSize: 15
		fontWeight: 500
		color: "white"
		backgroundColor: "rgba(0,0,0,0.5)"
		borderRadius: 8
	
	buttonView.states =
		"shown": { backgroundColor: "rgba(0,0,0,0.9)" }
		"hidden": { backgroundColor: "rgba(0,0,0,0.4)" }
	buttonView.stateSwitch("hidden")
	
	buttonView.parent = findStack(panel, row)
	buttonView.on(Events.Tap, handler)
	
	return buttonView

