export const formatBase64Image = (dataUrl: string): string => {
    const PREFIX_TO_REPLACE = 'dataimage/jpegbase64';
    const CORRECT_PREFIX = 'data:image/jpeg;base64,';

    if (dataUrl.includes(PREFIX_TO_REPLACE)) {
        let uri = dataUrl.replace(PREFIX_TO_REPLACE, '');
        if(!uri.includes(CORRECT_PREFIX)){
            uri = CORRECT_PREFIX + uri;
        }
        return uri;
    }
    return dataUrl;
};
