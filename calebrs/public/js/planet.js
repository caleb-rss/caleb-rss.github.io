import * as THREE from "three";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";

const container = document.getElementById("ascii-planet");

if (!container) {
    throw new Error("Missing #ascii-planet container");
}


/* ==================================================
   MASTER SETTINGS
================================================== */

const width = 380;
const height = 280;

const cameraDistance = 7.5;

const asciiResolution = 0.20;
const characters = " .:-=+*#%@";

/*
 * Seven ASCII render passes is a lot of work.
 * 30 FPS remains smooth for this kind of animation.
 */
const targetFPS = 30;
const frameInterval = 1000 / targetFPS;


/* ==================================================
   WEBSITE COLORS
================================================== */

const styles =
    getComputedStyle(document.documentElement);

const pageBg =
    styles.getPropertyValue("--bg").trim()
    || "#c9c3b5";

const pageText =
    styles.getPropertyValue("--text").trim()
    || "#24231f";

const primary =
    styles.getPropertyValue("--primary").trim()
    || "#d94d20";

const muted =
    styles.getPropertyValue("--muted").trim()
    || "#69655d";


/*
 * EASY COLOR TWEAKING
 */
const colors = {
    stars: "#3a008b",

    planet: pageText,

    ringOuter: primary,
    ringInner: "#b63d18",

    cometTail: "#BCB8B1",
    cometDust: primary,
    comet: "#6c27cd"
};


/* ==================================================
   CAMERA
================================================== */

const camera = new THREE.PerspectiveCamera(
    42,
    width / height,
    0.1,
    100
);


/*
 * Top-down + slightly angled.
 */
camera.position.set(
    0,
    4.8,
    cameraDistance
);

camera.lookAt(0, 0, 0);


/* ==================================================
   SHARED GEOMETRY
================================================== */

const planetRadius = 1.75;


/*
 * Shared occluder.
 *
 * White becomes blank space in AsciiEffect but still
 * blocks geometry behind Saturn via the depth buffer.
 */
const occluderGeometry =
    new THREE.SphereGeometry(
        planetRadius + 0.015,
        48,
        32
    );

const occluderMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffffff
    });


function createOccluder() {
    return new THREE.Mesh(
        occluderGeometry,
        occluderMaterial
    );
}


/* ==================================================
   STARFIELD
================================================== */

const starScene =
    new THREE.Scene();


/*
 * Prevent stars from appearing through Saturn.
 */
starScene.add(
    createOccluder()
);


const stars = [];
const starCount = 300;


/*
 * All stars share one geometry and material.
 */
const starGeometry =
    new THREE.OctahedronGeometry(
        0.055,
        0
    );

const starMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x555555
    });


for (
    let i = 0;
    i < starCount;
    i++
) {

    const star =
        new THREE.Mesh(
            starGeometry,
            starMaterial
        );


    /*
     * Distributed behind Saturn.
     */
    star.position.set(
        THREE.MathUtils.randFloat(
            -5.2,
            5.2
        ),

        THREE.MathUtils.randFloat(
            -3.8,
            3.8
        ),

        THREE.MathUtils.randFloat(
            -4.2,
            -1.6
        )
    );


    star.userData.twinkleSpeed =
        THREE.MathUtils.randFloat(
            0.7,
            2.2
        );

    star.userData.twinkleOffset =
        Math.random()
        * Math.PI
        * 2;

    star.userData.baseScale =
        THREE.MathUtils.randFloat(
            0.55,
            1.35
        );


    stars.push(star);

    starScene.add(star);
}


/* ==================================================
   PLANET
================================================== */

const planetScene =
    new THREE.Scene();


planetScene.add(
    new THREE.AmbientLight(
        0xffffff,
        0.8
    )
);


const planetLight =
    new THREE.DirectionalLight(
        0xffffff,
        3.5
    );

planetLight.position.set(
    -3,
    5,
    4
);

planetScene.add(
    planetLight
);


const planetGeometry =
    new THREE.SphereGeometry(
        planetRadius,
        48,
        32
    );


const planetMaterial =
    new THREE.MeshPhongMaterial({
        color: 0x4a4a4a,
        flatShading: true
    });


const planet =
    new THREE.Mesh(
        planetGeometry,
        planetMaterial
    );


planetScene.add(
    planet
);


/* ==================================================
   OUTER RING
================================================== */

const outerRingScene =
    new THREE.Scene();


outerRingScene.add(
    createOccluder()
);


const outerRingGeometry =
    new THREE.RingGeometry(
        2.25,
        3.55,
        128
    );


const outerRingMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x222222,
        side: THREE.DoubleSide
    });


const ringTilt = {
    x: Math.PI / 2.35,
    z: 0.78
};


const outerRingGroup =
    new THREE.Group();


const outerRing =
    new THREE.Mesh(
        outerRingGeometry,
        outerRingMaterial
    );


outerRing.position.z =
    0.06;

outerRingGroup.add(
    outerRing
);


outerRingGroup.rotation.set(
    ringTilt.x,
    0,
    ringTilt.z
);


outerRingScene.add(
    outerRingGroup
);


/* ==================================================
   INNER RING
================================================== */

const innerRingScene =
    new THREE.Scene();


innerRingScene.add(
    createOccluder()
);


const innerRingGeometry =
    new THREE.RingGeometry(
        2.00,
        2.72,
        128
    );


const innerRingMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x333333,
        side: THREE.DoubleSide
    });


const innerRingGroup =
    new THREE.Group();


const innerRing =
    new THREE.Mesh(
        innerRingGeometry,
        innerRingMaterial
    );


innerRing.position.z =
    0.12;

innerRingGroup.add(
    innerRing
);


innerRingGroup.rotation.set(
    ringTilt.x + 0.02,
    0,
    ringTilt.z - 0.08
);


innerRingScene.add(
    innerRingGroup
);


/* ==================================================
   COMET HEAD
================================================== */

const cometScene =
    new THREE.Scene();


/*
 * Allows the comet to actually pass behind Saturn.
 */
cometScene.add(
    createOccluder()
);


cometScene.add(
    new THREE.AmbientLight(
        0xffffff,
        1.2
    )
);


const cometLight =
    new THREE.DirectionalLight(
        0xffffff,
        4
    );

cometLight.position.set(
    -3,
    4,
    5
);

cometScene.add(
    cometLight
);


const cometOrbit =
    new THREE.Group();


cometScene.add(
    cometOrbit
);


/* COMET GEOMETRY */

const cometGeometry =
    new THREE.IcosahedronGeometry(
        0.30,
        1
    );


/*
 * Distort the nucleus.
 */
const cometPositions =
    cometGeometry
        .attributes
        .position;


for (
    let i = 0;
    i < cometPositions.count;
    i++
) {

    const variation =
        0.85
        + Math.random()
        * 0.25;


    cometPositions.setXYZ(
        i,

        cometPositions.getX(i)
        * variation,

        cometPositions.getY(i)
        * variation,

        cometPositions.getZ(i)
        * variation
    );
}


cometPositions.needsUpdate =
    true;

cometGeometry.computeVertexNormals();


const cometMaterial =
    new THREE.MeshPhongMaterial({
        color: 0x333333,
        flatShading: true
    });


const comet =
    new THREE.Mesh(
        cometGeometry,
        cometMaterial
    );


comet.scale.set(
    1.0,
    0.80,
    0.90
);


/*
 * Orbit radius.
 */
const cometOrbitRadius =
    3.45;


comet.position.x =
    cometOrbitRadius;


cometOrbit.add(
    comet
);


/*
 * Opposite diagonal from Saturn:
 *
 * Saturn /
 * comet  \
 */
const cometOrbitTiltX =
    Math.PI / 2.8;

const cometOrbitTiltZ =
    -Math.PI / 6;


cometOrbit.rotation.x =
    cometOrbitTiltX;

cometOrbit.rotation.z =
    cometOrbitTiltZ;


/* ==================================================
   COMET TAIL
================================================== */

const cometTailScene =
    new THREE.Scene();


/*
 * Tail also respects Saturn's depth.
 */
cometTailScene.add(
    createOccluder()
);


const cometTailOrbit =
    new THREE.Group();


cometTailScene.add(
    cometTailOrbit
);


const tailPoints = [];

const tailSegments =
    28;

const tailArc =
    Math.PI / 2.4;


for (
    let i = 0;
    i <= tailSegments;
    i++
) {

    const progress =
        i / tailSegments;


    /*
     * Tail trails behind the comet.
     */
    const angle =
        tailArc
        - tailArc
        * progress;


    const radius =
        cometOrbitRadius
        - (1 - progress)
        * 0.15;


    const x =
        Math.cos(angle)
        * radius;

    const z =
        Math.sin(angle)
        * radius;


    const y =
        Math.sin(
            progress * Math.PI
        )
        * 0.08;


    tailPoints.push(
        new THREE.Vector3(
            x,
            y,
            z
        )
    );
}


