export function createPendulum(canvasId, opts = {}) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  if (!ctx || !canvas) {
    alert("Canvas not supported");
    return;
  }
  const scale = opts.scale ?? 200;
  const offsets = opts.offsets ?? [256, 10];
  const l = opts.l ?? 1;
  const m = opts.m ?? 1;
  const g = opts.g ?? 9.81;
  const dt = opts.dt ?? 0.01;
  const simulationSpeedFactor = opts.simulationSpeedFactor ?? 500;

  function draw(theta) {
    const L = l * scale;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const x = L * Math.sin(theta);
    const y = L * Math.cos(theta);
    ctx.beginPath();
    ctx.moveTo(offsets[0], offsets[1]);
    ctx.lineTo(offsets[0] + x, offsets[1] + y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(offsets[0] + x, offsets[1] + y, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawText(text, x, y) {
    ctx.font = "16px Arial";
    ctx.fillText(text, x, y);
  }

  return { draw, drawText, l, m, g, dt, simulationSpeedFactor };
}
