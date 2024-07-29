function clock() {
  const now = new Date();
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // setup canvas
  ctx.save(); // save default state
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); // Put 0, 0 in the middle
  ctx.rotate(-Math.PI / 2); // Rotate clock - 90deg

  // default styles
  ctx.strokeStyle = '#DDD';
  ctx.fillStyle = '#f4f4f4';
  ctx.lineWidth = '5';
  ctx.lineCap = 'round';

  // draw clock face / border
  ctx.save();

  (() => {
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#800000';
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
  })();

  ctx.restore();

  // draw hour lines
  ctx.save();

  for (i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.moveTo(110, 0);
    ctx.lineTo(130, 0);
    ctx.stroke();

    ctx.rotate(Math.PI / 6);
  }

  ctx.restore();

  //draw minute lines
  ctx.save();
  for (i = 0; i < 60; i++) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.moveTo(125, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();

    ctx.rotate(Math.PI / 30);
  }

  ctx.restore();

  // get current time
  const hour = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // draw hour hand
  ctx.save();

  ctx.rotate(
    (Math.PI / 6) * hour + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.strokeStyle = '#800000';
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();

  ctx.restore();

  //draw minute hand
  ctx.save();

  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = '#800000';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();

  ctx.restore();

  // draw second hand
  ctx.save();

  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = '#FF7F50';
  ctx.fillStyle = '#FF7F50';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.arc(0, 0, 6, 0, Math.PI * 2, true);
  ctx.fill();

  ctx.restore();

  ctx.restore(); // restore default state

  requestAnimationFrame(clock);
}

requestAnimationFrame(clock);
