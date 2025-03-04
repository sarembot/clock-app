const canvas = document.getElementById('canvas');

// styles
const faceColor = document.getElementById('face-color');
const borderColor = document.getElementById('border-color');
const lineColor = document.getElementById('line-color');
const largeHandColor = document.getElementById('large-hand-color');
const secondHandColor = document.getElementById('second-hand-color');
const saveBtn = document.getElementById('save-btn');

faceColor.value =
  localStorage.getItem('face-color') !== null
    ? localStorage.getItem('face-color')
    : '#f4f4f4';
borderColor.value =
  localStorage.getItem('border-color') !== null
    ? localStorage.getItem('border-color')
    : '#800000';
lineColor.value =
  localStorage.getItem('line-color') !== null
    ? localStorage.getItem('line-color')
    : '#000000';
largeHandColor.value =
  localStorage.getItem('hour-color') !== null
    ? localStorage.getItem('hour-color')
    : '#800000';
secondHandColor.value =
  localStorage.getItem('seconds-color') !== null
    ? localStorage.getItem('seconds-color')
    : '#FF7F50';

function clock() {
  const now = new Date();
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

  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.fillStyle = faceColor.value;
  ctx.strokeStyle = borderColor.value;
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();

  localStorage.setItem('face-color', faceColor.value);
  localStorage.setItem('border-color', borderColor.value);

  ctx.restore();

  // draw lines
  ctx.save();
  const drawLines = (color = lineColor.value) => {
    // hours
    for (i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.moveTo(110, 0);
      ctx.lineTo(130, 0);
      ctx.stroke();
      ctx.rotate(Math.PI / 6);
    }

    // minutes
    for (i = 0; i < 60; i++) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.moveTo(125, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();

      ctx.rotate(Math.PI / 30);
    }

    localStorage.setItem('line-color', color);
  };

  drawLines();

  ctx.restore();

  // get current time
  const hour = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // draw hour hand
  ctx.save();
  const drawHourHand = (color = largeHandColor.value) => {
    ctx.rotate(
      (Math.PI / 6) * hour + (Math.PI / 360) * min + (Math.PI / 21600) * sec
    );
    ctx.strokeStyle = color;
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();

    localStorage.setItem('hour-color', color);
  };

  drawHourHand();

  ctx.restore();

  //draw minute hand
  ctx.save();

  const drawMinuteHand = (color = largeHandColor.value) => {
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(112, 0);
    ctx.stroke();

    localStorage.setItem('minute-color', color);
  };

  drawMinuteHand();

  ctx.restore();

  // draw second hand
  ctx.save();

  const drawSecondsHand = (color = secondHandColor.value) => {
    ctx.rotate((sec * Math.PI) / 30);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(100, 0);
    ctx.stroke();
    ctx.arc(0, 0, 6, 0, Math.PI * 2, true);
    ctx.fill();

    localStorage.setItem('seconds-color', color);
  };

  drawSecondsHand();

  ctx.restore();

  ctx.restore(); // default values

  requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

saveBtn.addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'clock-image.png';

  saveBtn.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
