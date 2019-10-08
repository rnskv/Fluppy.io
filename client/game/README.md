# ReactBoilerplate2019
Minimal code base for start development web-application used react/mobx stack.

# What use?
<ul>
  <li>React-router</li>
  <li>MobX</li>
</ul>

# How use?

Start development server: <br/>
<code>
  npm run devserver
</code>

Build production bundle: <br/>
<code>
  npm run build:prod
</code>

Build development bundle: <br/>
<code>
  npm run build:dev
</code>

For creation new routes use routes configurations from /src/configuration folder: <br/>
<code>
  export default {
      '/': { component: Home, exact: true },
      '/mypage': { component: MyPage },
  }
</code>
