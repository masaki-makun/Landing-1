import "../css/style.scss";
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

// --Topに戻るボタン処理
const returnToTop = (elmId, duration) => {
  const topButton = document.getElementById(elmId);
  const getScrolled = () => {
    return window.pageYOffset !== undefined
      ? window.pageYOffset
      : document.documentElement.scrollTop;
  };
  window.addEventListener("scroll", () => {
    getScrolled() > 500 ? topBtnActive() : topBtnHide();
  });
  topButton.addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      const begin = new Date() - 0;
      const yOffset = window.pageYOffset;
      const timer = setInterval(function () {
        let current = new Date() - begin;
        if (current > duration) {
          clearInterval(timer);
          current = duration;
          topBtnHide();
        }
        window.scrollTo(0, yOffset * (1 - current / duration));
      }, 10);
    },
    false
  );
};
returnToTop("return-top", 500);
// Topに戻るボタン処理 --

// --ページ内スクロール処理
const smoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]');
  const panel = document.querySelector(".nav-links");
  const overlay = document.querySelector(".overlay");
  const PANEL_TOGGLE_CLASS = "nav-active";
  const OVERLAY_TOGGLE_CLASS = "overlay-active";
  links.forEach((link) => {
    link.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        let href = link.getAttribute("href");
        let targetElement = document.getElementById(href.replace("#", ""));
        const offset = window.pageYOffset;
        const rect = targetElement.getBoundingClientRect().top;
        const gap = 75;
        const targetPc = rect + offset;
        const targetSp = rect + offset - gap;
        if (window.innerWidth < 768) {
          window.scrollTo({
            top: targetSp,
            behavior: "smooth",
          });
        } else {
          window.scrollTo({
            top: targetPc,
            behavior: "smooth",
          });
        }
        panel.classList.remove(PANEL_TOGGLE_CLASS);
        overlay.classList.remove(OVERLAY_TOGGLE_CLASS);
        topBtnActive();
      },
      false
    );
  });
};
smoothScroll();
// ページ内スクロール処理 --

// -- TopBtn非表示処理
const topBtnHide = () => {
  const topBtn = document.querySelector("#return-top");
  const TOP_BTN_ADD_CLASS = "is-hide";
  topBtn.classList.add(TOP_BTN_ADD_CLASS);
};
//  TopBtn非表示処理 --

// -- TopBtn表示処理
const topBtnActive = () => {
  const topBtn = document.querySelector("#return-top");
  const TOP_BTN_REMOVE_CLASS = "is-hide";
  topBtn.classList.remove(TOP_BTN_REMOVE_CLASS);
};
//  TopBtn表示処理 --

// -- panel, overlay表示非表示切り替え処理
const panelToggle = () => {
  const panel = document.querySelector(".nav-links");
  const menuBtn = document.querySelector(".burger");
  const overlay = document.querySelector(".overlay");
  const PANEL_TOGGLE_CLASS = "nav-active";
  const OVERLAY_TOGGLE_CLASS = "overlay-active";
  const width = window.innerWidth;
  menuBtn.addEventListener("click", () => {
    if (width < 768) {
      panel.classList.add(PANEL_TOGGLE_CLASS);
      overlay.classList.add(OVERLAY_TOGGLE_CLASS);
      topBtnHide();
    } else {
      panel.classList.remove(PANEL_TOGGLE_CLASS);
      overlay.classList.remove(OVERLAY_TOGGLE_CLASS);
      topBtnActive();
    }
  });
  overlay.addEventListener("click", () => {
    if (overlay.classList.contains(OVERLAY_TOGGLE_CLASS)) {
      overlay.classList.remove(OVERLAY_TOGGLE_CLASS);
      panel.classList.remove(PANEL_TOGGLE_CLASS);
      topBtnActive();
    }
  });
};
panelToggle();
// panel, overlay表示非表示切り替え処理 --
