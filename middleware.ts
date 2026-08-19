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
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

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

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/verify-otp");

  // 1. Token yo'q va yopiq sahifaga kirmoqchi bo'lsa -> landing sahifaga
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. Token mavjud bo'lsa -> Rollar bo'yicha qat'iy ajratish
  if (token) {
    const role = parseJwtRole(token);
    const userRoleConfig = (role && ROLE_CONFIG[role]) || ROLE_CONFIG.STUDENT;

    // A. Foydalanuvchi auth sahifalariga kirmoqchi bo'lsa -> o'z panelining bosh sahifasiga
    if (isAuthPage) {
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp)$).*)",
  ],
};
