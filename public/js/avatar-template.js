NAF.schemas.getComponentsOriginal = NAF.schemas.getComponents;
NAF.schemas.getComponents = (template) => {
  if (!NAF.schemas.hasTemplate('#avatar-template')) {
    NAF.schemas.add({
      template: '#avatar-template',
      components: [
        {
          component: 'position',
          requiresNetworkUpdate: NAF.utils.vectorRequiresUpdate(0.001)
        },
        {
          component: 'rotation',
          requiresNetworkUpdate: NAF.utils.vectorRequiresUpdate(0.5)
        },
        {
          selector: '.avatar',
          component: 'gltf-model'
        }
      ]
    });
    NAF.schemas.add({
      template: '#left-hand-template',
      components: [
        {
          component: 'position',
          requiresNetworkUpdate: NAF.utils.vectorRequiresUpdate(0.001)
        },
        {
          component: 'rotation',
          requiresNetworkUpdate: NAF.utils.vectorRequiresUpdate(0.5)
        },
        'networked-hand-controls'
      ]
    });
    NAF.schemas.add({
      template: '#right-hand-template',
      components: [
        {
          component: 'position',
          requiresNetworkUpdate: NAF.utils.vectorRequiresUpdate(0.001)
        },
        {
          component: 'rotation',
          requiresNetworkUpdate: NAF.utils.vectorRequiresUpdate(0.5)
        },
        'networked-hand-controls'
      ]
    });
  }
  const components = NAF.schemas.getComponentsOriginal(template);
  return components;
};


