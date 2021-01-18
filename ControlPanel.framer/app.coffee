
Canvas.backgroundColor = "222"
panel = require "ControlPanel"

test = (event, layer) ->
	print @text




panel.setHeader("header", "left")
panel.button("hello", test, "left", "1")
panel.button("hello2", test, "left", "1")

panel.setHeader("header", "left")
panel.button("hello3", test, "left", "2")