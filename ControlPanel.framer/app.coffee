
# Button

getButtonForHandler = (handler, title = "title", parent, pV = 6, pH = 8) ->
	button = new TextLayer
		text: title
		padding:
			top: pV
			bottom: pV + 2
			left: pH
			right: pH
		fontSize: 15
		fontWeight: 500
		color: "white"
		backgroundColor: "rgba(0,0,0,0.5)"
		borderRadius: 8
	
	button.states =
		"shown": { backgroundColor: "rgba(0,0,0,0.9)" }
		"hidden": { backgroundColor: "rgba(0,0,0,0.4)" }
	button.stateSwitch("hidden")
	
	button.parent = parent
	button.on(Events.Tap, handler)
	
	return button


setTapped = (selectedLayer) ->
	for item in selectedLayer.parent.children
		if item == selectedLayer then nextState = "shown"
		else nextState = "hidden"
		
		item.stateSwitch(nextState)


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



test = (text = "test") ->
	print text

createControlPanel = () ->
	getPanel()

getPanel = (panelType = "left", panelWidth = 200) ->
	panel =  new Layer
		name: "panel #{panelType}"
		width: panelWidth
		height: Canvas.height
		backgroundColor: "null"

	controlStack = new Layer
		parent: panel
		width: panel.width
		height: 0
		backgroundColor: "null"

	controlStack.on("change:children", stackVertical)
	
	return panel


# p = createPanel()



button = (label = "Button", handler = null, side = "left", row = "1") ->
	if side != "left" or side != "right" then side = "left"
	if Layer.select("panel") == undefined then createControlPanel()
	


button("hello", test, "left", "2")

# print Layer.select("panel")

