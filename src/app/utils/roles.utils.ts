export class RolesUtils {
  public static getFormattedRole(role: string): string {
    switch (role) {
      case 'client':
        return 'Client';
      case 'employee':
        return 'Employé';
      case 'admin':
        return 'Administrateur';
    }
    return role;
  }
}
