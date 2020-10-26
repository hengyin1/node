
import React from 'react';
import { Icon } from 'antd'

const style = {
  fontSize: 14,
}

const MyWork = ({}) => (
  <section className="section">
    <p className="font1"><Icon type="calendar" /> 工作经验</p>
    <div className="blackbac">
      <a  href="http://box.histogram.cn/">微瞰智能科技有限公司</a>
      <span style={style}>（2017.3 至今）</span>
    </div>
    <div className="work-container">
      <div>
        <span className="bold">工作描述：</span>
        <p>主要负责图像标注系统的开发和维护，完成各种需求</p>
      </div>
      <div>
        <span className="bold">主要工作内容：</span>
      </div>
      <ul>
        <li>根据 UI 的设计图，高保真还原界面样式，并实现复杂的交互功能</li>
        <li>制作业务需求完成各种展示性和功能性组件</li>
        <li>开发 Electron 各平台离线版</li>
      </ul>
    </div>
  </section>
);

export default MyWork;
