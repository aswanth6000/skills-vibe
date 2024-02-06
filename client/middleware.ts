import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
export function authenticationMiddleware(request: NextRequest) {
    if (!localStorage.getItem("token")) {
      // Redirect to the login page
      return NextResponse.redirect('/login');
    }
    return NextResponse.next();
  }