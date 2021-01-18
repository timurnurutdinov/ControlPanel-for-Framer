
Canvas.backgroundColor = "222"

# Stack

getStack = (alignment = "vertical", parent = null, sName = "some stack", sWidth = 100, sHeight = 100, padding = 0, offset = 20) ->
	stackView = new Layer
		parent: parent
		width: sWidth
		height: sHeight
		name: sName
		backgroundColor: "null"
		custom:
			alignment: alignment
			padding: padding
			offset: offset
	
	stackView.on "change:children", ->
		if @custom.alignment == "vertical"
			key = { d: "y", s: "height", a: "x" }
		else key = { d: "x", s: "width", a: "y" }
		
		for item, i in @children
			if i == 0 then item[key.d] = @custom.offset
			else item[key.d] = @children[i-1][key.d] + @children[i-1][key.s] + @custom.padding
			
# 			item[key.a] = Align.center()
	
	return stackView

# Panel

test = (event, layer, text = "test") ->
	print text


# getStack = (alignment = "vertical", sName = "some stack", sWidth = 100, sHeight = 100, padding = 0, offset = 20) ->

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

findStack = (side = "left", row = "1") ->
	if side == "left"
		panel = Layer.select("panels").children[0]
	else panel = Layer.select("panels").children[1]
	
	selectedRow = rowExists(panel, row)
	if selectedRow != null then return selectedRow
	else selectedRow = getStack("horizontal", panel, row, panel.width, 40, 10)
	
	return selectedRow


setHeader = (label = "Header", side = "left") ->
	if side != "left" or side != "right" then side = "left"
	if Layer.select("panels") == undefined then createControlPanel()
	
	headerView = new TextLayer
		text: label
		fontSize: 15
		fontWeight: 500
		color: "white"
		opacity: 0.6
		padding: { top: 12, left: 3 }
	
	headerView.parent = findStack(side, Utils.randomNumber())

button = (label = "Button", handler = null, side = "left", row = "1", pV = 6, pH = 8) ->
	if side != "left" or side != "right" then side = "left"
	if Layer.select("panels") == undefined then createControlPanel()
	
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
	
	buttonView.parent = findStack(side, row)
	buttonView.on(Events.Tap, handler)
	
	return button






setHeader("header", "left")
button("hello", test, "left", "1")
button("hello2", test, "left", "1")

setHeader("header", "left")
button("hello2", test, "left", "2")