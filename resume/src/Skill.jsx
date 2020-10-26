
import React from 'react';
import { Icon } from 'antd'

const Skill = ({}) => (
  <section className="section">
    <p className="font1"><Icon type="tool" /> 技能简介</p>
    <div className="blackbac">前端相关</div>
    <p>前端框架：</p>
    <ul>
      <li>熟悉 HTML5 和 CSS3 的特性，如 canvas，svg，Web 存储，flex 布局等</li>
      <li>喜欢使用原生 js 和 ES6 语法，常看阮一峰的《ECMAScript 6 入门》</li>
      <li>使用 Fetch 和 Socket.IO 和后端进行交互，并且注意错误处理</li>
      <li>使用 React + Redux 进行项目搭建，并追求性能优化</li>
      <li>熟悉图形库 Openlayers，看过部分源码，并做过一些修改</li>
    </ul>
    <p>UI 框架：</p>
    <ul>
      <li>主要采用 Ant Design，对其默认主题做了少量修改来适应项目</li>
      <li>页面样式自定义程度高，以 Sass 手写为主，响应式也是手写</li>
      <li>页面 Icon 很多，使用 Iconfont 来管理</li>
    </ul>
    <p>构建工具为 webpack 4，其常用配置可以手写，对其文档很熟悉</p>
    <div className="blackbac">后端相关</div>
    <p className="item">熟悉 Git 各种常用操作，平时喜欢用的 GUI 是 GitKraken</p>
    <p className="item">了解 Electron 主进程和渲染进程的通信，以及调用 node 原生模块</p>
    <p className="item">了解 Node，自己用 express 搭建了一个迷你型的项目后端</p>
    <p className="item">偶尔折腾 Ubuntu，装过 N 次系统，可以在 Ubuntu 上开发，做点图像处理</p>
    <p className="item">了解 Python，可以用 Pytorch 进行简单的图像分类和神经网络的训练</p>

  </section>
);

export default Skill;
