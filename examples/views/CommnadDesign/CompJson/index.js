import ImageJson from './Image.json';
import ComponentJson from './Component.json';
export const componentList = [
  {
    key: '1',
    name: '通用组件',
    components: [{ ...ImageJson, id: 1 }]
  },
  {
    key: '2',
    name: '列组件',
    components: [
      { ...ComponentJson, id: 13, label: '警情列表' },
      { ...ComponentJson, id: 17, label: '预警列表' }
    ]
  }
];
