import { Background } from "./background";
import { HazardBox } from "./hazard-box";
import { Player } from "./player";
//import { Content } from "./system/content";
import { Engine } from "./system/engine";

const engine = new Engine();
engine.initialise().then(async () =>{

  // init game objects from classes and shaders go here... 
  
  const player = new Player(engine.InputManager, engine.clientBounds[0], engine.clientBounds[1]);
  const hazardBox = new HazardBox(engine.clientBounds[0], engine.clientBounds[1]);
  const background = new Background(engine.clientBounds[0], engine.clientBounds[1]);

  //const textureEffect = engine.effectsFactory.createTextureEffect();
  //textureEffect.setTexture(Content.backgroundTextrue);

  engine.onUpdate = (dt) => {
    background.update(dt);
    player.update(dt);
    hazardBox.update(dt);
  }
  
  engine.onDraw = () => { 

    //textureEffect.bind();

    engine.spriteRenderer.begin();

    background.draw(engine.spriteRenderer);
    player.draw(engine.spriteRenderer);
    hazardBox.draw(engine.spriteRenderer);

    engine.spriteRenderer.end();

    //textureEffect.draw();
  }

  engine.draw();
});


