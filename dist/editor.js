(function initialize() {
  const sectors = [
    /*
    {
      name: 'General',
      open: false,
      buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom']
    },
    */
    {
      name: 'Dimension',
      open: false,
      buildProps: [ 'width', 'flex-width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
      properties: [{
        id: 'flex-width',
        type: 'integer',
        name: 'Width',
        units: ['px', '%'],
        property: 'flex-basis',
        toRequire: 1,
      }]
    },
    {
      name: 'Typography',
      open: false,
      buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-shadow'],
      properties: [{
        property: 'text-align',
        list    : [
          {value: 'left', className: 'fa fa-align-left'},
          {value: 'center', className: 'fa fa-align-center' },
          {value: 'right', className: 'fa fa-align-right'},
          {value: 'justify', className: 'fa fa-align-justify'}
        ],
      }]
    },
    {
      name: 'Decorations',
      open: false,
      buildProps: ['border-radius-c', 'background-color', /*'border-radius', */'border', 'box-shadow', 'background'],
    },
    {
      name: 'Extra',
      open: false,
      buildProps: ['opacity'/*, 'transition', 'perspective', 'transform'*/],
      properties: [{
        type: 'slider',
        property: 'opacity',
        defaults: 1,
        step: 0.01,
        max: 1,
        min:0,
      }]
    },
  ];

  const editor  = grapesjs.init(
    {
      container  : '#gjs',
      height: '100%',
      fromElement: true,
      autorender: 0,
      allowScripts: 1,
      showOffsets: 1,
      noticeOnUnload: 0,
      avoidInlineStyle: 1,
      avoidDefaults: 1,
      // forceClass: 0,

      plugins: ['gjs-blocks-basic', 'gjs-plugin-export', 'grapesjs-plugin-demo-product'],

      pluginsOpts: {
        'gjs-plugin-export': {
          // btnLabel: 'Export to ZIP',
          // preHtml: `
          //   <!doctype html>
          //     <html lang="en">
          //       <head><meta charset="utf-8"><link rel="stylesheet" href="./css/style.css"></head>
          //       <body>
          //       <header>
          //         HEADER
          //       </header>
          // `,
          // postHtml: `
          //         <footer>
          //           FOOTER
          //         </footer>
          //       </body>
          //     <html>
          // `,
        },
        'grapesjs-plugin-demo-product': {
          pathToWidget: 'widgets/demoProduct.js'
        },
      },
      
      storageManager: { autoload: 0 },
      // storageManager: { type: 'firebase-firestore' },

      layerManager: {
        showWrapper: 0,
      },
      
      assetManager: {
        embedAsBase64: 1,
        upload: 'https://test.page',
        params: {
          _token: 'pCYrSwjuiV0t5NVtZpQDY41Gn5lNUwo3it1FIkAj',
        },
        assets: [
          { type: 'image', src : 'http://placehold.it/350x250/78c5d6/fff/image1.jpg', height:350, width:250},
          { type: 'image', src : 'http://placehold.it/350x250/459ba8/fff/image2.jpg', height:350, width:250},
          { type: 'image', src : 'http://placehold.it/350x250/79c267/fff/image3.jpg', height:350, width:250},
          { type: 'image', src : 'http://placehold.it/350x250/c5d647/fff/image4.jpg', height:350, width:250},
          { type: 'image', src : 'http://placehold.it/350x250/f28c33/fff/image5.jpg', height:350, width:250},
          { type: 'image', src : 'http://placehold.it/350x250/e868a2/fff/image6.jpg', height:350, width:250},
          { type: 'image', src : 'http://placehold.it/350x250/cc4360/fff/image7.jpg', height:350, width:250},
        ]
      },

      styleManager : {
        clearProperties: 1,
        sectors: sectors,
      },

      // canvas: {
      //   styles: [
      //     'https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i&subset=latin,latin-ext',
      //   ],
      // },
    }
  );


  window.editor = editor;

  const pnm = editor.Panels;

  pnm.addButton(
    'options',
    [
      {
        id: 'undo',
        className: 'fa fa-undo icon-undo',
        command: function(e) { return e.runCommand('core:undo') },
      },
      {
        id: 'redo',
        className: 'fa fa-repeat icon-redo',
        command: function(e) { return e.runCommand('core:redo') },
      },{
        id: 'clear-all',
        className: 'fa fa-trash icon-blank',
        command: function(e) { return e.runCommand('core:canvas-clear') },
      },
    ]
  );

  const bm = editor.BlockManager;

  bm.add(
    'link-block',
    {
      label: 'Link Block',
      attributes: {class:'fa fa-link'},
      category: 'Basic',
      content: {
        type:'link',
        editable: false,
        draggable: '#wrapper',
        style:{
          display: 'inline-block',
          padding: '5px',
          'min-height': '50px',
          'min-width': '50px'
        }
      },
    },
  );

  /*
  editor.on('selector:add', (selector) => {
    if (['.row-flex', '.cell-flex', '.cell-gut'].indexOf(selector.getFullName()) >= 0 ) {
      selector.set({ private: 1 });
    }
  });
  */

  // bm.add('Product', {
  //   label: 'Product',
  //   category: 'Shop',
  //   attributes: {
  //     class:'gjs-fonts gjs-f-b1',
  //     'data-id': '100683',
  //   },
  //   content: {
  //     script: function() {
  //       console.log(this);
  //       this.addEventListener('click', function(e) {
  //         console.log('clicked');
  //       })
  //     },
  //     // style: {padding: '25px'},
  //     components: '<div id="app-demo-product" data-id="100683"></div><script src="widgets/demoProduct.js"><\/script>'
  //   }
  // });

  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  // const defaultModel = defaultType.model;
  // const defaultView = defaultType.view;
  // const textType = domc.getType('text');

  // Store and load events
  editor.on('storage:load', function(e) {
    console.log('LOAD ', e);
  });

  editor.on('storage:store', function(e) {
    console.log('STORE ', e);
  });

  editor.on('traverse:html', function (node, resultNode) {

  });

  editor.on('load', () => {

  });

  const updateComp = (component, hasParent = false, notEditableParent = false) => {
    const notEditableElement = component.attributes.tagName === 'header' || component.attributes.tagName === 'footer';
    const mainElement = component.attributes.tagName === 'main';
    const notEditable = notEditableParent || notEditableElement;
    if (notEditable || mainElement) {
      component.set({
        badgable: false,
        copyable: false,
        draggable: false,
        droppable: mainElement,
        editable: false,
        highlightable: false,
        hoverable: false,
        removable: false,
        resizable: false,
        selectable: false,
        stylable: false,
      });
    }
    if (!hasParent || notEditable) {
      component.get('components').each(c => updateComp(c, true, notEditable));
    }
  }
  
  domc.getComponents().each(c => updateComp(c));

  editor.render();

  editor.Panels.getButton('views', 'open-blocks').set('active', true);
})();
