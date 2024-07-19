import activityUrl from '@/assets/img/activity.png'
export default {
  inherit: "rect",
  markup: [
    {
      tagName: "rect",
      selector: "body",
    },
    {
      tagName: "image",
      selector: "img",
    },
    {
      tagName: "text",
      selector: "label",
    },
  ],
  attrs: {
    body: {
      rx: 6,
      ry: 6,
      borderRadius: 50, 
      stroke: "#e4e7ed",
      fill: "#eff4ff",
      filter: 'drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.12))',
      strokeWidth: 1
    },
    img: {
      x: 9,
      y: 9,
      width: 16,
      height: 16,
      "xlink:href": activityUrl,
    },
    label: {
      fontSize: 13,
      fontWeight: 800,
      fill: "#606266",
    },
  },
};