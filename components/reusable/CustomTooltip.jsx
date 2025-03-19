import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const CustomTooltip = ({ children, content, className }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent className={className}>
        {content}
      </TooltipContent>
    </Tooltip>
  )
}

export default CustomTooltip