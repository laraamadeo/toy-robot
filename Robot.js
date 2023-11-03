class Robot {
    /**
     * Create a robot with default parameters (0, 0 , NORTH)
     */
    constructor() {
        this.x = 0
        this.y = 0
        this.facing = "NORTH"
    }

    /**
         * Locates the robot in a specific coordinates.
         * @param {number} x - The x value.
         * @param {number} y - The y value.
         * @param {string} facing - The side the robot is facing.
         */
    place(x, y, facing) {
        this.x = x
        this.y = y
        this.facing = facing
    }

    /**
         * Rotates the robot 90º anticlockwise.
         */
    left() {
        const facing = this.facing

        switch (facing) {
            case "NORTH":
                this.facing = "WEST"
                break
            case "WEST":
                this.facing = "SOUTH"
                break
            case "SOUTH":
                this.facing = "EAST"
                break
            case "EAST":
                this.facing = "NORTH"
                break
        }
    }

    /**
    * Rotates the robot 90º clockwise.
    */
    right() {
        const facing = this.facing

        switch (facing) {
            case "NORTH":
                this.facing = "EAST"
                break
            case "WEST":
                this.facing = "NORTH"
                break
            case "SOUTH":
                this.facing = "WEST"
                break
            case "EAST":
                this.facing = "SOUTH"
                break
        }
    }

    /**
        * Moves the robot one unit in facing direction.
        */
    move() {
        if (this.facing === "NORTH" && this.y < 4) {
            this.y++
        } else if (this.facing === "SOUTH" && this.y !== 0) {
            this.y--
        } else if (this.facing === "EAST" && this.x < 4) {
            this.x++
        } else if (this.facing === "WEST" && this.x !== 0) {
            this.x--
        }
    }

    /**
   * Get the y value.
   * @param {string} command - The instruction you want the robot to execute
   * @return {string} Current coordinates of robot(x, y, facing).
   */
    do(command) {
        command = command.toUpperCase()

        switch (true) {
            case command.startsWith("PLACE"):

                const [x, y, facing] = command.slice(6).replaceAll(" ", "").split(",")
                this.place(parseInt(x), parseInt(y), facing)
                break

            case command === "MOVE":
                this.move()
                break

            case command === "LEFT":
                this.left()
                break

            case command === "RIGHT":
                this.right()
                break

            case command === "REPORT":
                return this.report()

            default:
                throw new Error("Wrong command!")
        }
    }
    /**
        * Get the y value.
        * @return {string} Current coordinates of robot(x, y, facing).
        */
    report() {
        return `${this.x},${this.y},${this.facing}`
    }
}

if (typeof module !== "undefined")
    module.exports = Robot