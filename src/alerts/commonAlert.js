import { notification } from "antd";


const errorMessageParser = (error) => {
    console.log(error)
    const {message, errorObject} = error.data;
    const description = Object.keys(errorObject || {}).length > 0 ?  errorObject : 'There was error while making the request!!';
    return {description, message};
}

export const openErrorNotification = (error, onClose) => {
    const {message, description} = errorMessageParser(error);
    notification.error({
        message:message ==="SequelizeUniqueConstraintError" ? 'Validation Error' : message,
        description,
        onClose: onClose,
    })
} 