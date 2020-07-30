function createControls (vm) {

  const level = vm.controlsBaseLevel - (vm.controlSpriteSize / 4);

  vm.controls = {}
  let buttonLeft = vm.add.sprite(vm.width / 8, level, 'button_left');
  let buttonRight = vm.add.sprite(vm.width / 3, level, 'button_right');
  let buttonUp = vm.add.sprite(vm.width / 1.2, level, 'button_up');

  vm.controls.buttonLeft = buttonLeft;
  vm.controls.buttonLeft.setInteractive();
  vm.controls.buttonLeft.on('pointerdown', () => { vm.controls.buttonLeft.isDown = true });
  vm.controls.buttonLeft.on('pointerup', () => { vm.controls.buttonLeft.isDown = false });

  vm.controls.buttonRight = buttonRight;
  vm.controls.buttonRight.setInteractive();
  vm.controls.buttonRight.on('pointerdown', () => { vm.controls.buttonRight.isDown = true });
  vm.controls.buttonRight.on('pointerup', () => { vm.controls.buttonRight.isDown = false });

  vm.controls.buttonUp = buttonUp;
  vm.controls.buttonUp.setInteractive();
  vm.controls.buttonUp.on('pointerdown', () => { vm.controls.buttonUp.isDown = true });
  vm.controls.buttonUp.on('pointerup', () => { vm.controls.buttonUp.isDown = false });
};

export {
  createControls
}