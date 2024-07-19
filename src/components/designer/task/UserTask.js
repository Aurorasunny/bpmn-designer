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
      stroke: "#5F95FF",
      fill: "#EFF4FF",
      strokeWidth: 1,
    },
    img: {
      x: 6,
      y: 6,
      width: 16,
      height: 16,
      "xlink:href":
        "@/assets/img/activity.png",
    },
    label: {
      fontSize: 12,
      fill: "#262626",
    },
  },
};