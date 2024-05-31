'use client'
import React, { useState, Suspense, useLayoutEffect } from 'react'
import Image from 'next/image'
import SearchBar from '@/components/misc/SearchBar'
import Link from 'next/link'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { Menu, X } from 'lucide-react'
import Navbar from './Navbar'
import { ConnectWalletButton } from '../misc/ConnectWalletButton'
import { Search } from 'lucide-react'
import { Page } from '@/lib/types'
import { useSIWE } from 'connectkit'
import useUserData from '@/lib/hooks/useUserData'
import { IExtendedOrganization } from '@/lib/types'
import { cn } from '@/lib/utils/utils'
import { Button } from '@/components/ui/button'

const getPages = (
  pages: Page[],
  isSignedIn: boolean,
  studioOrg?: string
) => {
  if (isSignedIn) {
    return [
      ...pages,
      // {
      //   name: 'studio',
      //   href: studioOrg ? `/studio/${studioOrg}` : '/studio',
      //   bgColor: 'bg-primary text-primary-foreground',
      // },
    ]
  } else return pages
}

const HomePageNavbar = ({
  logo,
  pages,
  showLogo = true,
  showSearchBar = true,
  organizations,
  currentOrganization,
}: {
  logo?: string
  pages: Page[]
  showLogo?: boolean
  showSearchBar?: boolean
  organizations?: IExtendedOrganization[]
  currentOrganization?: string
}) => {
  if (logo === '') {
    logo = undefined
  }

  return (
    <Suspense fallback={null}>
      <MobileNavBar
        logo={logo}
        pages={pages}
        showSearchBar={showSearchBar}
        organizations={organizations}
        currentOrganization={currentOrganization || ''}
      />
      <PCNavBar
        showLogo={showLogo}
        logo={logo}
        pages={pages}
        showSearchBar={showSearchBar}
        organizations={organizations}
        currentOrganization={currentOrganization || ''}
      />
    </Suspense>
  )
}

