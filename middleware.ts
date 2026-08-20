import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function parseJwtRole(token: string): string | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    const parsed = JSON.parse(jsonPayload);
    
    // Token yaroqlilik muddatini tekshirish (exp sekundlarda beriladi)
    if (parsed.exp && parsed.exp * 1000 < Date.now()) {
      return null;
    }
    
    return parsed?.role || parsed?.data?.role || null;
  } catch (error) {
    return null;
  }
}

// Rollarga mos asosiy boshlang'ich va ruxsat etilgan route prefikslari
const ROLE_CONFIG: Record<string, { home: string; allowedPrefix: string }> = {
  SUPERADMIN: { home: "/dashboard", allowedPrefix: "/dashboard" },
  ADMIN: { home: "/dashboard", allowedPrefix: "/dashboard" },
  MENTOR: { home: "/mentors", allowedPrefix: "/mentors" },
  ASSISTANT: { home: "/assistents", allowedPrefix: "/assistents" },
  STUDENT: { home: "/students", allowedPrefix: "/students" },
};

// Barcha rollarga tegishli maxsus panellar ro'yxati
const PROTECTED_PANEL_PREFIXES = [
  "/dashboard",
  "/mentors",
  "/assistents",
  "/students",
];

export function middleware(request: NextRequest) {
  let token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  let role = null;
  if (token) {
    role = parseJwtRole(token);
    if (!role) {
      token = undefined; // Token yaroqsiz yoki muddati o'tgan
    }
  }

  const publicPaths = [
    "/",
    "/about",
    "/contact",
    "/courses",
    "/login",
    "/register",
    "/verify-otp",
  ];

  const isPublicPath =
    pathname === "/" ||
    publicPaths.some((path) => path !== "/" && pathname.startsWith(path));

  if (!isPublicPath && !token) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    if (request.cookies.has("accessToken")) {
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
    }
    return response;
  }

  // 2. Token mavjud bo'lsa -> Rollar bo'yicha qat'iy ajratish
  if (token && role) {
    const userRoleConfig = ROLE_CONFIG[role] || ROLE_CONFIG.STUDENT;

    // A. Foydalanuvchi public (landing yoki auth) sahifalarga kirmoqchi bo'lsa -> o'z panelining bosh sahifasiga yo'naltirish
    if (isPublicPath) {
      return NextResponse.redirect(new URL(userRoleConfig.home, request.url));
    }

    // B. Foydalanuvchi himoyalangan panellardan biriga kirayotganini tekshirish
    const isAccessingAnyPanel = PROTECTED_PANEL_PREFIXES.some((prefix) =>
      pathname.startsWith(prefix),
    );

    if (isAccessingAnyPanel) {
      // Agar kirayotgan sahifasi o'zining roliga tegishli bo'lmasa -> o'z uyiga qaytarish
      if (!pathname.startsWith(userRoleConfig.allowedPrefix)) {
        return NextResponse.redirect(new URL(userRoleConfig.home, request.url));
      }
    }
  }

  const response = NextResponse.next();
  
  // Agar token cookie'da bo'lsa, lekin yaroqsiz/muddati o'tgan deb topilsa o'chirib yuborish
  if (request.cookies.get("accessToken") && !token) {
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp)$).*)",
  ],
};
