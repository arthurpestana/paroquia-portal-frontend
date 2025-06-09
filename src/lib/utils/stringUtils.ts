
export const QueryStringfy = (obj: Record<string, unknown>): string => {
    const params = new URLSearchParams();
    
    Object.entries(obj).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
            value.forEach((item) => params.append(key, String(item)));
        } else {
            params.set(key, String(value));
        }
        }
    });
    
    return params.toString();
}