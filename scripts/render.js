import path from 'path'
import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom/server'
import {Helmet} from 'react-helmet'
import UniversalRouter from 'universal-router'
import cheerio from 'cheerio'
import router from '../src/router'
import App from '../src/components/App'

const originalHtml = fs.readFileSync('build/index.html', 'utf8')

;[
  '/',
  '/foo',
  '/bar',
  '/baz',
].forEach(async (pathname) => {
  const $ = cheerio.load(originalHtml)
  const component = await router.resolve({
    path: pathname,
  })
  $('#root').html(ReactDOM.renderToString(<App>{component}</App>))
  const helmet = Helmet.renderStatic()
  $('title').replaceWith(helmet.title.toString())
  $('head').append(helmet.meta.toString())
  $('head').append(helmet.link.toString())

  let filePath = pathname
  if (filePath.endsWith('/')) filePath += 'index'
  if (!path.extname(filePath)) filePath += '.html'
  filePath = path.join(__dirname, '../build', filePath)
  fs.writeFileSync(filePath, $.html())
})
