
Canvas.backgroundColor = "222"
panel = require "ControlPanel"

test = (event, layer) ->
	print @text




panel.header("header", "left")
panel.button("hello", test, "left", "1")
panel.button("hello2", test, "left", "1")

# panel.setHeader("header", "left")
panel.breaker("left")
panel.button("hello222", test, "left", "2")


panel.header("asdasdadasd", "right")
panel.button("right1", test, "right", "2")
panel.button("right2", test, "right", "2")



# box = new Layer
# 
# box["x"] = Align.right(-20)
# box["x"] = Align.left(20)
# 
# handler = Align.right
# print handler
# 
# box["x"] = handler(-20)
# print box.x