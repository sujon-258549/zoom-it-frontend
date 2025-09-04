import { userCurrentUser } from "@/redux/fetures/auth/authSlice";
import { useAppSelector } from "@/redux/fetures/hooks";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles?: string[]; // multiple roles allowed
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const user = useAppSelector(userCurrentUser) as any
    const role = user?.userInfo?.role

    // Not logged in → redirect
    if (!role) {
        return <Navigate to="/login" replace />;
    }

    // If route requires roles but user doesn’t match
    if (allowedRoles && !allowedRoles.includes(role || "")) {
        return <Navigate to="/login" replace />;
    }

return allowedRoles
};

export default ProtectedRoute;
