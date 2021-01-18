
# Stack
getStack = (alignment = "vertical", parent = null, sName = "some stack", sWidth = 100, sHeight = 100, padding = 0, offset = 20) ->
	stackView = new Layer
		parent: parent
		width: sWidth
		height: sHeight
		name: sName
		custom:
			alignment: alignment
			padding: padding
			offset: offset
	
	stackView.on "change:children", ->
		if @custom.alignment == "vertical"
			key = { d: "y", s: "height" }
		else key = { d: "x", s: "width" }
		
		for item, i in @children
			if i == 0 then item[key.d] = @custom.offset
			else item[key.d] = @children[i-1][key.d] + @children[i-1][key.s] + @custom.padding
	
	return stackView



test = (text = "test") ->
	print text


# getStack = (alignment = "vertical", sName = "some stack", sWidth = 100, sHeight = 100, padding = 0, offset = 20) ->

createControlPanel = () ->
	panels = new Layer
		name: "panels"
		width: Canvas.width
		height: Canvas.height
	
	leftPanel = getStack("vertical", panels, "left panel", 200, Canvas.height, 0, 20)
	rightPanel = getStack("vertical", panels, "right panel", 200, Canvas.height, 0, 20)



# getPanel = (panelType = "left", panelWidth = 200) ->
# 	panel = new Layer
# 		parent: Layer.select("panels")
# 		name: "panel #{panelType}"
# 		width: panelWidth
# 		height: Canvas.height
# 		backgroundColor: "null"
# 		backgroundColor: "rgba(255,0,0, 0.2)"
# 	
# 	print "||||#{panel.name}"
# 	
# 	controlStack = new Layer
# 		parent: panel
# 		width: panel.width
# 		height: 0
# 		backgroundColor: "null"
# 		backgroundColor: "rgba(0,255,0,.2)"
# 
# 	controlStack.on("change:children", stackVertical)
# 	
# 	return panel


isRow = (side = "left", row = "1") ->
	rowParent = Layer.select("panel #{side}")
	return null

addRow = (side = "left", row = "1") ->
	rowParent = Layer.select("panel #{side}")
	if rowParent.children.length == 0 then rowY = 0
	else rowY = rowParent.children[rowParent.children.length - 1].y
	
	rowView = new Layer
		parent: rowParent
		width: rowParent
		height: 40
		y: rowY
		backgroundColor: "rgba(0,0,245,.2)"
		
	return rowView

addButton = (side = "left", row = "1") ->
	if side != "left" or side != "right" then side = "left"
	
	selectedRow = isRow(side, row)
	if selectedRow == null then selectedRow = addRow(side, row)
	
	return selectedRow


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
	
# 	buttonView.parent = addButton(side, row)
	buttonView.on(Events.Tap, handler)
	
	return button


# setTapped = (selectedLayer) ->
# 	for item in selectedLayer.parent.children
# 		if item == selectedLayer then nextState = "shown"
# 		else nextState = "hidden"
# 		
# 		item.stateSwitch(nextState)


stackHorizontal = () ->
	gap = 8
	lastLayer = @children[@children.length - 1]
	lastLayer.x = @width + gap
	@width += lastLayer.width + gap
	
	if lastLayer.height > @height then @height = lastLayer.height

stackVertical = () ->
	gap = 20
	lastLayer = @children[@children.length - 1]
	lastLayer.y = @height + gap
	@height += lastLayer.height + gap
	
	if lastLayer.width > @width then @width = lastLayer.width

button("hello", test, "left", "1")
print panelsTemp = Layer.select("panels")
print rowParent = panelsTemp.selectChild("panel left")
button("hello2", test, "left", "1")
button("hello3", test, "left", "2")




stack = getStack("horizontal")
box = new Layer { parent: stack }
box = new Layer { parent: stack }
box = new Layer { parent: stack }
