"use client";

import { useEffect, useRef } from "react";

const VERTEX = `#version 300 es
in vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }`;

// Draws layered sheets of silk. Each sheet has a sharp, bright edge along a slowly
// moving curve, a translucent body that fades away from that edge, and fine threads
// running parallel to it. Sheets are composited back to front.
const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uLight;
uniform float uMode;
out vec4 color;

vec3 rgb = vec3(0.0);
float alpha = 0.0;
vec3 bodyColor, glowColor, warmColor, threadColor, edgeColor, warmEdge;

void over(vec3 c, float a) {
  rgb = c * a + rgb * (1.0 - a);
  alpha = a + alpha * (1.0 - a);
}

// d: signed distance to the sheet's edge. side: which side of the edge is filled.
// warm: how far this sheet leans from teal towards amber.
void sheet(float d, float side, float amount, float falloff, float line, float threads, float warm) {
  float aa = max(fwidth(d), 0.0004);
  float inside = d * side;
  // Most pixels sit outside most sheets, so leaving early is the biggest saving here.
  if (inside < -aa * 2.0) return;

  float depth = max(inside, 0.0);
  float fade = exp(-depth * falloff);
  float fill = smoothstep(-aa, aa, inside) * fade;
  over(mix(bodyColor, mix(glowColor, warmColor, warm), fade * fade * fade), fill * amount);

  if (threads > 0.0) {
    // A triangle wave raised to the 8th power: narrow, evenly spaced lines.
    float wave = abs(fract(depth * 33.0) - 0.5) * 2.0;
    wave *= wave;
    wave *= wave;
    wave *= wave;
    over(threadColor, fill * wave * threads);
  }

  over(mix(edgeColor, warmEdge, warm), (1.0 - smoothstep(0.0, aa * 1.5, abs(d))) * line);
}

void hero(vec2 uv, float t, float portrait) {
  float x = uv.x + uPointer.x * 0.008;
  // Portrait screens have text across the full width, so the sweep is compressed
  // into the lower part of the hero, behind the code symbol.
  float y = uv.y * mix(1.0, 2.1, portrait);

  // The main sweep: climbs from lower centre to the right edge.
  float fadeIn = smoothstep(0.26, 0.62, x);
  if (fadeIn > 0.0) {
    float rise = 0.03 + 0.8 * pow(max(x - 0.24, 0.0) * 1.3, 1.75);
    float ripple = 0.015 * sin(x * 7.3 - t * 0.21);
    float shimmer = 0.72 + 0.28 * sin(x * 9.0 + y * 5.0 + t * 0.25);
    for (int n = 0; n < 6; n++) {
      float i = float(n);
      float near = (i + 1.0) / 6.0;
      float wave = 0.034 * sin(x * 3.1 + t * 0.17 + i * 1.7);
      float spread = (i - 2.5) * (0.012 + 0.05 * x);
      float curve = rise + ripple + wave + spread - uPointer.y * 0.012 * near;
      sheet(y - curve, -1.0, 0.24 * fadeIn * shimmer, 7.5 + i * 1.5, 0.42 * fadeIn * near, 0.07 * fadeIn, smoothstep(3.0, 5.0, i));
    }
  }

  // A quieter sheet across the top right, kept dim so the navigation stays readable.
  float fadeRight = smoothstep(0.46, 0.8, x);
  if (fadeRight > 0.0) {
    float top = uv.y - 0.26 * portrait;
    float curve = 1.2 - 0.62 * smoothstep(0.42, 1.08, x) + 0.018 * sin(x * 6.0 + t * 0.15);
    sheet(top - curve, 1.0, 0.22 * fadeRight, 5.0, 0.32 * fadeRight, 0.05 * fadeRight, 0.0);
    sheet(top - curve - 0.055, 1.0, 0.1 * fadeRight, 4.0, 0.26 * fadeRight, 0.0, 0.85);
  }

  // And a small one tucked into the top left corner.
  float fadeLeft = smoothstep(0.34, 0.08, x) * (1.0 - portrait);
  if (fadeLeft > 0.0) {
    float curve = 0.82 + 0.95 * x + 0.012 * sin(x * 11.0 + t * 0.2);
    sheet(y - curve, 1.0, 0.2 * fadeLeft, 7.0, 0.3 * fadeLeft, 0.05 * fadeLeft, 0.0);
  }
}