const MobileNavBar = ({
  logo,
  pages,
  showSearchBar,
  organizations,
  currentOrganization,
}: {
  logo?: string
  pages: Page[]
  showSearchBar: boolean
  organizations?: IExtendedOrganization[]
  currentOrganization: string
}) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const toggleSearch = () => setSearchVisible(!searchVisible)
  const toggleMenu = () => setMenuVisible(!menuVisible)
  const { isSignedIn } = useSIWE()
  const { userData } = useUserData()

  useLayoutEffect(() => {
    if (menuVisible || searchVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [menuVisible, searchVisible])

  return (
    <NavigationMenu className="flex sticky top-0 flex-row items-center bg-white lg:hidden z-50">
      {(searchVisible || menuVisible) && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 h-[100vh] w-[100vw]" />
      )}

      {searchVisible && showSearchBar && (
        <div className="absolute w-full bottom-[-56px] bg-secondary">
          <SearchBar
            organizationSlug={currentOrganization}
            isMobile={true}
          />
        </div>
      )}
      <div
        className={cn(
          'flex relative flex-row  items-center px-4 py-2 w-full h-full',
          menuVisible && 'bg-background',
          searchVisible && showSearchBar && 'bg-background'
        )}>
        {showSearchBar && (
          <Link href={`/${currentOrganization}`}>
            <svg
              width="144"
              height="auto"
              viewBox="0 0 903 112"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.59049e-07 19.7065L0 0H19.7065L19.7065 19.7065H8.59049e-07Z"
                fill="#181818"></path>
              <path
                d="M36.167 42.6588L36.167 22.9523H55.8735L55.8735 42.6588H36.167Z"
                fill="#181818"></path>
              <path
                d="M72.3341 65.6111L72.3341 45.9046H92.0406L92.0406 65.6111H72.3341Z"
                fill="#181818"></path>
              <path
                d="M36.167 88.5634L36.167 68.8569H55.8735L55.8735 88.5634H36.167Z"
                fill="#181818"></path>
              <path
                d="M8.59049e-07 111.516L0 91.8092H19.7065L19.7065 111.516H8.59049e-07Z"
                fill="#181818"></path>
              <path
                d="M8.59049e-07 65.6111L0 45.9046H19.7065L19.7065 65.6111H8.59049e-07Z"
                fill="#181818"></path>
              <path
                d="M151.161 111.513V0H172.803V92.3829H236.241V111.513H151.161Z"
                fill="#181818"></path>
              <path
                d="M249.104 111.513V0H270.746V111.513H249.104Z"
                fill="#181818"></path>
              <path
                d="M370.806 0H394.565L352.457 111.513H324.384L281.335 0H305.565L338.891 88.9613L370.806 0Z"
                fill="#181818"></path>
              <path
                d="M405.625 111.513V65.5443H427.267V45.9509H405.625V0H490.704V19.1298H427.267V45.9509H481.059V65.5443H427.267V92.3829H492.351V111.513H405.625Z"
                fill="#181818"></path>
              <path
                d="M508.586 111.513V0H559.163C581.04 0 595.312 11.0088 595.312 32.9847C595.312 52.5083 581.04 65.6612 559.163 65.6612H530.228V111.513H508.586ZM530.228 45.8359H556.732C567.71 45.8359 573.591 40.5685 573.591 32.7529C573.591 24.3396 567.71 19.1298 556.732 19.1298H530.228V45.8359Z"
                fill="#181818"></path>
              <path
                d="M610.135 111.513V65.5443H631.778V45.9509H610.135V0H695.215V19.1298H631.778V45.9509H685.57V65.5443H631.778V92.3829H696.861V111.513H610.135Z"
                fill="#181818"></path>
              <path
                d="M713.096 111.513V65.5443H734.739V45.9509H713.096V0H798.176V19.1298H734.739V45.9509H788.531V65.5443H734.739V92.3829H799.822V111.513H713.096Z"
                fill="#181818"></path>
              <path
                d="M816.057 111.513V0H868.281C888.069 0.00405063 902.783 9.61736 902.783 27.7775C902.783 41.6115 896.51 50.025 883.65 54.7686C895.334 54.7686 901.137 60.0565 901.137 70.5545V111.513H879.494V75.9202C879.494 67.9106 877.142 65.5777 869.065 65.5777H837.7V111.513H816.057ZM837.7 45.9093H861.851C874.476 45.9093 881.063 41.7277 881.063 32.5944C881.063 23.4611 874.711 19.1298 861.851 19.1298H837.7V45.9093Z"
                fill="#181818"></path>
            </svg>
          </Link>
        )}

        <div className="flex items-center ml-auto">
          {showSearchBar && (
            <button onClick={toggleSearch} className="p-2">
              {searchVisible ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Search className="w-6 h-6 text-primary" />
              )}
            </button>
          )}
          {pages.length > 0 && (
            <button onClick={toggleMenu} className="z-50">
              {!menuVisible ? (
                <Menu size={30} strokeWidth={2} className="" />
              ) : (
                <X size={30} strokeWidth={2} className="" />
              )}
            </button>
          )}
        </div>
        {menuVisible && (
          <Navbar
            organization={currentOrganization}
            pages={getPages(
              pages,
              isSignedIn,
              userData?.organizations?.[0]?.slug
            )}
          />
        )}
      </div>
    </NavigationMenu>
  )
}

