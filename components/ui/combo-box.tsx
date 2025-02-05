import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Image from 'next/image'

interface Item {
  label: string
  value: string
  logo?: string
}

const renderLogo = (logo?: string) => (
  <Image
    className="mr-1"
    src={logo ?? '/logo.png'}
    alt="logo"
    width={20}
    height={20}
  />
)

export default function Combobox({
  placeholder = 'Select item',
  items = [],
  value,
  setValue,
  valueKey = 'value',
  labelKey = 'label',
  logo,
  variant = 'outline',
}: {
  placeholder?: string
  items?: Item[]
  value: string
  valueKey?: string
  labelKey?: string
  logo?: boolean
  variant?: 'outline' | 'primary' | 'ghost'
  setValue: (value: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const orgLogo = items.find(
    (item) => item[labelKey as keyof Item] === value
  )?.logo

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full">
          {logo && renderLogo(orgLogo)}
          {value ? value : placeholder}

          <ChevronsUpDown className="ml-2 w-4 h-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full h-[400px]">
        <Command>
          <CommandInput placeholder="Search item..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={
                  valueKey ? item[valueKey as keyof Item] : item.value
                }
                value={
                  valueKey ? item[valueKey as keyof Item] : item.value
                }
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === item.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {labelKey ? item[labelKey as keyof Item] : item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
