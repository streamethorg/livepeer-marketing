'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
const AddOrganizationButton = ({
  organization,
}: {
  organization: string
}) => {
  return (
    <Button>
      <Link href={`/admin/${organization}/create`}>
        Create a new Event
      </Link>
    </Button>
  )
}

export default AddOrganizationButton
