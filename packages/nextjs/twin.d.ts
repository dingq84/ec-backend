import { ComponentType } from 'react'
import { TwFn, TemplateFn } from 'twin.macro'
import styledImport, { CSSProp, css as cssImport } from 'styled-components'

declare module 'twin.macro' {
  type TwComponentWrapper = <T extends ComponentType<any>>(component: T) => TemplateFn<T>
  const tw: TwFn & TwComponentMap & TwComponentWrapper
  const css: ReturnType<cssImport>
  const styled: typeof styledImport

  export = tw
  export { css, styled }
}

declare module 'react' {
  interface DOMAttributes<T> {
    css?: CSSProp
  }
  // The inline svg css prop
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSProp
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: CSSProp
    }
  }
}

declare module '@fortawesome/react-fontawesome' {
  interface FontAwesomeIconProps {
    css?: CSSProp
  }
}

declare module 'react-datepicker' {
  interface ReactDatePickerProps {
    css?: CSSProp
  }
}
