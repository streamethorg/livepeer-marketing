import StudioPageNavbar from '@/components/Layout/StudioPageNavbar'
import SideNavigation from '@/components/Layout/SideNavigation'
import { File, Inbox } from 'lucide-react'
import { studioPageParams } from '@/lib/types'
import { headers } from 'next/headers'

const Layout = ({
  children,
  params,
  searchParams,
}: {
  children: React.ReactNode
  params: studioPageParams['params']
  searchParams: studioPageParams['searchParams']
}) => {
  const links = [
    {
      title: 'Home',
      icon: Inbox,
      variant: 'default',
      href: '/studio/base',
    },
    {
      title: 'Library',
      icon: File,
      variant: 'ghost',
      href: '/studio/base/library',
    },
    {
      title: 'Settings',
      icon: File,
      variant: 'ghost',
      href: '/studio/base/settings',
    },
  ]
  const headersList = headers()
  const pathname = headersList.get('next-url')

  const isEventPath =
    pathname === `/studio/${[params.organization]}/event`
  console.log('isEventPath', isEventPath, pathname)
  return (
    <div className="w-screen h-screen ">
      <StudioPageNavbar organization={params.organization} />
      <div className="top-[74px] flex flex-col h-[calc(100vh-74px)]">
        <div className="flex flex-row h-full">
          {!isEventPath && (
            <SideNavigation
              isCollapsed={false}
              links={links}
              currentPath={pathname}
            />
          )}
          <div className="flex flex-col flex-grow h-full overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
