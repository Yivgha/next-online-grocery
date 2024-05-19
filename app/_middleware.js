import { NextResponse } from 'next/server';

export function middleware(req, ev) {
  // Set referrer policy
  return NextResponse.next({
    headers: {
      'Referrer-Policy': 'no-referrer',
    },
  });
}
