window.addEventListener('DOMContentLoaded', () => {
  var countDownDate = new Date('Jun 5, 2026 17:30:00').getTime();

  var x = setInterval(function () {
    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

    if (distance < 0) {
      clearInterval(x);
      document.getElementById('countdown').innerHTML = 'EXPIRED';
    }
  }, 1000);

  const uec = new SaveTheDateCountdown('.cd');

  createEntranceAnimation();
});

function createEntranceAnimation() {
  const tl = gsap.timeline();

  gsap.set(['h1', '.date p', '.location', '.save-our-date', '.countdown', '.image-container'], {
    opacity: 0,
    y: 50,
  });

  gsap.set(['.maya-line', '.date-line'], {
    scaleY: 0,
  });

  gsap.set('.calendar-icon', {
    opacity: 0,
    scale: 0.5,
  });

  gsap.set('.maya', {
    x: 50,
  });

  gsap.set('.on', {
    x: -50,
  });

  gsap.set('.image-container', {
    y: 100,
    opacity: 0,
  });

  tl.to('h1', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'back.out(1.7)',
  })

    .to(
      '.maya-line',
      {
        scaleY: 1,
        duration: 1.2,
        ease: 'power2.out',
      },
      '-=0.5'
    )

    .to(
      '.date-line',
      {
        scaleY: 1,
        duration: 1.2,
        ease: 'power2.out',
      },
      '-=0.8'
    )

    .to(
      '.maya',
      {
        x: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      },
      '-=0.3'
    )

    .to(
      '.on',
      {
        x: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      },
      '-=0.4'
    )

    .to(
      '.date p',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
      },
      '-=0.4'
    )

    .to(
      '.location',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      },
      '-=0.4'
    )

    .to(
      '.save-our-date',
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.75)',
      },
      '-=0.2'
    )

    .to(
      '.countdown',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.5'
    )

    .to(
      '.calendar-icon',
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      },
      '-=0.3'
    )

    .to(
      '.image-container',
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
      },
      '-=0.3'
    );
}

class SaveTheDateCountdown {
  constructor(qs) {
    this.el = document.querySelector(qs);
    this.time = [];
    this.animTimeout = null;
    this.updateTimeout = null;
    this.update();
  }

  getProgressInSeconds() {
    const now = new Date().getTime();
    return Math.floor(now / 1000);
  }

  getTimeLeft() {
    const targetDate = new Date('Jun 5, 2026 17:30:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    let timeLeft = {
      mo: 0,
      d: 0,
      h: 0,
      m: 0,
      s: 0,
    };

    if (distance > 0) {
      const totalDays = Math.floor(distance / (1000 * 60 * 60 * 24));

      const months = Math.floor(totalDays / 30.44);
      const remainingDays = totalDays - Math.floor(months * 30.44);

      timeLeft.mo = months;
      timeLeft.d = remainingDays;
      timeLeft.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      timeLeft.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      timeLeft.s = Math.floor((distance % (1000 * 60)) / 1000);
    }

    return timeLeft;
  }

  clearAnimations() {
    if (this.el) {
      const colAnimsToClear = this.el.querySelectorAll('[data-col]');
      Array.from(colAnimsToClear).forEach(a => {
        a.classList.remove('cd__digit--roll-in');
      });

      const posAnimsToClear = this.el.querySelectorAll('[data-pos]');
      Array.from(posAnimsToClear).forEach(a => {
        a.classList.remove('cd__next-digit-fade', 'cd__prev-digit-fade');
      });
    }
  }

  update(doAnimations = false) {
    if (!this.time.length) {
      let digitCount = 10;

      while (digitCount--) this.time.push('-');
    }

    const display = this.getTimeLeft();
    const displayDigits = [];

    for (let v in display) {
      const digits = `${display[v]}`.split('');

      if (digits.length < 2) digits.unshift('0');

      displayDigits.push(...digits);
    }

    const cols = this.el ? this.el.querySelectorAll('[data-col]') : [];
    if (cols.length > 0) {
      Array.from(cols).forEach((c, i) => {
        const digit = displayDigits[i] || '0';

        if (digit !== this.time[i]) {
          const next = c.querySelector('[data-pos="next"]');
          const prev = c.querySelector('[data-pos="prev"]');

          if (next && prev) {
            if (doAnimations === true) {
              c.classList.add('cd__digit--roll-in');
              next.classList.add('cd__next-digit-fade');
              prev.classList.add('cd__prev-digit-fade');
            }

            next.innerHTML = digit;
            prev.innerHTML = this.time[i] || '0';
          }
        }
      });
    }

    this.time = displayDigits;

    const progress = this.el.querySelector('[data-progress]');
    if (progress) progress.innerHTML = this.getProgressInSeconds();

    clearTimeout(this.animTimeout);
    this.animTimeout = setTimeout(this.clearAnimations.bind(this), 500);

    clearTimeout(this.updateTimeout);
    this.updateTimeout = setTimeout(this.update.bind(this, true), 1000);
  }
}
