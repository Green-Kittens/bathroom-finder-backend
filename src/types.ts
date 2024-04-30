// Example user type, adjust according to your actual user object
export interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

// If impersonator has the same structure as a user, you can reuse the User type.
// If it has a different structure, define it separately.
export type Impersonator = User;
