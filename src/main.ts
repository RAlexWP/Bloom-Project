import { Background } from "./background";
import { Content } from "./system/content";
import { Engine } from "./system/engine";

const engine = new Engine();
engine.initialise().then(async () =>{

  // init game objects from classes and shaders go here... 
  
  //const player = new Player(engine.clientBounds[0], engine.clientBounds[1]);
  const background = new Background(engine.clientBounds[0], engine.clientBounds[1]);

  //const textureEffect = engine.effectsFactory.createTextureEffect();
  //textureEffect.setTexture(Content.backgroundTextrue);

  engine.onUpdate = (dt) => {
    background.update(dt);
  }
  
  engine.onDraw = () => { 

    //textureEffect.bind();

    engine.spriteRenderer.begin();

    background.draw(engine.spriteRenderer);

    engine.spriteRenderer.end();
  }

  engine.draw();
});


