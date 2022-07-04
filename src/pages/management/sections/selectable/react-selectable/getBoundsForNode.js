export default node => {
  const rect = node.getBoundingClientRect();

  return {
    top: rect.top+document.body.scrollTop,
    left: rect.left+document.body.scrollLeft,
    offsetWidth: node.offsetWidth,
    offsetHeight: node.offsetHeight
  };
};
