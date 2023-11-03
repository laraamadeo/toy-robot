if (typeof require !== "undefined") {
    global.Robot = require("./Robot.js")
}

console.log('TEST Robot')

console.log('CASE Constructor by default')
{
    const robot = new Robot()

    console.assert(robot.x === 0)
    console.assert(robot.y === 0)
    console.assert(robot.facing === "NORTH")
}

console.log('CASE Place Robot in position and facing')
{
    const robot = new Robot()

    robot.place(3, 4, "SOUTH")

    console.assert(robot.x === 3)
    console.assert(robot.y === 4)
    console.assert(robot.facing === "SOUTH")
}

console.log('CASE rotate robot left sides')
{
    const robot = new Robot()

    robot.left()
    console.assert(robot.x === 0)
    console.assert(robot.y === 0)
    console.assert(robot.facing === "WEST")

    robot.left()
    console.assert(robot.x === 0)
    console.assert(robot.y === 0)
    console.assert(robot.facing === "SOUTH")

    robot.left()
    console.assert(robot.x === 0)
    console.assert(robot.y === 0)
    console.assert(robot.facing === "EAST")

    robot.left()
    console.assert(robot.x === 0)
    console.assert(robot.y === 0)
    console.assert(robot.facing === "NORTH")
}

console.log('CASE rotate robot right sides')
{
    const robot = new Robot()

    robot.right()
    console.assert(robot.x === 0)
    console.assert(robot.y === 0)
    console.assert(robot.facing === "EAST")

    robot.right()
    console.assert(robot.x === 0)
    console.assert(robot.y === 0)
    console.assert(robot.facing === "SOUTH")

    robot.right()
    console.assert(robot.x === 0)
    console.assert(robot.y === 0)
    console.assert(robot.facing === "WEST")

    robot.right()
    console.assert(robot.x === 0)
    console.assert(robot.y === 0)
    console.assert(robot.facing === "NORTH")
}

console.log('CASE robot move 1 unit facing NORTH')
{
    const robot = new Robot()

    robot.move()
    console.assert(robot.x === 0)
    console.assert(robot.y === 1)
    console.assert(robot.facing === "NORTH")
}

console.log('CASE robot move 1 unit facing EAST')
{
    const robot = new Robot()

    robot.right()
    robot.move()
    console.assert(robot.x === 1)
    console.assert(robot.y === 0)
    console.assert(robot.facing === "EAST")
}

console.log('CASE robot move 1 unit facing WEST')
{
    const robot = new Robot()

    robot.place(2, 0, "NORTH")
    robot.left()
    robot.move()
    console.assert(robot.x === 1)
    console.assert(robot.y === 0)
    console.assert(robot.facing === "WEST")
}

console.log('CASE robot move 1 unit facing SOUTH')
{
    const robot = new Robot()

    robot.place(0, 2, "NORTH")
    robot.left()
    robot.left()
    robot.move()
    console.assert(robot.x === 0)
    console.assert(robot.y === 1)
    console.assert(robot.facing === "SOUTH")
}

console.log('CASE robot move 1 unit further than maximum limits')
{
    const robot = new Robot()

    robot.place(0, 4, "NORTH")
    robot.move()
    console.assert(robot.x === 0)
    console.assert(robot.y === 4)
    console.assert(robot.facing === "NORTH")
}

console.log('CASE robot move 1 unit further than minimum limits')
{
    const robot = new Robot()

    robot.place(2, 0, "SOUTH")
    robot.move()
    console.assert(robot.x === 2)
    console.assert(robot.y === 0)
    console.assert(robot.facing === "SOUTH")
}

console.log('CASE robot attend instruction "PLACE"')
{
    const robot = new Robot()

    robot.do("PLACE, 2, 1, NORTH")
    console.assert(robot.x === 2)
    console.assert(robot.y === 1)
    console.assert(robot.facing === "NORTH")
}

console.log('CASE robot attend instruction "LEFT"')
{
    const robot = new Robot()

    robot.do("PLACE, 2, 1, NORTH")
    robot.do("LEFT")
    console.assert(robot.x === 2)
    console.assert(robot.y === 1)
    console.assert(robot.facing === "WEST")
}

console.log('CASE robot attend instruction "RIGHT"')
{
    const robot = new Robot()

    robot.do("PLACE, 3, 2, SOUTH")
    robot.do("RIGHT")
    console.assert(robot.x === 3)
    console.assert(robot.y === 2)
    console.assert(robot.facing === "WEST")
}

console.log('CASE robot attend instruction "REPORT"')
{
    const robot = new Robot()

    robot.place(1, 4, "SOUTH")
    robot.right()
    robot.move()

    const result = robot.do("REPORT")
    console.assert(result === "0,4,WEST")
}

console.log('CASE wrong command')
{
    const robot = new Robot()

    let expectedError = null

    try {
        robot.do("wtf")
    } catch (error) {
        expectedError = error
    }

    console.assert(expectedError !== null)
    console.assert(expectedError instanceof Error)
    console.assert(expectedError.message === "Wrong command!")
}


console.log(`CASE Example a:
PLACE 0,0,NORTH
MOVE
REPORT`)
{
    const robot = new Robot()

    robot.do("MOVE")

    const output = robot.do("REPORT")

    console.assert(output === "0,1,NORTH")
}

console.log(`CASE Example b:
PLACE 0,0,NORTH
LEFT
REPORT`)
{
    const robot = new Robot()

    robot.do("PLACE 0, 0, NORTH")
    robot.do("LEFT")

    const output = robot.do("REPORT")

    console.assert(output === "0,0,WEST")
}

console.log(`CASE Example c:
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT`)
{
    const robot = new Robot()

    robot.do("PLACE 1,2,EAST")
    robot.do("MOVE")
    robot.do("MOVE")
    robot.do("LEFT")
    robot.do("MOVE")

    const output = robot.do("REPORT")

    console.assert(output === "3,3,NORTH")
}