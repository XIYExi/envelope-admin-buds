import EnvelopeSvgIcon from "../../../../@envelope/core/EnvelopeSvgIcon";

const NotificationIcon = ({ value }) => {
  switch (value) {
    case 'error': {
      return (
        <EnvelopeSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:minus-circle
        </EnvelopeSvgIcon>
      );
    }
    case 'success': {
      return (
        <EnvelopeSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:check-circle
        </EnvelopeSvgIcon>
      );
    }
    case 'warning': {
      return (
        <EnvelopeSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:exclamation-circle
        </EnvelopeSvgIcon>
      );
    }
    case 'info': {
      return (
        <EnvelopeSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:information-circle
        </EnvelopeSvgIcon>
      );
    }
    default: {
      return null;
    }
  }
};

export default NotificationIcon;
