'use server'

import HomePageNavbar from '@/components/Layout/HomePageNavbar'
import Footer from '@/components/Layout/Footer'
import { fetchOrganization } from '@/lib/services/organizationService'
import NotFound from '@/not-found'

const Layout = async ({
  params,
  children,
}: {
  params: { organization: string }
  children: React.ReactNode
}) => {
  const org = process.env.NEXT_ORGANIZATION
  const pages = [
    {
      name: 'Home',
      href: `/${org}`,
      bgColor: 'bg-muted',
    },
    {
      name: 'Videos',
      href: `/${org}/videos`,
      bgColor: 'bg-muted',
    },
  ]

  const organization = await fetchOrganization({
    organizationSlug: process.env.NEXT_ORGANIZATION,
  })

  if (!organization) {
    return NotFound()
  }

  return (
    <div className="flex flex-col mx-auto w-full bg-white min-h-[100vh]">
      <HomePageNavbar
        logo={organization?.logo}
        currentOrganization={process.env.NEXT_ORGANIZATION}
        pages={pages}
        showSearchBar
      />
      <div className="flex-grow w-full h-full">{children}</div>
    </div>
  )
}

export default Layout
