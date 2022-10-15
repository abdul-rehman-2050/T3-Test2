// components/layout.js

import TopNav from '../TopNav'
import Footer from '../Footer'

type DashboardLayoutProps = {
    children: React.ReactNode,
  };
  

export default function Layout({ children }:DashboardLayoutProps ){
  return (
    <>
      <TopNav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
