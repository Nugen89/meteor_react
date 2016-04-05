import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from './layouts/MainLayout.jsx';
import ConversationsWrapper from './components/conversations/ConversationsWrapper.jsx';
import ResolutionsWrapper   from './components/resolutions/ResolutionsWrapper.jsx';
import ResolutionDetail     from './components/resolutions/ResolutionDetail.jsx';

import Home   from './pages/Home.jsx';
import About  from './pages/About.jsx';

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: (<Home />)
    })
  }
});

FlowRouter.route('/about', {
  action() {
    mount(MainLayout, {
      content: (<About />)
    })
  }
});

FlowRouter.route('/videoChat', {
  action() {
    mount(MainLayout, {
      content: (<ConversationsWrapper />)
    })
  }
});

FlowRouter.route('/resolutions/:id', {
  action(params) {
    mount(MainLayout, {
      content: (<ResolutionDetail id={params.id} />)
    })
  }
});