const lerp = (a, b, n) => (1 - n) * a + n * b;

class Cursor {
  constructor() {
    this.target = { x: 0.5, y: 0.5 }; 
    this.cursor = { x: 0.5, y: 0.5 }; 
    this.speed = 1;
    this.init();
  }
  bindAll() {
    ["onMouseMove", "render"].forEach((fn) => (this[fn] = this[fn].bind(this)));
  }
  onMouseMove(e) {
    this.target.x = e.clientX / window.innerWidth;
    this.target.y = e.clientY / window.innerHeight;
    if (!this.raf) this.raf = requestAnimationFrame(this.render);
  }
  render() {
    this.cursor.x = lerp(this.cursor.x, this.target.x, this.speed);
    this.cursor.y = lerp(this.cursor.y, this.target.y, this.speed);
    document.documentElement.style.setProperty("--cursor-x", this.cursor.x);
    document.documentElement.style.setProperty("--cursor-y", this.cursor.y);
    const delta = Math.sqrt(
      Math.pow(this.target.x - this.cursor.x, 2) +
        Math.pow(this.target.y - this.cursor.y, 2)
    );
    if (delta < 0.001) {
      cancelAnimationFrame(this.raf);
      this.raf = null;
      return;
    }
    this.raf = requestAnimationFrame(this.render);
  }
  init() {
    this.bindAll();
    window.addEventListener("mousemove", this.onMouseMove);
    this.raf = requestAnimationFrame(this.render);
  }
}

new Cursor();

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: false,
    loop: true,
    autoplayDisableOnInteraction: false,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      600: {
        slidesPerView: "auto",
        spaceBetween: 24,
      },
    },
  });

  const fullHD = document.documentElement.clientWidth;
  const tickers = document.querySelectorAll(".lenta__content");

  tickers.forEach((ticker) => {
    let tickerStyle = window.getComputedStyle(ticker);

    let maxWidth = tickerStyle.getPropertyValue("max-width");
    if (maxWidth.endsWith("px")) {
      maxWidth = parseInt(maxWidth);
    } else {
      maxWidth = fullHD + 2;
    }
    let mark = ticker.querySelector(".lenta__list");
    markWidth = mark.getBoundingClientRect().width;
    markWidth1 = mark.clientWidth;
    console.log(maxWidth + "test");

    console.log(markWidth1);
    // if ( ( markWidth > 0 ) && markWidth   ){

    if (markWidth > 0) {
      let markInnerHTML = mark.innerHTML;
      while (markWidth < maxWidth) {
        console.log(maxWidth);
        mark.innerHTML += markInnerHTML;
        markWidth = markWidth + markWidth;
      }
      mark.parentElement.appendChild(mark.cloneNode(true));
      ticker.classList.add("on");
    }
  });
});