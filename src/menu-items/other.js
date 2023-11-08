// assets
import { IconBrandChrome, IconHelp, IconUser } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconUser };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'user-manage',
      title: 'Quản lý người dùng',
      type: 'item',
      url: '/user-manage',
      icon: icons.IconUser,
      breadcrumbs: false
    }
  ]
};

export default other;
