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
      { ...ComponentJson, id: 13, label: '警情列表', imageUrl: require('../../assets/compImg/warnImg.png') },
      { ...ComponentJson, id: 17, label: '预警列表', imageUrl: require('../../assets/compImg/earlyWarnImg.png') }
    ]
  },
  {
    key: '3',
    name: '头部组件',
    components: [
      { ...ComponentJson, id: 21, label: '驾驶舱顶部', imageUrl: require('../../assets/compImg/driTopImg.png') },
      { ...ComponentJson, id: 22, label: '驾驶舱底部', imageUrl: require('../../assets/compImg/driBottomImg.png') }
    ]
  }
];
