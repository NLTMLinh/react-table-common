import './ResizebleTitle.scss';
import React from 'react';
import { Resizable } from 'react-resizable';

const handle = (resizeHandle) => (
  <span
    className={`react-resizable-handle react-resizable-handle-${resizeHandle}`}
    onClick={e => {
      e.stopPropagation();
    }}
  />
)

const ResizeableTitleCommon = props => {
  const { onResize, width, ...restProps } = props;
  
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={handle}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export default ResizeableTitleCommon