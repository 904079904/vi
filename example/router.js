import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './pages/home'
import component from './pages/component'
import notFound from './pages/404'
import develop from './pages/develop'
import componentsList from './docs'

Vue.use(VueRouter)

let pagesRoutes = [
  {
    path: '/',
    name: 'home-page',
    component: home
  },
  {
    path: '/component',
    name: 'component-page',
    component: component,
    children: []
  },
  {
    path: '/develop',
    name: 'develop-page',
    component: develop
  },
  {
    path: '*',
    name: 'not-found',
    component: notFound
  }
]
const componentRoutes = pagesRoutes.find(route => route.name === 'component-page').children = []

const groupNameList = []

// console.log(componentsList)
// const requireRouter = require.context('./docs', true, /\.md$/)

// console.log(requireRouter.keys())
// const componentsList = []
componentsList.forEach(requireName => {
  // 获取文件路径
  const fileName = requireName.match(/(?<=(\/)).*(?=\.md)/)[0]
  // console.log(fileName)
  // 分割文件字符串
  const fileNameList = fileName.split('/')
  // 得到md名
  const mdName = fileNameList[fileNameList.length - 1].split(' ')[0].toLowerCase()
  // 得到文件夹名
  const eName = fileNameList[0]
  // 得到分组名
  const groupName = (fileNameList && fileNameList.length === 3 && fileNameList[1]) || ''

  const route = {
    meta: {
      name: fileNameList[fileNameList.length - 1],
      // 类别名
      pageName: eName,
      // 分组名
      groupName
    },
    path: mdName,
    name: mdName,
    component: (resolve) => require([`./docs/${fileName}.md`], resolve)
  }
  componentRoutes.push(route)

  // 没有添加过则将分组名添加进去
  !groupNameList.includes(groupName) && groupNameList.push(groupName)
})

export const groupList = groupNameList.map(v => ({
  title: v,
  children: componentRoutes.filter(item => item.meta.groupName && item.meta.groupName === v)
}))

export const guideList = componentRoutes.filter(v => v.meta.pageName === 'guide')

// export const prototypeList = []
// export const pluginsList = []

export const prototypeList = componentRoutes.filter(v => v.meta.pageName === 'prototype')

export const pluginsList = componentRoutes.filter(v => v.meta.pageName === 'plugin')


const router = new VueRouter({
  routes: [ ...pagesRoutes ]
})

export default router
