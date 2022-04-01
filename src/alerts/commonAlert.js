import { notification } from "antd";


const errorMessageParser = (error) => {
    console.log('error', error);
    const {message, errorObject} = error.data;
    const description = Object.keys(errorObject).length > 0 ?  JSON.stringify(errorObject) : 'There was error while making the request!!';
    return {description, message};
}

export const openErrorNotification = (error, onClose) => {
    const {message, description} = errorMessageParser(error);
    notification.open({
        message,
        description,
        onClose: onClose,
    })
} 