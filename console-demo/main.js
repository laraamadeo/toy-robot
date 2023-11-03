function start() {
    const robot = new Robot

        ; (function main() {
            const command = prompt(`Type an instruction for the robot!
Type "PLACE X, Y, FACING" to start
Type "LEFT" to rotate 90º anticlockwise
Type "RIGHT" to rotate 90º clockwise
Type "MOVE" to move 1 unit in facing direction
Type "REPORT" to end instructions and print result`)

            try {
                const result = robot.do(command)

                if (result) console.log(result)
            } catch (error) {
                console.error(error.message)
            }

            main()
        })()
}