export default function UserMenu() {
    const isAuth = false // Math.random() > 0.5
    if (isAuth) {
        return <>
            <p>Dashboard</p>
            <p>Notes</p>
            <p>Books</p>
        </>
    } else {
        return <></>
    }
}