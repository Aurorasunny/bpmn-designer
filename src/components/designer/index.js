import { UserTask } from "./task/UserTask";
import { Exclusive } from "./gateway/Exclusive";
import { Parallel } from "./gateway/Parallel";
import { StartEvent } from "./event/StartEvent";
import { EndEvent } from "./event/EndEvent";

import { Graph } from "@antv/x6";
// 节点连接桩定义
const ports = {
  groups: {
    right: {
      position: "right",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
    left: {
      position: "left",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
  },
  items: [
    {
      group: "left",
    },
    {
      group: "right",
    },
  ],
};

// 注册节点
// 开始事件
Graph.registerNode("StartEvent", { ...StartEvent, ports }, true);
// 结束事件
Graph.registerNode("EndEvent", { ...EndEvent, ports }, true);
// 用户任务
Graph.registerNode("UserTask", { ...UserTask, ports }, true);
// 排他网关
Graph.registerNode("Exclusive", { ...Exclusive, ports }, true);
// 并行网关
Graph.registerNode("Parallel", { ...Parallel, ports }, true);

export default Graph;
