
import React from 'react';
import { hot } from 'react-hot-loader'

import Header from './Header.jsx';
import Skill from './Skill.jsx';
import Info from './Info.jsx';
import MyWork from './MyWork.jsx';
import Project from './Project.jsx';
import Self from './Self.jsx';

import { Icon } from 'antd'

const App = () => {

  return (
    <div>
      <Header />
      <div className="container clearfix">
        <Info />
        <Skill />
        <MyWork />
        <Project />
        <Self />
      </div>
    </div>
  );

}

export default hot(module)(App);
