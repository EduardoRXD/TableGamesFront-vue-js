import * as THREE from 'three'

const _inv = new THREE.Matrix4()
const _q = new THREE.Quaternion()
const _v = new THREE.Vector3()

function IKControl(body, playerRig) {
    playerRig.root.updateMatrixWorld(true)

    const shoulderPos = new THREE.Vector3()
    playerRig.shoulderR.getWorldPosition(shoulderPos)
    const target = shoulderPos.clone().addScaledVector(new THREE.Vector3(body.x, body.y, body.z), 1.33)

    const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)
    const c = clamp(shoulderPos.distanceTo(target), 0.05, 1.35)
    playerRig.lowerArmR.rotation.z = -(Math.PI - Math.acos(clamp((0.65**2 + 0.7**2 - c**2) / 0.91, -1, 1))) * 0.7

    const toLocal = (vec, node) => {
        _inv.copy(node.matrixWorld).invert()
        return _v.copy(vec).transformDirection(_inv)
    }

    _q.setFromUnitVectors(new THREE.Vector3(0, -1, 0), toLocal(_v.subVectors(target, shoulderPos).normalize(), playerRig.shoulderR))
    playerRig.upperArmR.quaternion.copy(_q)
    playerRig.upperArmR.updateMatrixWorld(true)

    const localDown = toLocal(new THREE.Vector3(0, -1, 0), playerRig.upperArmR)
    localDown.addScaledVector(new THREE.Vector3(0, 1, 0), -localDown.y).normalize()
    if (localDown.lengthSq() > 0.001)
        playerRig.upperArmR.quaternion.multiply(_q.setFromUnitVectors(new THREE.Vector3(1, 0, -1), localDown))
}

export default IKControl