const PCNavBar = ({
  logo,
  pages,
  showSearchBar,
  showLogo,
  organizations,
  currentOrganization,
}: {
  logo?: string
  pages: Page[]
  showLogo: boolean
  showSearchBar: boolean
  organizations?: IExtendedOrganization[]
  currentOrganization: string
}) => {
  const { isSignedIn } = useSIWE()
  const { userData } = useUserData()
  return (
    <NavigationMenu className="hidden sticky top-0 flex-row justify-between items-center p-2 px-4 w-full bg-white shadow-sm md:hidden lg:flex">
      <div className="flex flex-1 justify-start items-center">
        {showLogo && (
          <Link href={`/${currentOrganization}`}>
            <svg
              width="144"
              height="auto"
              viewBox="0 0 903 112"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.59049e-07 19.7065L0 0H19.7065L19.7065 19.7065H8.59049e-07Z"
                fill="#181818"></path>
              <path
                d="M36.167 42.6588L36.167 22.9523H55.8735L55.8735 42.6588H36.167Z"
                fill="#181818"></path>
              <path
                d="M72.3341 65.6111L72.3341 45.9046H92.0406L92.0406 65.6111H72.3341Z"
                fill="#181818"></path>
              <path
                d="M36.167 88.5634L36.167 68.8569H55.8735L55.8735 88.5634H36.167Z"
                fill="#181818"></path>
              <path
                d="M8.59049e-07 111.516L0 91.8092H19.7065L19.7065 111.516H8.59049e-07Z"
                fill="#181818"></path>
              <path
                d="M8.59049e-07 65.6111L0 45.9046H19.7065L19.7065 65.6111H8.59049e-07Z"
                fill="#181818"></path>
              <path
                d="M151.161 111.513V0H172.803V92.3829H236.241V111.513H151.161Z"
                fill="#181818"></path>
              <path
                d="M249.104 111.513V0H270.746V111.513H249.104Z"
                fill="#181818"></path>
              <path
                d="M370.806 0H394.565L352.457 111.513H324.384L281.335 0H305.565L338.891 88.9613L370.806 0Z"
                fill="#181818"></path>
              <path
                d="M405.625 111.513V65.5443H427.267V45.9509H405.625V0H490.704V19.1298H427.267V45.9509H481.059V65.5443H427.267V92.3829H492.351V111.513H405.625Z"
                fill="#181818"></path>
              <path
                d="M508.586 111.513V0H559.163C581.04 0 595.312 11.0088 595.312 32.9847C595.312 52.5083 581.04 65.6612 559.163 65.6612H530.228V111.513H508.586ZM530.228 45.8359H556.732C567.71 45.8359 573.591 40.5685 573.591 32.7529C573.591 24.3396 567.71 19.1298 556.732 19.1298H530.228V45.8359Z"
                fill="#181818"></path>
              <path
                d="M610.135 111.513V65.5443H631.778V45.9509H610.135V0H695.215V19.1298H631.778V45.9509H685.57V65.5443H631.778V92.3829H696.861V111.513H610.135Z"
                fill="#181818"></path>
              <path
                d="M713.096 111.513V65.5443H734.739V45.9509H713.096V0H798.176V19.1298H734.739V45.9509H788.531V65.5443H734.739V92.3829H799.822V111.513H713.096Z"
                fill="#181818"></path>
              <path
                d="M816.057 111.513V0H868.281C888.069 0.00405063 902.783 9.61736 902.783 27.7775C902.783 41.6115 896.51 50.025 883.65 54.7686C895.334 54.7686 901.137 60.0565 901.137 70.5545V111.513H879.494V75.9202C879.494 67.9106 877.142 65.5777 869.065 65.5777H837.7V111.513H816.057ZM837.7 45.9093H861.851C874.476 45.9093 881.063 41.7277 881.063 32.5944C881.063 23.4611 874.711 19.1298 861.851 19.1298H837.7V45.9093Z"
                fill="#181818"></path>
            </svg>
          </Link>
        )}
        {organizations && (
          <Link href={`/${currentOrganization}`}>
            <Button className="hidden lg:block" variant={'primary'}>
              View channel page
            </Button>
          </Link>
        )}
      </div>
      <div className="flex flex-grow-0 justify-center items-center mx-auto w-2/5">
        {showSearchBar && (
          <SearchBar
            searchVisible={showSearchBar}
            organizationSlug={currentOrganization}
          />
        )}
      </div>
      <div className="flex flex-1 justify-end items-center">
        <Navbar
          organization={currentOrganization}
          pages={getPages(
            pages,
            isSignedIn,
            userData?.organizations?.[0]?.slug
          )}
        />
      </div>
    </NavigationMenu>
  )
}

export default HomePageNavbar
