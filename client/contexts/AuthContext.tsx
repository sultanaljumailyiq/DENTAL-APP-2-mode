import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, UserRole, Permission } from "@/types/system";

// ============= Authentication Context =============

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: Permission[];
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  hasPermission: (resource: string, action: string) => boolean;
  hasRole: (role: UserRole) => boolean;
  canAccess: (requiredRole: UserRole) => boolean;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  arabicName: string;
  phone: string;
  role: UserRole;
  companyName?: string; // For suppliers
  businessLicense?: string; // For suppliers
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============= Permission System =============

// Default permissions for each role
const DEFAULT_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.PLATFORM_ADMIN]: [
    // Full system access
    { resource: "*", actions: ["*"] },
  ],

  [UserRole.SUPPLIER]: [
    // Product management
    { resource: "products", actions: ["create", "read", "update", "delete"] },
    {
      resource: "own_products",
      actions: ["create", "read", "update", "delete"],
    },

    // Order management
    { resource: "orders", actions: ["read", "update"] },
    { resource: "own_orders", actions: ["read", "update"] },

    // Analytics (own data only)
    { resource: "analytics", actions: ["read"] },
    { resource: "own_analytics", actions: ["read"] },

    // Profile management
    { resource: "profile", actions: ["read", "update"] },

    // Offers management
    { resource: "offers", actions: ["create", "read", "update", "delete"] },
    { resource: "own_offers", actions: ["create", "read", "update", "delete"] },

    // Inventory management
    { resource: "inventory", actions: ["read", "update"] },
    { resource: "own_inventory", actions: ["read", "update"] },
  ],

  [UserRole.CUSTOMER]: [
    // Basic shopping access
    { resource: "products", actions: ["read"] },
    { resource: "categories", actions: ["read"] },
    { resource: "brands", actions: ["read"] },
    { resource: "suppliers", actions: ["read"] },

    // Order management
    { resource: "orders", actions: ["create", "read"] },
    { resource: "own_orders", actions: ["create", "read"] },

    // Cart and wishlist
    { resource: "cart", actions: ["create", "read", "update", "delete"] },
    { resource: "wishlist", actions: ["create", "read", "update", "delete"] },

    // Profile management
    { resource: "profile", actions: ["read", "update"] },

    // Reviews
    { resource: "reviews", actions: ["create", "read", "update", "delete"] },
    {
      resource: "own_reviews",
      actions: ["create", "read", "update", "delete"],
    },
  ],

  [UserRole.MODERATOR]: [
    // Content moderation
    { resource: "products", actions: ["read", "update"] },
    { resource: "reviews", actions: ["read", "update", "delete"] },
    { resource: "users", actions: ["read", "update"] },
    { resource: "orders", actions: ["read", "update"] },

    // Analytics (limited)
    { resource: "analytics", actions: ["read"] },

    // Profile management
    { resource: "profile", actions: ["read", "update"] },
  ],
};

// ============= Role Hierarchy =============

const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.PLATFORM_ADMIN]: 4,
  [UserRole.MODERATOR]: 3,
  [UserRole.SUPPLIER]: 2,
  [UserRole.CUSTOMER]: 1,
};

