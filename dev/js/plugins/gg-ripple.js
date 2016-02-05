import Waves from 'node-waves';

export default function () {
  Waves.attach('.gg-appbar-icon', ['waves-circle', 'waves-light']);
  Waves.attach('.gg-icon-flat, .gg-searchbar-icon', ['waves-circle']);
  Waves.attach('.gg-icon-flat-light', ['waves-circle', 'waves-light']);
  Waves.attach('.gg-appbar-menu ul li a, .gg-drawer ul li a, .gg-card-addon-list ul li a');
  Waves.attach('.gg-button-flat', ['waves-button']);
  Waves.attach('.gg-chip-flat', ['waves-circle']);
  Waves.attach('.gg-button-flat-light', ['waves-button', 'waves-light']);
  Waves.attach('.gg-chip-flatlight', ['waves-circle', 'waves-light']);
  Waves.init();
}
