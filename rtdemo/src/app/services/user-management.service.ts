// 

export class UserManagementService {
    private users: Map<string, any> = new Map();

    addUser(socketID: string, user: any) {
        this.users.set(socketID, user);
    }

    removeUser(socketID: string) {
        this.users.delete(socketID);
    }

    getUser(socketID: string) {
        return this.users.get(socketID);
    }

    getAllUsers() {
        return Array.from(this.users.values());
    }

    getUserCount() {
        return this.users.size;
    }
}
