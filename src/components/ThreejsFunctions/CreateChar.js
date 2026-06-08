import * as THREE from 'three';

function createChar() {
    const root = new THREE.Group()
    const spine = new THREE.Group()
    const chest = new THREE.Group()
    const neck = new THREE.Group()
    const head = new THREE.Group()

    const shoulderL = new THREE.Group()
    const upperArmL = new THREE.Group()
    const lowerArmL = new THREE.Group()
    const handL = new THREE.Group()

    const shoulderR = new THREE.Group()
    const upperArmR = new THREE.Group()
    const lowerArmR = new THREE.Group()
    const handR = new THREE.Group()

    root.position.set(0, 0, 0)
    spine.position.set(0, .4, 0)
    chest.position.set(0, 1, 0)
    neck.position.set(0, .65, 0)
    head.position.set(0, .5, 0)

    shoulderL.position.set(-.95, 0.30, 0)
    upperArmL.position.set(0, 0, 0)
    lowerArmL.position.set(0, -1.1, 0)
    handL.position.set(0, -1, 0)

    shoulderR.position.set(.95, 0.30, 0)
    upperArmR.position.set(0, 0, 0)
    lowerArmR.position.set(0, -1.1, 0)
    handR.position.set(0, -1, 0)

    root.add(spine)
    spine.add(chest)
    chest.add(neck)
    chest.add(shoulderL)
    chest.add(shoulderR)
    neck.add(head)

    shoulderR.add(upperArmR)
    upperArmR.add(lowerArmR)
    lowerArmR.add(handR)

    shoulderL.add(upperArmL)
    upperArmL.add(lowerArmL)
    lowerArmL.add(handL)

    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00})

    const spineCube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, .7),
        material
    )
    spine.add(spineCube)

    const chestCube = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 1, .7),
        material
    )
    chest.add(chestCube)

    const neckCube = new THREE.Mesh(
        new THREE.BoxGeometry(.5, .3, .5),
        material
    )
    neck.add(neckCube)

    const headCube = new THREE.Mesh(
        new THREE.BoxGeometry(.8, .8, .8),
        material
    )
    head.add(headCube)

    const shoulderRCube = new THREE.Mesh(
        new THREE.SphereGeometry(.35, 8, 8),
        material
    )
    shoulderR.add(shoulderRCube)

    const upperArmRCube = new THREE.Mesh(
        new THREE.CylinderGeometry(.25, .25, .8),
        material
    )
    upperArmR.add(upperArmRCube)
    upperArmRCube.position.y = -0.7

    const lowerArmRCube = new THREE.Mesh(
        new THREE.CylinderGeometry(.25, .25, .8),
        material
    )
    lowerArmR.add(lowerArmRCube)
    lowerArmRCube.position.y = -.4

    const handRCube = new THREE.Mesh(
        new THREE.SphereGeometry(.3, 8, 8),
        material
    )
    handR.add(handRCube)

    const shoulderLCube = new THREE.Mesh(
        new THREE.SphereGeometry(.35, 8, 8),
        material
    )
    shoulderL.add(shoulderLCube)

    const upperArmLCube = new THREE.Mesh(
        new THREE.CylinderGeometry(.25, .25, .8),
        material
    )
    upperArmL.add(upperArmLCube)
    upperArmLCube.position.y = -0.7

    const lowerArmLCube = new THREE.Mesh(
        new THREE.CylinderGeometry(.25, .25, .8),
        material
    )
    lowerArmL.add(lowerArmLCube)
    lowerArmLCube.position.y = -.4

    const handLCube = new THREE.Mesh(
        new THREE.SphereGeometry(.3, 8, 8),
        material
    )
    handL.add(handLCube)

    return {
        root,
        spine,
        chest,
        neck,
        head,
        shoulderL,
        upperArmL,
        lowerArmL,
        handL,
        shoulderR,
        upperArmR,
        lowerArmR,
        handR
    }
}
export default createChar