const tailCurve =
    new THREE.CatmullRomCurve3(
        tailPoints
    );


const cometTailGeometry =
    new THREE.TubeGeometry(
        tailCurve,
        56,
        0.050,
        5,
        false
    );


const cometTailMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x444444
    });


const cometTail =
    new THREE.Mesh(
        cometTailGeometry,
        cometTailMaterial
    );


cometTailOrbit.add(
    cometTail
);


cometTailOrbit.rotation.x =
    cometOrbitTiltX;

cometTailOrbit.rotation.z =
    cometOrbitTiltZ;


/* ==================================================
   COMET DUST
================================================== */

const cometDustScene =
    new THREE.Scene();


/*
 * Dust can disappear behind Saturn too.
 */
cometDustScene.add(
    createOccluder()
);


const dustParticles = [];

const maxDustParticles =
    44;


/*
 * Shared geometry/material.
 */
const dustGeometry =
    new THREE.IcosahedronGeometry(
        0.040,
        0
    );


const dustMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x333333
    });


for (
    let i = 0;
    i < maxDustParticles;
    i++
) {

    const particle =
        new THREE.Mesh(
            dustGeometry,
            dustMaterial
        );


    particle.visible =
        false;


    particle.userData.life =
        0;

    particle.userData.maxLife =
        0;

    particle.userData.baseScale =
        1;

    particle.userData.velocity =
        new THREE.Vector3();


    dustParticles.push(
        particle
    );


    cometDustScene.add(
        particle
    );
}


/*
 * Reusable vectors.
 *
 * Avoid creating garbage every animation frame.
 */
const cometWorldPosition =
    new THREE.Vector3();

const previousCometPosition =
    new THREE.Vector3();

const cometDirection =
    new THREE.Vector3();

const dustVelocityScratch =
    new THREE.Vector3();


let nextDustIndex =
    0;


/* --------------------------------------------------
   SPAWN DUST PARTICLE
-------------------------------------------------- */

function spawnCometDust() {

    let particle =
        null;


    /*
     * Circular search through our particle pool.
     */
    for (
        let i = 0;
        i < maxDustParticles;
        i++
    ) {

        const index =
            (
                nextDustIndex
                + i
            )
            % maxDustParticles;


        if (
            !dustParticles[index]
                .visible
        ) {

            particle =
                dustParticles[index];


            nextDustIndex =
                (
                    index
                    + 1
                )
                % maxDustParticles;


            break;
        }
    }


    if (!particle) {
        return;
    }


    particle.visible =
        true;


    particle.position.copy(
        cometWorldPosition
    );


    /*
     * Start around the nucleus rather than one
     * perfectly identical emission point.
     */
    particle.position.x +=
        THREE.MathUtils.randFloat(
            -0.11,
            0.11
        );

    particle.position.y +=
        THREE.MathUtils.randFloat(
            -0.11,
            0.11
        );

    particle.position.z +=
        THREE.MathUtils.randFloat(
            -0.11,
            0.11
        );


    particle.userData.maxLife =
        THREE.MathUtils.randFloat(
            0.8,
            1.9
        );


    particle.userData.life =
        particle.userData.maxLife;


    /*
     * Start opposite the comet's travel direction.
     */
    dustVelocityScratch
        .copy(cometDirection)
        .multiplyScalar(
            -THREE.MathUtils
                .randFloat(
                    0.22,
                    0.58
                )
        );


    /*
     * Random breakup.
     */
    dustVelocityScratch.x +=
        THREE.MathUtils.randFloat(
            -0.12,
            0.12
        );


    /*
     * Bias downward to give us falling flakes.
     */
    dustVelocityScratch.y +=
        THREE.MathUtils.randFloat(
            -0.28,
            -0.02
        );


    dustVelocityScratch.z +=
        THREE.MathUtils.randFloat(
            -0.12,
            0.12
        );


    particle
        .userData
        .velocity
        .copy(
            dustVelocityScratch
        );


    particle.userData.baseScale =
        THREE.MathUtils.randFloat(
            0.6,
            1.45
        );


    particle.scale.setScalar(
        particle.userData
            .baseScale
    );


    particle.rotation.set(
        Math.random()
        * Math.PI,

        Math.random()
        * Math.PI,

        Math.random()
        * Math.PI
    );
}


/* ==================================================
   ASCII LAYER FACTORY
================================================== */

