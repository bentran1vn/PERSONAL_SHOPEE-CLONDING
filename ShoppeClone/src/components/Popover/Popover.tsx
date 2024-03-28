import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  offset,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, useId, ElementType } from 'react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
}

export default function Popover({ children, className, renderPopover, as: Element = 'div', initialOpen }: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef(null)
  const { x, y, refs, context, strategy, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(5), shift(), arrow({ element: arrowRef })]
  })
  const hover = useHover(context, {
    handleClose: safePolygon()
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  const id = useId()

  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              className='bg-red w-8 h-8'
              ref={refs.setFloating}
              {...getFloatingProps()}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <FloatingArrow
                className='border-x-transparent
              border-t-transparent
              border-b-white-100
              border-[11px]
              absolute
              translate-y-[14%] z-1'
                ref={arrowRef}
                context={context}
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y,
                  transform: 'rotate(360deg) !important'
                }}
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
