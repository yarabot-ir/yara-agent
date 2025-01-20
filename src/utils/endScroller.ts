function EndScroller() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth', // Smooth scrolling
  });
}
export default EndScroller;
