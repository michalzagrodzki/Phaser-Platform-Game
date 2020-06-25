function getScore (vm) {
  const highscore = localStorage.getItem('highscore')
  if (highscore == null) {
    vm.highscore = 0;
  } else {
    vm.highscore = highscore;
  }
  return vm
};

function setScore (vm) {
  const score = vm.score
  const highscore = vm.highscore

  if (highscore == null) {
    localStorage.setItem('highscore', score)
  } else if (score > highscore) {
    localStorage.setItem('highscore', score)
  }
};

export {
  getScore,
  setScore
}