import App from '../App'

/*
const admin = r => require.ensure([], () => r(require('../components/admin/')), 'admin')
const login = r => require.ensure([], () => r(require('../components/login/')), 'login')

const optimization = r => require.ensure([], () => r(require('../components/admin/optimization/')), 'optimization')
const blacklist = r => require.ensure([], () => r(require('../components/admin/blacklist/')), 'blacklist')
const combination = r => require.ensure([], () => r(require('../components/admin/combination/')), 'combination')
const warning = r => require.ensure([], () => r(require('../components/admin/warning/')), 'warning')
const label = r => require.ensure([], () => r(require('../components/admin/label/')), 'label')
*/

import admin from '../components/admin/'
import login from '../components/login/'

import optimization from '../components/admin/optimization/'
import blacklist from '../components/admin/blacklist/'
import combination from '../components/admin/combination/'
import warning from '../components/admin/warning/'
import label from '../components/admin/label/'

export default [{
    path: '/',
    component: App,
    children: [
        {
            path: '',
            redirect: '/login'
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/admin',
            component: admin,
            name: '',
            children: [
                {
                    path: '',
                    redirect: '/admin/optimization'
                },
                {
                    path: '/admin/optimization',
                    component: optimization
                },
                {
                    path: '/admin/blacklist',
                    component: blacklist
                },
                {
                    path: '/admin/combination',
                    component: combination
                },
                {
                    path: '/admin/warning',
                    component: warning
                },
                {
                    path: '/admin/label',
                    component: label
                }
            ]
        }
    ]
}]