function createAsciiLayer({
    scene,
    color,
    zIndex,
    resolution = asciiResolution,
    chars = characters,
    background = "transparent"
}) {

    const renderer =
        new THREE.WebGLRenderer({
            alpha: false,
            antialias: false,
            powerPreference: "low-power"
        });


    /*
     * We do not need retina-resolution WebGL
     * because the result becomes ASCII anyway.
     */
    renderer.setPixelRatio(1);


    renderer.setSize(
        width,
        height,
        false
    );


    /*
     * White becomes empty ASCII space.
     */
    renderer.setClearColor(
        0xffffff,
        1
    );


    const effect =
        new AsciiEffect(
            renderer,
            chars,
            {
                invert: false,
                resolution
            }
        );


    effect.setSize(
        width,
        height
    );


    const element =
        effect.domElement;


    element.style.position =
        "absolute";

    element.style.inset =
        "0";

    element.style.width =
        `${width}px`;

    element.style.height =
        `${height}px`;

    element.style.color =
        color;

    element.style.backgroundColor =
        background;

    element.style.fontFamily =
        '"JetBrains Mono", monospace';

    element.style.fontSize =
        "6px";

    element.style.lineHeight =
        "1";

    element.style.overflow =
        "hidden";

    element.style.userSelect =
        "none";

    element.style.pointerEvents =
        "none";

    element.style.zIndex =
        String(zIndex);


    container.appendChild(
        element
    );


    return {
        scene,
        renderer,
        effect
    };
}


/* ==================================================
   ASCII LAYERS
================================================== */

container.style.position =
    "relative";


/*
 * The lowest layer owns the actual beige background.
 */
const starLayer =
    createAsciiLayer({
        scene: starScene,

        color:
            colors.stars,

        background:
            pageBg,

        zIndex: 0,

        resolution:
            0.20,

        chars:
            " .+*"
    });


const planetLayer =
    createAsciiLayer({
        scene: planetScene,

        color:
            colors.planet,

        zIndex: 1,

        resolution:
            0.24,

        chars:
            " .:-=+*#%@"
    });


const outerRingLayer =
    createAsciiLayer({
        scene: outerRingScene,

        color:
            colors.ringOuter,

        zIndex: 2,

        resolution:
            0.19,

        chars:
            " .-=*#"
    });


const innerRingLayer =
    createAsciiLayer({
        scene: innerRingScene,

        color:
            colors.ringInner,

        zIndex: 3,

        resolution:
            0.19,

        chars:
            " .-=*#"
    });


const cometTailLayer =
    createAsciiLayer({
        scene: cometTailScene,

        color:
            colors.cometTail,

        zIndex: 4,

        resolution:
            0.18,

        chars:
            " .:-=*"
    });


const cometDustLayer =
    createAsciiLayer({
        scene: cometDustScene,

        color:
            colors.cometDust,

        zIndex: 5,

        resolution:
            0.20,

        chars:
            " .:*"
    });


const cometLayer =
    createAsciiLayer({
        scene: cometScene,

        color:
            colors.comet,

        zIndex: 6,

        resolution:
            0.23,

        chars:
            " .:-=+*#%@"
    });


/* ==================================================
   ANIMATION
================================================== */

const clock =
    new THREE.Clock();


let lastRenderedAt =
    0;


/*
 * Initialize comet position before animation starts.
 */
cometScene.updateMatrixWorld(
    true
);

comet.getWorldPosition(
    previousCometPosition
);


/* --------------------------------------------------
   ANIMATE
-------------------------------------------------- */

