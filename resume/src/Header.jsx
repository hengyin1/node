
import React from 'react';
import { Icon } from 'antd'

const Header = ({}) => (
  <header>
    <div className="inline-flex-box">
      <p><Icon type="phone" /> 15927210831</p>
      <p><Icon type="mail" /> szqq602@163.com</p>
      <p><a href="https://github.com/VinciXie"><Icon type="github" /> github.com/VinciXie</a></p>
    </div>
    <div className="right">
      <h1>谢文奇</h1>
      <h2>前端工程师</h2>
    </div>
  </header>
);

export default Header;
