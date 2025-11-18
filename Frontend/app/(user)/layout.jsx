import UserSidebar from '../Components/user/Sidebar/UserSidebar';
export const metadata = {
    title: 'User Dashboard',
    description: 'Dashboard layout for user',
};

export default function UserLayout ({children}) {
    return (
        <div style={{ display: "flex" }}>
            <UserSidebar />
            <div style={{ flex: 1, padding: "20px" }}>
                {children}
            </div>
        </div>
    );
}   