void footer(vec2 uv, float t) {
  float x = uv.x + uPointer.x * 0.006;
  // The bright edges stay above the footer's text; only the soft bodies reach behind it.
  float ripple = 0.025 * sin(x * 7.0 - t * 0.16);
  for (int n = 0; n < 4; n++) {
    float i = float(n);
    float near = (i + 1.0) / 4.0;
    float curve = 0.66 + 0.09 * sin(x * 3.0 + t * 0.12 + i * 0.7) + ripple + i * 0.035;
    sheet(uv.y - curve, -1.0, 0.18, 3.2 + i * 0.6, 0.38 * near, 0.0, i > 2.5 ? 0.85 : 0.0);
  }
}

void main() {
  // Greens and yellow from the palette: each pair is the dark theme, then the light theme.
  bodyColor = mix(vec3(0.06, 0.21, 0.16), vec3(0.56, 0.72, 0.62), uLight);
  glowColor = mix(vec3(0.13, 0.46, 0.36), vec3(0.20, 0.58, 0.48), uLight);
  warmColor = mix(vec3(0.52, 0.35, 0.11), vec3(0.66, 0.44, 0.12), uLight);
  threadColor = mix(vec3(0.25, 0.55, 0.45), vec3(0.10, 0.44, 0.36), uLight);
  edgeColor = mix(vec3(0.40, 0.70, 0.58), vec3(0.04, 0.38, 0.31), uLight);
  warmEdge = mix(vec3(0.66, 0.44, 0.12), vec3(0.62, 0.40, 0.08), uLight);

  vec2 uv = gl_FragCoord.xy / uRes;
  float blend;
  if (uMode > 0.5) {
    footer(uv, uTime);
    blend = smoothstep(1.0, 0.78, uv.y);
  } else {
    hero(uv, uTime, 1.0 - smoothstep(0.75, 1.25, uRes.x / uRes.y));
    blend = smoothstep(0.0, 0.2, uv.y);
  }

  color = vec4(rgb, alpha) * blend * mix(1.0, 0.72, uLight);
}`;

const MIN_FRAME_MS = 30;
const START_DELAY_MS = 200;

function isSoftwareRenderer(gl: WebGL2RenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
  return /swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer);
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Silk shader failed to compile:", gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

/** Sets up the silk on a canvas and starts it. Returns a function that stops it. */
function startSilk(canvas: HTMLCanvasElement, mode: "hero" | "footer") {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  // No WebGL2: the CSS gradient behind the canvas stays as the background.
  if (!gl) return;

  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniform = {
    res: gl.getUniformLocation(program, "uRes"),
    time: gl.getUniformLocation(program, "uTime"),
    pointer: gl.getUniformLocation(program, "uPointer"),
    light: gl.getUniformLocation(program, "uLight"),
    mode: gl.getUniformLocation(program, "uMode"),
  };
  gl.uniform1f(uniform.mode, mode === "footer" ? 1 : 0);

  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const isLight = () => (root.dataset.theme === "light" ? 1 : 0);

  // The silk is soft, so it can render below native resolution. If frames still run
  // long, resolution steps down; if that isn't enough (say, no GPU), the animation
  // stops on its current frame so the rest of the page stays smooth.
  let quality = Math.min(window.devicePixelRatio || 1, 1.25) * 0.75;
  let qualityDrops = 0;
  let frozen = isSoftwareRenderer(gl);
  let light = isLight();
  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;
  let frame = 0;
  let onScreen = false;
  let lastDraw = 0;
  let lastFrame = 0;
  let sampleTime = 0;
  let sampleFrames = 0;
  const startedAt = performance.now() - (mode === "footer" ? 40_000 : 20_000);
  let seconds = (performance.now() - startedAt) / 1000;

  const resize = () => {
    const width = Math.max(1, Math.round(canvas.clientWidth * quality));
    const height = Math.max(1, Math.round(canvas.clientHeight * quality));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
    gl.uniform2f(uniform.res, canvas.width, canvas.height);
  };

  const draw = (now: number) => {
    const moving = !reducedMotion.matches && !frozen;
    if (moving) seconds = (now - startedAt) / 1000;
    light += (isLight() - light) * (moving ? 0.06 : 1);
    pointerX += (targetX - pointerX) * 0.04;
    pointerY += (targetY - pointerY) * 0.04;
    gl.uniform1f(uniform.time, seconds);
    gl.uniform1f(uniform.light, light);
    gl.uniform2f(uniform.pointer, pointerX, pointerY);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const measure = (now: number) => {
    // Sustained frames slower than this mean the page can't hold 40fps with the silk on.
    sampleTime += now - lastFrame;
    sampleFrames += 1;
    lastFrame = now;
    // Several frames, so one long frame during page load can't trigger this.
    if (sampleTime < 800 || sampleFrames < 3) return;

    const average = sampleTime / sampleFrames;
    sampleTime = 0;
    sampleFrames = 0;
    if (average <= 26) return;

    qualityDrops += 1;
    if (qualityDrops > 2 || average > 120) {
      frozen = true;
      return;
    }
    quality *= 0.72;
    resize();
  };

  const tick = (now: number) => {
    frame = 0;
    // The silk moves too slowly for 30fps to be visible, and this leaves the
    // GPU free to keep the rest of the page at full frame rate.
    if (now - lastDraw >= MIN_FRAME_MS) {
      lastDraw = now;
      draw(now);
    }
    if (lastFrame) measure(now);
    else lastFrame = now;
    schedule();
  };

  const schedule = () => {
    if (frame || frozen || !onScreen || document.hidden || reducedMotion.matches) return;
    frame = requestAnimationFrame(tick);
  };

  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
  };

  const redrawOnce = () => {
    if (reducedMotion.matches || frozen) draw(performance.now());
  };

  const resizeObserver = new ResizeObserver(() => {
    resize();
    redrawOnce();
  });
  resizeObserver.observe(canvas);

  const intersection = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen) schedule();
    else stop();
  });
  intersection.observe(canvas);

  const themeObserver = new MutationObserver(redrawOnce);
  themeObserver.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  const onVisibility = () => (document.hidden ? stop() : schedule());
  document.addEventListener("visibilitychange", onVisibility);

  const onPointer = (event: PointerEvent) => {
    targetX = (event.clientX / window.innerWidth - 0.5) * 2;
    targetY = (event.clientY / window.innerHeight - 0.5) * -2;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  const onContextLost = (event: Event) => {
    event.preventDefault();
    stop();
    delete canvas.dataset.ready;
  };
  canvas.addEventListener("webglcontextlost", onContextLost);

  resize();
  draw(performance.now());
  canvas.dataset.ready = "true";

  return () => {
    stop();
    resizeObserver.disconnect();
    intersection.disconnect();
    themeObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pointermove", onPointer);
    canvas.removeEventListener("webglcontextlost", onContextLost);
  };
}

export function SilkCanvas({ mode }: { mode: "hero" | "footer" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Setting up WebGL takes real work, so it waits until the silk is about to be
    // seen and the page has finished loading its first content.
    let stopSilk: (() => void) | undefined;
    let timer = 0;
    const nearScreen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        nearScreen.disconnect();
        timer = window.setTimeout(() => {
          stopSilk = startSilk(canvas, mode);
        }, START_DELAY_MS);
      },
      { rootMargin: "400px" },
    );
    nearScreen.observe(canvas);

    return () => {
      nearScreen.disconnect();
      clearTimeout(timer);
      stopSilk?.();
    };
  }, [mode]);

  return (
    <div className={`silk silk--${mode}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
