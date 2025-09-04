import { useAllUserQuery } from "@/redux/fetures/auth/authApi";
import LoadingPage from "../common/loding/LoadingPage";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    MoreHorizontal,
    Search,
    Shield,
    UserX,
    UserCheck,
    Mail,
    Phone,
    Calendar,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface User {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    isBlocked: boolean;
    profileImage: string;
    createdAt: string;
}

const AllUser = () => {
    const { data: allUser, isLoading } = useAllUserQuery('');
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    if (isLoading) {
        return <LoadingPage />;
    }

    const users: User[] = allUser;

    // Filter users based on search term and filters
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "blocked" && user.isBlocked) ||
            (statusFilter === "active" && !user.isBlocked);

        return matchesSearch && matchesRole && matchesStatus;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleBlockUser = (userId: string) => {
        console.log("Block user:", userId);
        // Implement block user functionality
    };

    const handleUnblockUser = (userId: string) => {
        console.log("Unblock user:", userId);
        // Implement unblock user functionality
    };

    const handleMakeAdmin = (userId: string) => {
        console.log("Make admin:", userId);
        // Implement make admin functionality
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-sm text-gray-600">
                    Total Users: <span className="font-semibold">{filteredUsers.length}</span>
                </p>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search users by name, email, or phone..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="blocked">Blocked</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Users Table */}
            <div className="border rounded-lg bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.profileImage}
                                                alt={user.name}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                            <div className="font-medium">{user.name}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm">{user.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Phone className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm">{user.phoneNumber}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.role === "admin" ? "default" : "secondary"}
                                            className={user.role === "admin" ? "bg-purple-100 text-purple-800" : ""}
                                        >
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.isBlocked ? "destructive" : "default"}
                                            className={!user.isBlocked ? "bg-green-100 text-green-800" : ""}
                                        >
                                            {user.isBlocked ? "Blocked" : "Active"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm">{formatDate(user.createdAt)}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {user.isBlocked ? (
                                                    <DropdownMenuItem onClick={() => handleUnblockUser(user._id)}>
                                                        <UserCheck className="h-4 w-4 mr-2" />
                                                        Unblock User
                                                    </DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem onClick={() => handleBlockUser(user._id)}>
                                                        <UserX className="h-4 w-4 mr-2" />
                                                        Block User
                                                    </DropdownMenuItem>
                                                )}
                                                {user.role !== "admin" && (
                                                    <DropdownMenuItem onClick={() => handleMakeAdmin(user._id)}>
                                                        <Shield className="h-4 w-4 mr-2" />
                                                        Make Admin
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem >

                                                    <a href={`mailto:${user.email}`} className="flex items-center">
                                                        <Mail className="h-4 w-4 mr-2" />
                                                        Send Email
                                                    </a>
                                                </DropdownMenuItem>


                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AllUser;