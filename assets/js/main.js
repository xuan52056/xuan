const social = [
  {
    id: 'phone',
    name: 'Phone Number',
    value: '',
    icon: './assets/images/call.svg',
  },
  {
    id: 'email',
    name: 'Email',
    value: '',
    icon: './assets/images/email.svg',
  },
  {
    id: 'fb',
    name: 'Facebook',
    value: 'https://www.facebook.com/ngo.xuan.52056',
    icon: './assets/images/facebook.svg',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    value: 'https://www.instagram.com/ngo.xuan.52056/',
    icon: './assets/images/instagram.svg',
  },
  // {
  //   id: 'twitter',
  //   name: 'Twitter',
  //   value: 'https://twitter.com/hunghg255',
  //   icon: './assets/images/twitter.svg',
  // },
  // {
  //   id: 'linkedin',
  //   name: 'Linkedin',
  //   value: 'https://www.linkedin.com/in/hoanggiahung/',
  //   icon: './assets/images/linkedin.svg',
  // },
  // {
  //   id: 'github',
  //   name: 'Github',
  //   value: 'https://github.com/hunghg255',
  //   icon: './assets/images/github.svg',
  // },
];

document.addEventListener('DOMContentLoaded', () => {
  const socialListEle = document.querySelector('.socialList');

  const list = social.reduce((acc, item) => {
    let link = item.value;
    if (item.id === 'phone') link = `tel:${item.value}`;
    if (item.id === 'email') link = `mailto:${item.value}`;

    const liStr = `<li><a href="${link}" target="_blank"><img src="${item.icon}" alt="" /><span>${item.name}</span></a></li>`;
    acc += liStr;
    return acc;
  }, '');

  socialListEle.innerHTML = list;

  // canvas
  let body = document.querySelector('body');
  body.insertAdjacentHTML(
    'afterend',
    `<div class='mask'></div>
      <canvas class="canvas"></canvas>`
  );
  let canvas = document.querySelector('.canvas');
  let c = canvas.getContext('2d');

  //set size canvas
  function setCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvas();
  window.addEventListener('resize', setCanvas);

  function createX() {
    return Math.floor(Math.random() * canvas.width);
  }

  function createY() {
    return Math.floor(Math.random() * canvas.height);
  }

  // Star
  function Star(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.floor(Math.random() * 2) + 1;
    this.color = `dodgerblue`;
  }
  // Ve
  Star.prototype.draw = function () {
    c.fillStyle = this.color;
    c.shadowBlur = this.r * 2;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.closePath();
    c.fill();
  };

  // move
  Star.prototype.move = function () {
    if (this.y > 0) {
      this.y -= 1.5;
    } else {
      this.y = canvas.height;
    }
    this.draw();
  };

  let arrayStar;
  function init() {
    arrayStar = [];
    for (let i = 0; i < 60; i++) {
      arrayStar.push(new Star(createX(), createY()));
    }
  }

  function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    arrayStar.forEach((c) => {
      c.move();
    });
  }
  init();
  animate();
});
