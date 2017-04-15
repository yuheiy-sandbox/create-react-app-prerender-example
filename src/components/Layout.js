import React from 'react'
import {Helmet} from 'react-helmet'
import Link from './Link'

const documentTitle = 'App'

const routes = [
  ['/', 'home'],
  ['/foo', 'foo'],
  ['/bar', 'bar'],
  ['/baz', 'baz'],
]

export default class Layout extends React.Component {
  static defaultProps = {
    description: '',
    canonical: '',
  }

  render() {
    return <div>
      <Helmet
        titleTemplate={`%s - ${documentTitle}`}
        defaultTitle={documentTitle}>
        <title>{this.props.title}</title>
        <meta name="description" content={this.props.description} />
        <link rel="canonical" href={`/create-react-app-prerender-example${this.props.canonical}`} />
      </Helmet>

      <ul>
        {routes.map(([to, name]) =>
          <li key={to}>
            <Link to={to}>{name}</Link>
          </li>
        )}
      </ul>
      {this.props.children}
    </div>
  }
}
