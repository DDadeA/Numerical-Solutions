export function createPendulum(canvasId, opts = {}) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  if (!ctx || !canvas) {
    alert("Canvas not supported");
    return;
  }
  const scale = opts.scale ?? 100;
  const offsets = opts.offsets ?? [256, 256];
  const l = opts.l ?? 1;
  const m = opts.m ?? 1;
  const g = opts.g ?? 9.81;
  const dt = opts.dt ?? 0.01;
  const simulationSpeedFactor = opts.simulationSpeedFactor ?? 1000;

  let data = [];
  function draw(theta1, theta2) {
    const L = l * scale;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    const x1 = L * Math.sin(theta1);
    const y1 = L * Math.cos(theta1);
    ctx.beginPath();
    ctx.moveTo(offsets[0], offsets[1]);
    ctx.lineTo(offsets[0] + x1, offsets[1] + y1);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(offsets[0] + x1, offsets[1] + y1, 10, 0, Math.PI * 2);
    ctx.fill();

    const x2 = L * Math.sin(theta2) + x1;
    const y2 = L * Math.cos(theta2) + y1;
    ctx.beginPath();
    ctx.moveTo(offsets[0] + x1, offsets[1] + y1);
    ctx.lineTo(offsets[0] + x2, offsets[1] + y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(offsets[0] + x2, offsets[1] + y2, 10, 0, Math.PI * 2);
    ctx.fill();

    data.push([x2, y2]);

    // Draw the trajectory of the second pendulum

    ctx.moveTo(offsets[0] + x2, offsets[1] + y2);
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const [x, y] = data[i];
      ctx.lineTo(offsets[0] + x, offsets[1] + y);
    }
    ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
    ctx.stroke();
  }

  function drawText(text, x, y) {
    ctx.font = "16px Arial";
    ctx.fillText(text, x, y);
  }

  return { draw, drawText, l, m, g, dt, simulationSpeedFactor };
}
