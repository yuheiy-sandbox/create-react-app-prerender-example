import React from 'react'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Foo from '../pages/Foo'
import Bar from '../pages/Bar'
import Baz from '../pages/Baz'

const routes = [
  {
    path: '/',
    action() {
      return <Layout
        description="this is home"
        canonical="/">
        <Home />
      </Layout>
    }
  }, {
    path: '/foo',
    action() {
      return <Layout title="Foo"
        description="this is foo"
        canonical="/foo">
        <Foo />
      </Layout>
    }
  }, {
    path: '/bar',
    action() {
      return <Layout
        title="Bar"
        description="this is bar"
        canonical="/bar">
        <Bar />
      </Layout>
    }
  }, {
    path: '/baz',
    action() {
      return <Layout
        title="Baz"
        description="this is baz"
        canonical="/baz">
        <Baz />
      </Layout>
    }
  }
]

export default routes
