import * as THREE from 'three';

function rotateChar(body, playerRig) {
    const dir = new THREE.Vector3(body.x, body.y, body.z)
    
    const localDir = dir.clone()
    const inverseMatrix = new THREE.Matrix4()
    inverseMatrix.copy(playerRig.root.matrixWorld).invert()
    localDir.transformDirection(inverseMatrix)

    const yaw = Math.atan2(localDir.x, localDir.z)
    const pitch = Math.atan2(localDir.y, Math.sqrt(localDir.x * localDir.x + localDir.z * localDir.z))

    playerRig.spine.rotation.order = 'YXZ'
    playerRig.chest.rotation.order = 'YXZ'
    playerRig.head.rotation.order = 'YXZ'

    playerRig.spine.rotation.y = yaw * 0.20
    playerRig.chest.rotation.y = yaw * 0.35
    playerRig.head.rotation.y = yaw * 0.45

    playerRig.spine.rotation.x = -pitch * 0.10
    playerRig.chest.rotation.x = -pitch * 0.25
    playerRig.head.rotation.x = -pitch * 0.65
}

export default rotateChar