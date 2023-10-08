import classNames from "classnames";

function EnvelopePageSimpleHeader(props) {
  return (
    <div className={classNames('FusePageSimple-header', props.className)}>
      <div className="container">{props.header && props.header}</div>
    </div>
  );
}

export default EnvelopePageSimpleHeader;
