
import React from 'react';
import { Icon, Row, Col } from 'antd'

const Info = ({}) => (
  <section className="section">
    <p className="font1"><Icon type="book" /> 个人信息</p>
    <div className="blackbac blank"></div>
    <div className="personal-info-container">
      <Row>
        <Col span={12}>
          <span className="bold">姓名：</span>
          <span>谢文奇</span>
        </Col>
        <Col span={12}>
          <span className="bold">性别：</span>
          <span>男</span>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <span className="bold">出生年月：</span>
          <span>1993.6</span>
        </Col>
        <Col span={12}>
          <span className="bold">学历：</span>
          <span>本科</span>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <span className="bold">毕业院校：</span>
          <span>武汉理工大学</span>
        </Col>
        <Col span={12}>
          <span className="bold">专业：</span>
          <span>复合材料与工程</span>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <span className="bold">工作经验：</span>
          <span>一年</span>
        </Col>
        <Col span={12}>
          <span className="bold">英语等级：</span>
          <span>CET-4</span>
        </Col>
      </Row>
    </div>
  </section>
);

export default Info;
