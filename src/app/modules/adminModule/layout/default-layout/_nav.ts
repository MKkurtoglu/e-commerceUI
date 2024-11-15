import { INavData } from "@coreui/angular";


export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    divider: false,
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Ürünler',
    url: '/admin/product',
    iconComponent: { name: 'cil-drop' },
    children: [
      {
        name: 'Ürün Ekle',
        url: '/admin/product/product-add',
        icon: 'nav-icon-bullet'
      },
      
    ]
  },
  {
    name: 'Kategoriler',
    url: '/admin/categories',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-pencil' },
    children: [
      {
        name: 'Kategori Ekle',
        url: '/admin/categories/category-add',
        icon: 'nav-icon-bullet'
      },
    ]
  },
  {
    name: 'Components',
    title: true
  },
  {
    name: 'Markalar',
    url: '/admin/brand/',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Marka Markalar',
        url: '/admin/brand/',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Marka Ekle',
        url: '/admin/brand/brand-add',
        icon: 'nav-icon-bullet'
      },
      
    ]
  },
  {
    name: 'Modeller',
    url: 'admin/model/',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Modeller',
        url: '/admin/model/',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Model Ekle',
        url: '/admin/model/model-add',
        icon: 'nav-icon-bullet'
      }
      
    ]
  },
  
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    title: true,
    name: 'Links',
    class: 'mt-auto'
  },
  {
    name: 'Docs',
    url: 'https://coreui.io/angular/docs/5.x/',
    iconComponent: { name: 'cil-description' },
    attributes: { target: '_blank' }
  }
];
