export const fetchFunc = async (option = {
    method: 'GET',
    url: 'note/',
    body: null
}) => {
    return await fetch(import.meta.env.VITE_ROOT_URL + (option.url || 'note/'),
        {
            method: option.method || 'GET',
            body: JSON.stringify(option.body) || null,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}