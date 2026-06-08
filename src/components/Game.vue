<script>
import { Client } from '@stomp/stompjs';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import { vec3 } from 'three/tsl';

import createChar from './ThreejsFunctions/CreateChar';
import rotateChar from './ThreejsFunctions/CharRotation';
import IKControl from './ThreejsFunctions/IKControl';

import px from '../assets/images/px.png'
import nx from '../assets/images/nx.png'
import py from '../assets/images/py.png'
import ny from '../assets/images/ny.png'
import pz from '../assets/images/pz.png'
import nz from '../assets/images/nz.png'

const client = new Client();
client.brokerURL = 'ws://localhost:8080/ws'

export default {
  props: ['code', 'playerID', 'players'],

  mounted() {
    const players = {}

    client.onConnect = (() => {
      console.log("connected!")

      const onMessage = ((message) => {
        const body = JSON.parse(message.body)

        if (body.type && body.type == "playerList") {
          body.players.forEach((playerID, i) => {
            if (!players[playerID]) {
              const angle = (i / 4) * Math.PI * 2
              const x = Math.sin(angle) * 4
              const z = Math.cos(angle) * 4

              players[playerID] = createChar()
              scene.add(players[playerID].root)
              players[playerID].root.rotation.y = Math.atan2(-x, -z)
              players[playerID].root.position.set(x, 0, z)
              players[playerID].facingAngle = Math.atan2(-x, -z)  // mesmo ângulo do root.rotation.y

            }
          })
          return
        }
        if (body.playerID != this.playerID) {
          rotateChar(body, players[body.playerID])
          IKControl(body, players[body.playerID])
        }
      });

      const subscription = client.subscribe(`/topics/${this.code}`, onMessage)
    });
    client.connectHeaders = {
      playerID: this.playerID,
      code: this.code,
      playerList: this.players
    }
    client.activate()

    const Width = this.$refs.holder.clientWidth
    const Height = this.$refs.holder.clientHeight
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, Width / Height, 0.1, 1000);

    this.players.forEach((playerID, i) => {
      const angle = (i / 4) * Math.PI * 2
      const x = Math.sin(angle) * 4
      const z = Math.cos(angle) * 4

      players[playerID] = createChar()
      scene.add(players[playerID].root)
      players[playerID].root.rotation.y = Math.atan2(-x, -z)
      players[playerID].root.position.set(x, 0, z)
      players[playerID].facingAngle = Math.atan2(-x, -z)  // mesmo ângulo do root.rotation.y

    })
    players[this.playerID].head.children[players[this.playerID].head.children.length - 1].visible = false
    players[this.playerID].neck.children[players[this.playerID].neck.children.length - 1].visible = false

    const i = this.players.indexOf(this.playerID)
    const angle = (i / 4) * Math.PI * 2
    const x = Math.sin(angle) * 4
    const z = Math.cos(angle) * 4

    camera.position.set(x, 2.5, z)
    camera.lookAt(-x, 0, -z)

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(Width, Height);
    this.$refs.holder.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(8, 1, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = -2
    scene.add(cube);

    const controls = new PointerLockControls(camera, renderer.domElement)
    renderer.domElement.addEventListener('click', () => controls.lock())

    controls.addEventListener('change', () => {
      const dir = new THREE.Vector3();
      controls.getDirection(dir);

      client.publish({
        destination: '/app/playerControl',
        body: JSON.stringify({
          code: this.code,
          x: dir.x,
          y: dir.y,
          z: dir.z
        })
      })
    })

    const initialEuler = new THREE.Euler(0, 0, 0, 'YXZ')
    initialEuler.setFromQuaternion(camera.quaternion)
    const initialYaw = initialEuler.y

    const yawMargin = Math.PI / 2
    const MIN_YAW = initialYaw - yawMargin
    const MAX_YAW = initialYaw + yawMargin

    controls.minPolarAngle = 30 * (Math.PI / 180)
    controls.maxPolarAngle = 150 * (Math.PI / 180)

    controls.addEventListener('change', () => {
      const euler = new THREE.Euler(0, 0, 0, 'YXZ')
      euler.setFromQuaternion(camera.quaternion)

      let delta = euler.y - initialYaw

      while (delta > Math.PI) delta -= Math.PI * 2
      while (delta < -Math.PI) delta += Math.PI * 2

      if (delta < -yawMargin || delta > yawMargin) {
        euler.y = initialYaw + THREE.MathUtils.clamp(delta, -yawMargin, yawMargin)
        camera.quaternion.setFromEuler(euler)
      }
    })

    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([px, nx, py, ny, pz, nz]);
    scene.background = texture;
    
    const animate = () => {
      if (players[this.playerID]) {
        const headPos = new THREE.Vector3()
        players[this.playerID].head.getWorldPosition(headPos)
        camera.position.copy(headPos)

        const dir = new THREE.Vector3();
        controls.getDirection(dir);

        const body = {
          playerID: this.playerID,
          x: dir.x,
          y: dir.y,
          z: dir.z
        }

        rotateChar(body, players[this.playerID])
        IKControl(body, players[this.playerID])
      }

      renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate);
  }
}
</script>

<template>
  <div id="holder" ref="holder"></div>
</template>

<style>
#holder {
  width: 1280px;
  height: 900px;
}
</style>