<script setup>
import { onMounted, ref } from "vue";
import { Shape } from "@antv/x6";
import Graph from "@/components/designer";
import { register, getTeleport } from "@antv/x6-vue-shape";
import { Dnd } from "@antv/x6-plugin-dnd";
import { Selection } from "@antv/x6-plugin-selection";
import { Clipboard } from "@antv/x6-plugin-clipboard";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Keyboard } from "@antv/x6-plugin-keyboard";
// 任务
// 用户任务
import UserTask from "@/components/designer/task/UserTask.vue";
// 网关
// 排他网关
import Exclusive from "@/components/designer/gateway/Exclusive.vue";
// 并行网关
import Parallel from "@/components/designer/gateway/Parallel.vue";
// 事件
// 开始事件
import StartEvent from "@/components/designer/event/StartEvent.vue";
// 结束事件
import EndEvent from "@/components/designer/event/EndEvent.vue";
// 禁用继承属性
defineOptions({
  inheritAttrs: false,
});
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
};
// 注册用户任务节点
register({
  shape: "UserTask",
  component: UserTask,
  width: 130,
  height: 80,
  ports: { ...ports },
});
// 注册排他网关节点
register({
  shape: "Parallel",
  component: Parallel,
  width: 60,
  height: 60,
  ports: { ...ports },
});
// 注册并行网关节点
register({
  shape: "Exclusive",
  component: Exclusive,
  width: 60,
  height: 60,
  ports: { ...ports },
});
// 注册开始事件节点
register({
  shape: "StartEvent",
  component: StartEvent,
  width: 70,
  height: 70,
  ports: { ...ports },
});
// 注册结束事件节点
register({
  shape: "EndEvent",
  component: EndEvent,
  width: 70,
  height: 70,
  ports: { ...ports },
});
const TeleportContainer = getTeleport();
let graph = null;
let dnd = null;

const container = ref(null);
const selectArea = ref(null);
const userTaskData = {
  nodeName: ref("自定义任务"),
};
// 拖拽增加节点
const addDndNode = (shape, e, nodeData = {}) => {
  let node = graph.createNode({
    shape: shape,
    data: nodeData,
    ports: {
      items: [
        {
          group: "left",
        },
        {
          group: "right",
        },
      ],
    },
  });
  dnd.start(node, e);
};

// 控制连接桩显示或隐藏
const showPorts = (ports, show) => {
  for (let i = 0, len = ports.length; i < len; i += 1) {
    ports[i].style.visibility = show ? "visible" : "hidden";
  }
};

// 初始化画布
const init = () => {
  graph = new Graph({
    container: container.value,
    grid: true,
    autoResize: true,
    panning: {
      enabled: true,
      modifiers: ["space"],
    },
    history: true,
    mousewheel: {
      enabled: true,
      modifiers: ["ctrl"],
    },
    connecting: {
      router: {
        name: "manhattan",
        args: {
          padding: {
            vertical: 30,
            horizontal: 30,
          },
        },
      },
      connector: {
        name: "normal",
        args: {
          radius: 8,
        },
      },
      anchor: "center",
      connectionPoint: "anchor",
      allowBlank: false,
      snap: {
        radius: 20,
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: "#A2B1C3",
              strokeWidth: 2,
              targetMarker: {
                name: "block",
                width: 12,
                height: 8,
              },
            },
          },
          zIndex: 0,
        });
      },
      validateConnection({ targetMagnet }) {
        return !!targetMagnet;
      },
    },
    highlighting: {
      magnetAdsorbed: {
        name: "stroke",
        args: {
          attrs: {
            fill: "#5F95FF",
            stroke: "#5F95FF",
          },
        },
      },
    },
  });
  console.log(graph);
  graph.addNode({
    shape: "UserTask1",
    position: {
      "x": 500,
      "y": 280
    },
    width: 120,
    height: 70,
    label: '用户任务'
  })
};
// 定义插件属性
const definePluginInfo = (graph) => {
  graph
    .use(
      new Selection({
        rubberband: true,
        showNodeSelectionBox: true,
        modifiers: "ctrl",
      })
    )
    .use(new Snapline())
    .use(
      new Keyboard({
        enabled: true,
      })
    )
    .use(new Clipboard());
  dnd = new Dnd({
    target: graph,
    dndContainer: selectArea.value,
  });
  // 连接桩显示或隐藏
  graph.on("node:mouseenter", () => {
    const ports = container.value.querySelectorAll(".x6-port-body");
    showPorts(ports, true);
  });
  graph.on("node:mouseleave", () => {
    const ports = container.value.querySelectorAll(".x6-port-body");
    showPorts(ports, false);
  });
  graph.on("node:click", ({ e, x, y, node, view }) => {
    if (node.shape === "UserTask") {
      node.data.nodeName.value = "你好";
    }
    if (node.shape === "EndEvent") {
      console.log("json data", graph.toJSON());
    }
  });
  // 快捷键绑定
  graph.bindKey(["meta+c", "ctrl+c"], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.copy(cells);
    }
    return false;
  });
  graph.bindKey(["meta+x", "ctrl+x"], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.cut(cells);
    }
    return false;
  });
  graph.bindKey(["meta+v", "ctrl+v"], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 });
      graph.cleanSelection();
      graph.select(cells);
    }
    return false;
  });
  // 全选
  graph.bindKey(["meta+a", "ctrl+a"], () => {
    const nodes = graph.getNodes();
    if (nodes) {
      graph.select(nodes);
    }
  });
  // 删除
  graph.bindKey(["backspace", "delete"], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.removeCells(cells);
    }
  });
};
onMounted(() => {
  init();
  definePluginInfo(graph);
});
</script>
<template>
  <div class="designerSize">
    <div class="selectArea" ref="selectArea">
      <UserTask
        class="selectItem"
        :onmousedown="(event) => addDndNode('UserTask', event, userTaskData)"
      />
      <Exclusive
        class="selectItem"
        :onmousedown="(event) => addDndNode('Exclusive', event)"
      />
      <Parallel
        class="selectItem"
        :onmousedown="(event) => addDndNode('Parallel', event)"
      />
      <StartEvent
        class="selectItem"
        :onmousedown="(event) => addDndNode('StartEvent', event)"
      />
      <EndEvent
        class="selectItem"
        :onmousedown="(event) => addDndNode('EndEvent', event)"
      />
    </div>
    <div ref="container" class="graphArea"></div>
    <TeleportContainer />
  </div>
</template>
<style scoped lang="scss">
.designerSize {
  width: 100%;
  height: 100%;
  .selectArea {
    // height: 500px;
    padding: 10px;
    z-index: 1;
    position: fixed;
    top: 10px;
    left: 10px;
    cursor: move;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #fafcff;
    border-radius: 10px;
    .selectItem {
      margin-bottom: 10px;
    }
  }
}
</style>
