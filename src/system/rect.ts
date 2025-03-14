/* gets the x, y, width and height coordinates of sprite */
export class Rect {

    constructor(public x: number, public y: number, 
        public width: number, public height: number) {
        }

        //To prevent copying by reference
        public copy(): Rect {
            return new Rect(this.x, this.y, this.width, this.height);
        }
}