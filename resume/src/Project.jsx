
import React from 'react';
import { Icon } from 'antd'

const style = {
  fontSize: 14,
}

const Project = ({}) => (
  <section className="section">
    <p className="font1"><Icon type="rocket" /> 项目经验</p>
    <div className="blackbac">
      图像标注系统
    </div>
    <div className="work-container">
      <div>
        <span className="bold">项目描述：</span>
        <p>展示高分辨率图片和瓦片图，并与图片进行各种交互，用于数据采集和展示</p>
      </div>
      <div>
        <span className="bold">使用技术：</span>
      </div>
      <ul>
        <li>技术栈 React + Redux + ES6 + webpack + Ant Design + Babel + Sass，持续跟进新版本</li>
        <li>使用 Openlayers 开源库展示图像，并根据项目需求，研读和修改源码，开发出一套复杂的标记和管理系统</li>
        <li>前后端完全分离，使用 fetch 和 Socket.IO 进行数据交互</li>
        <li>使用 React 进行渲染，使用 Redux 解决多交互、多数据源的问题，追求 React + Redux 的性能优化</li>
        <li>对 Ant Design 进行主题定制，作为 React 组件库</li>
        <li>在 Electron 上开发离线版，为了提高代码复用率，使用 express 处理请求，进行拦截和转发</li>
        <li>使用 webpack 进行打包，使用热模块替换提高开发效率，代码分割和 Dynamic Imports 进行性能优化</li>
      </ul>
    </div>

    <div className="blackbac">
      官网主页
    </div>
    <div className="work-container">
      <div>
        <span className="bold">项目描述：</span>
        <p>用于展示公司信息的官网主页</p>
      </div>
      <div>
        <span className="bold">使用技术：</span>
      </div>
      <ul>
        <li>jQuery + Bootstrap + Sass</li>
        <li>是一个比较简单的页面，主要是高保真还原 UI 的设计稿</li>
        <li>使用 jq 插件完成轮播图和各种动效</li>
        <li>兼容主流浏览器和移动端，手写各种断点和响应式，解决样式问题</li>
      </ul>
    </div>
  </section>
);

export default Project;
