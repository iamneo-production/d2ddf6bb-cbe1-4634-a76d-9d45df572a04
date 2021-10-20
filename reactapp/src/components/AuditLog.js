import Datatable from "./Datatable";


function AuditLog({ user }) {
    if (!user) {
        return <div></div>
    }
    
    return (
        <div>
            <h3>{user.username}'s Audit Logs</h3>
            <Datatable type="logs" userId={user.id} />
        </div>
    )
}

export default AuditLog;