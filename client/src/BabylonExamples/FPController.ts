import {
    Scene,
    Engine,
  //  SceneLoader,
    Vector3,
    HemisphericLight,
    ImportMeshAsync,
    FreeCamera,
  } from "@babylonjs/core";
  import "@babylonjs/loaders";
  
  export class FirstPersonController {
    scene: Scene;
    engine: Engine;
  
    constructor(private canvas: HTMLCanvasElement) {
      this.engine = new Engine(this.canvas, true);
      this.scene = this.CreateScene();
  
      this.CreateEnvironment();
  
      this.CreateController();
  
      this.engine.runRenderLoop(() => {
        this.scene.render();
      });
    }
  
    CreateScene(): Scene {
      const scene = new Scene(this.engine);
      new HemisphericLight("hemi", new Vector3(0, 1, 0), this.scene);
  
      scene.onPointerDown = (evt) => {
        if (evt.button === 0) this.engine.enterPointerlock();
        if (evt.button === 1) this.engine.exitPointerlock();
      };
  
      const framesPerSecond = 60;
      const gravity = -9.81;
      scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);
      scene.collisionsEnabled = true;
  
      return scene;
    }
  
    async CreateEnvironment(): Promise<void> {
      // const { meshes } = await SceneLoader.ImportMeshAsync(
      //   "",
      //   "./models/",
      //   "Prototype_Level.glb",
      //   this.scene
      // );
      // const {meshes} = await SceneLoader.ImportMeshAsync(
      //   "",
      //   "https://cors-anywhere.herokuapp.com/https://github.com/Babylon-Projects/Babylon_101/blob/6494a554cc2ed97872fc93809b230545135fbc6b/public/models/",
      //   "Prototype_Level.glb",
      //   this.scene
      // );
      // const {meshes} = await ImportMeshAsync(
      //   " https://raw.githubusercontent.com/occiandiaali/blindate-dot-com/main/client/public/models/Prototype_Level.glb",
      //   this.scene
      // );
      const {meshes} = await ImportMeshAsync(
        "https://raw.githubusercontent.com/occiandiaali/blindate-dot-com/multi-chat/client/public/models/tropical_resort_lobby.glb",
        this.scene
      );
      // const {meshes} = await ImportMeshAsync(
      //   "https://raw.githubusercontent.com/occiandiaali/blindate-dot-com/multi-chat/client/public/models/outdoor.glb",
      //   this.scene
      // );
  
      meshes.map((mesh) => {
        mesh.checkCollisions = true;
      });
    }
  
    CreateController(): void {
      const camera = new FreeCamera("camera", new Vector3(0, 10, 0), this.scene);
      camera.attachControl();
  
      camera.applyGravity = true;
      camera.checkCollisions = true;
  
      camera.ellipsoid = new Vector3(1, 1, 1);
  
      camera.minZ = 0.45;
      camera.speed = 0.75;
      camera.angularSensibility = 4000;
  
      camera.keysUp.push(87);
      camera.keysLeft.push(65);
      camera.keysDown.push(83);
      camera.keysRight.push(68);
    }
  }
  