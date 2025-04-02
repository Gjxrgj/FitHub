export const concatFields = (fields: Array<string>) => {
    return fields.join(',');
};

export const capitalizeFirstLetter = (input: string): string => {
    if (!input) {return '';}
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
};

export const formatEnumLabel = (input: string): string => {
    if (!input) { return ''; }
    return input
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase());
};
