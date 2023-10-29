import { forwardRef } from 'react'

const WithForwardRef = forwardRef((props, ref) => {
  const { Elem, className } = props;

  return (
    <Elem
      className={className}
      id={props.id}
      ref={ref}
    >
      {props.children}
    </Elem>
  )
});

export default WithForwardRef;
