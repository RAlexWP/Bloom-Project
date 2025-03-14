import { Engine } from "./system/engine";

const engine = new Engine();
engine.initialise().then(async () =>{

  // init game objects from classes and shaders go here... 


  engine.onUpdate = (dt) => {
  }
  
  engine.onDraw = () => { 
  }

  engine.draw();
});


