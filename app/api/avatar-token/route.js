import { NextResponse } from 'next/server';
import { 
    getAvatarToken, 
    validateAndUseToken, 
    createAvatarToken,
    regenerateExpiredTokens 
} from '../../../lib/avatarTokens.js';

/**
 * GET /api/avatar-token?email=xxx
 * Returns the current token status for a user
 */
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ success: false, message: 'Email required' }, { status: 400 });
    }

    try {
        const token = await getAvatarToken(email);
        
        if (!token) {
            return NextResponse.json({ success: false, message: 'No token found' }, { status: 404 });
        }

        // Check if token is expired (24 hours)
        const tokenAge = Date.now() - new Date(token.token_generated_at).getTime();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        const isExpired = tokenAge > twentyFourHours;

        return NextResponse.json({
            success: true,
            data: {
                email: token.email,
                current_token: token.current_token,
                token_used: token.token_used,
                generation_enabled: token.generation_enabled,
                is_expired: isExpired,
                hours_until_expiry: isExpired ? 0 : Math.floor((twentyFourHours - tokenAge) / (60 * 60 * 1000)),
                generated_at: token.token_generated_at
            }
        });

    } catch (error) {
        console.error('Avatar token GET error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

/**
 * POST /api/avatar-token
 * Body: { action: 'validate', email: 'xxx', token: 'xxx' }
 *   or: { action: 'regenerate', email: 'xxx' }
 */
export async function POST(request) {
    try {
        const body = await request.json();
        const { action, email, token } = body;

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email required' }, { status: 400 });
        }

        if (action === 'validate') {
            if (!token) {
                return NextResponse.json({ success: false, message: 'Token required' }, { status: 400 });
            }

            const isValid = await validateAndUseToken(email, token);
            
            return NextResponse.json({
                success: isValid,
                message: isValid ? 'Token validated and consumed' : 'Invalid or expired token'
            });
        }

        if (action === 'regenerate') {
            const newToken = await createAvatarToken(email);
            
            return NextResponse.json({
                success: true,
                message: 'Token regenerated',
                data: {
                    current_token: newToken.current_token,
                    generated_at: newToken.token_generated_at
                }
            });
        }

        return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });

    } catch (error) {
        console.error('Avatar token POST error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