function animate(timestamp) {

    requestAnimationFrame(
        animate
    );


    /*
     * Don't waste CPU/GPU when this tab isn't visible.
     */
    if (document.hidden) {

        clock.getDelta();

        return;
    }


    /*
     * Cap ASCII conversion to ~30 FPS.
     */
    if (
        timestamp
        - lastRenderedAt
        < frameInterval
    ) {
        return;
    }


    lastRenderedAt =
        timestamp;


    /*
     * Clamp delta to avoid huge jumps after interruptions.
     */
    const delta =
        Math.min(
            clock.getDelta(),
            0.05
        );


    const time =
        clock.elapsedTime;


/* --------------------------------------------------
   PLANET
-------------------------------------------------- */

    planet.rotation.y +=
        0.12
        * delta;


    const ringWobbleX =
        Math.sin(time * 0.9)
        * 0.08;

    const ringWobbleZ =
        Math.sin(time * 1.35)
        * 0.12;

    outerRingGroup.rotation.x =
        ringTilt.x + ringWobbleX;

    outerRingGroup.rotation.z =
        ringTilt.z + ringWobbleZ;

    innerRingGroup.rotation.x =
        ringTilt.x + 0.02 + ringWobbleX * 0.75;

    innerRingGroup.rotation.z =
        ringTilt.z - 0.08 + ringWobbleZ * 0.75;


/* --------------------------------------------------
   TWINKLING STARS
-------------------------------------------------- */

    for (
        const star
        of stars
    ) {

        const wave =
            Math.sin(
                time
                * star.userData
                    .twinkleSpeed
                + star.userData
                    .twinkleOffset
            );


        /*
         * Convert sine from -1..1 to 0..1.
         */
        const brightness =
            0.5
            + wave
            * 0.5;


        /*
         * Stars shrink enough to occasionally
         * disappear during ASCII conversion.
         */
        const scale =
            star.userData
                .baseScale
            * (
                0.30
                + brightness
                * 0.95
            );


        star.scale.setScalar(
            scale
        );


        star.rotation.x +=
            delta
            * 0.35;

        star.rotation.z +=
            delta
            * 0.55;
    }


/* --------------------------------------------------
   COMET ORBIT
-------------------------------------------------- */

    const cometAngle =
        time
        * 0.28;


    cometOrbit.rotation.y =
        cometAngle;


    cometTailOrbit.rotation.y =
        cometAngle;


/* --------------------------------------------------
   COMET TUMBLE
-------------------------------------------------- */

    comet.rotation.x =
        time
        * 0.8;

    comet.rotation.y =
        time
        * 0.55;

    comet.rotation.z =
        time
        * 0.35;


/* --------------------------------------------------
   COMET MOVEMENT VECTOR
-------------------------------------------------- */

    cometScene.updateMatrixWorld(
        true
    );


    comet.getWorldPosition(
        cometWorldPosition
    );


    cometDirection.subVectors(
        cometWorldPosition,
        previousCometPosition
    );


    /*
     * Don't normalize a zero-length vector.
     */
    if (
        cometDirection
            .lengthSq()
        > 1e-10
    ) {

        cometDirection.normalize();
    }


    previousCometPosition.copy(
        cometWorldPosition
    );


/* --------------------------------------------------
   SPAWN DUST
-------------------------------------------------- */

    /*
     * Frame-rate-independent emission rate.
     *
     * Approximately 10 flakes per second.
     */
    const dustPerSecond =
        10;


    const spawnChance =
        1
        - Math.exp(
            -dustPerSecond
            * delta
        );


    if (
        Math.random()
        < spawnChance
    ) {

        spawnCometDust();
    }


/* --------------------------------------------------
   UPDATE DUST
-------------------------------------------------- */

    for (
        const particle
        of dustParticles
    ) {

        if (
            !particle.visible
        ) {
            continue;
        }


        particle
            .userData
            .life -=
            delta;


        if (
            particle
                .userData
                .life <= 0
        ) {

            particle.visible =
                false;

            continue;
        }


        particle.position
            .addScaledVector(
                particle
                    .userData
                    .velocity,

                delta
            );


        /*
         * Tiny gravity-like drift.
         */
        particle
            .userData
            .velocity
            .y -=
            0.07
            * delta;


        /*
         * Flakes tumble while breaking away.
         */
        particle.rotation.x +=
            delta
            * 2.0;

        particle.rotation.y +=
            delta
            * 1.1;

        particle.rotation.z +=
            delta
            * 1.4;


        /*
         * Gradually shrink until ASCII conversion
         * naturally stops displaying them.
         */
        const lifeRatio =
            particle
                .userData
                .life
            /
            particle
                .userData
                .maxLife;


        const scale =
            particle
                .userData
                .baseScale

            * Math.max(
                0.08,
                lifeRatio
            );


        particle.scale.setScalar(
            scale
        );


        if (
            lifeRatio
            <= 0.05
        ) {

            particle.visible =
                false;
        }
    }


/* --------------------------------------------------
   RENDER
-------------------------------------------------- */

    starLayer.effect.render(
        starScene,
        camera
    );


    planetLayer.effect.render(
        planetScene,
        camera
    );


    outerRingLayer.effect.render(
        outerRingScene,
        camera
    );


    innerRingLayer.effect.render(
        innerRingScene,
        camera
    );


    cometTailLayer.effect.render(
        cometTailScene,
        camera
    );


    cometDustLayer.effect.render(
        cometDustScene,
        camera
    );


    cometLayer.effect.render(
        cometScene,
        camera
    );
}


requestAnimationFrame(
    animate
);