// ============= Auth Provider Component =============

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    permissions: [],
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const userData = localStorage.getItem("user_data");

        if (token && userData) {
          const user = JSON.parse(userData) as User;
          const permissions = DEFAULT_PERMISSIONS[user.role] || [];

          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            permissions,
          });
        } else {
          setAuthState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      // Mock authentication - replace with actual API call
      const mockUser: User = {
        id: "user_1",
        email,
        phone: "+964750123456",
        name: "John Smith",
        arabicName: "جون سميث",
        role: email.includes("admin")
          ? UserRole.PLATFORM_ADMIN
          : email.includes("supplier")
            ? UserRole.SUPPLIER
            : UserRole.CUSTOMER,
        status: "active",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        profile: {
          address: {
            governorate: "بغداد",
            city: "الكرخ",
            district: "الجادرية",
            street: "شارع الجامعة",
            buildingNumber: "123",
          },
        },
        permissions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: new Date(),
      };

      const permissions = DEFAULT_PERMISSIONS[mockUser.role] || [];

      // Store auth data
      localStorage.setItem("auth_token", "mock_token_" + Date.now());
      localStorage.setItem("user_data", JSON.stringify(mockUser));

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        permissions,
      });
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");

    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      permissions: [],
    });
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      // Mock registration - replace with actual API call
      const newUser: User = {
        id: "user_" + Date.now(),
        email: userData.email,
        phone: userData.phone,
        name: userData.name,
        arabicName: userData.arabicName,
        role: userData.role,
        status:
          userData.role === UserRole.SUPPLIER
            ? "pending_verification"
            : "active",
        profile: {
          companyName: userData.companyName,
          businessLicense: userData.businessLicense,
        },
        permissions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const permissions = DEFAULT_PERMISSIONS[newUser.role] || [];

      // Store auth data
      localStorage.setItem("auth_token", "mock_token_" + Date.now());
      localStorage.setItem("user_data", JSON.stringify(newUser));

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        permissions,
      });
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    if (!authState.user) return;

    try {
      const updatedUser = {
        ...authState.user,
        ...updates,
        updatedAt: new Date(),
      };

      localStorage.setItem("user_data", JSON.stringify(updatedUser));

      setAuthState((prev) => ({
        ...prev,
        user: updatedUser,
      }));
    } catch (error) {
      throw error;
    }
  };

  const refreshUser = async (): Promise<void> => {
    if (!authState.user) return;

    try {
      // Mock API call to refresh user data
      const userData = localStorage.getItem("user_data");
      if (userData) {
        const user = JSON.parse(userData) as User;
        const permissions = DEFAULT_PERMISSIONS[user.role] || [];

        setAuthState((prev) => ({
          ...prev,
          user,
          permissions,
        }));
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  // Permission checking functions
  const hasPermission = (resource: string, action: string): boolean => {
    if (!authState.isAuthenticated || !authState.user) return false;

    // Platform admin has all permissions
    if (authState.user.role === UserRole.PLATFORM_ADMIN) return true;

    return authState.permissions.some((permission) => {
      const hasResource =
        permission.resource === "*" || permission.resource === resource;
      const hasAction =
        permission.actions.includes("*") || permission.actions.includes(action);
      return hasResource && hasAction;
    });
  };

  const hasRole = (role: UserRole): boolean => {
    return authState.user?.role === role;
  };

  const canAccess = (requiredRole: UserRole): boolean => {
    if (!authState.user) return false;

    const userRoleLevel = ROLE_HIERARCHY[authState.user.role] || 0;
    const requiredRoleLevel = ROLE_HIERARCHY[requiredRole] || 0;

    return userRoleLevel >= requiredRoleLevel;
  };

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    register,
    updateProfile,
    hasPermission,
    hasRole,
    canAccess,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// ============= Custom Hook =============

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// ============= Higher-Order Component for Route Protection =============

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: {
    resource: string;
    action: string;
  };
  fallback?: ReactNode;
}

export function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, canAccess, hasPermission, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              غير مصرح لك بالوصول
            </h2>
            <p className="text-gray-600 mb-6">يرجى تسجيل الدخول للمتابعة</p>
            <button
              onClick={() => (window.location.href = "/auth")}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      )
    );
  }

  if (requiredRole && !canAccess(requiredRole)) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ليس لديك صلاحية للوصول
            </h2>
            <p className="text-gray-600">هذه الصفحة تتطلب صلاحيات أعلى</p>
          </div>
        </div>
      )
    );
  }

  if (
    requiredPermission &&
    !hasPermission(requiredPermission.resource, requiredPermission.action)
  ) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ليس لديك صلاحية للوصول
            </h2>
            <p className="text-gray-600">
              ليس لديك الصلاحية المطلوبة لهذا الإجراء
            </p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}

// ============= Permission Hook =============

export function usePermissions() {
  const { hasPermission, hasRole, canAccess, user } = useAuth();

  const checkProductAccess = (productSupplierId?: string) => {
    if (!user) return false;

    // Platform admin can access all products
    if (user.role === UserRole.PLATFORM_ADMIN) return true;

    // Suppliers can only access their own products
    if (user.role === UserRole.SUPPLIER) {
      return productSupplierId === user.id;
    }

    // Customers can view all active products
    if (user.role === UserRole.CUSTOMER) {
      return hasPermission("products", "read");
    }

    return false;
  };

  const checkOrderAccess = (
    orderCustomerId?: string,
    orderSupplierId?: string,
  ) => {
    if (!user) return false;

    // Platform admin can access all orders
    if (user.role === UserRole.PLATFORM_ADMIN) return true;

    // Customers can access their own orders
    if (user.role === UserRole.CUSTOMER) {
      return orderCustomerId === user.id;
    }

    // Suppliers can access orders for their products
    if (user.role === UserRole.SUPPLIER) {
      return orderSupplierId === user.id;
    }

    return false;
  };

  return {
    hasPermission,
    hasRole,
    canAccess,
    checkProductAccess,
    checkOrderAccess,
  };
}
