
Canvas.backgroundColor = "222"
panel = require "ControlPanel"

test = (event, layer) ->
	print @text




panel.header("header", "left")
panel.button("hello", test, "left", "1")
panel.button("hello2", test, "left", "1")

panel.breaker("left")
panel.header("header", "left")
panel.button("hello222", test, "left", "2")


panel.header("asdasdadasd", "right")
panel.button("right1", test, "right", "2")
panel.button("right2", test, "right", "2")

