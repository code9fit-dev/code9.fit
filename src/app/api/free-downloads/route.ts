import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface FreeDownloadRequest {
  email: string;
  packageId: 'bundle-3x4' | 'bundle-4x4' | 'session-tracker';
}

export async function POST(request: NextRequest) {
  try {
    const body: FreeDownloadRequest = await request.json();
    const { email, packageId } = body;

    if (!email || !packageId) {
      return NextResponse.json(
        { error: 'Email and packageId are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();

    // Store email for follow-up promotions
    const { error: dbError } = await supabase
      .from('free_download_signups')
      .insert({
        email,
        package_id: packageId,
        created_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save email' },
        { status: 500 }
      );
    }

    // Determine download links based on package
    let downloadLinks: Record<string, string> = {};
    let subject = '';
    let packageName = '';

    if (packageId === 'bundle-3x4') {
      downloadLinks = {
        '3x4 Program Pack': `${process.env.NEXT_PUBLIC_URL}/C9F_3x4_Program_Pack.pdf`,
        'Check-in Template (3x)': `${process.env.NEXT_PUBLIC_URL}/C9F_Checkin_x3.pdf`,
      };
      subject = 'Your Free 3-Day Training Program Pack';
      packageName = 'Your 3-Day Training Program Pack';
    } else if (packageId === 'bundle-4x4') {
      downloadLinks = {
        '4x4 Program Pack': `${process.env.NEXT_PUBLIC_URL}/C9F_4x4_Program_Pack_4Day.pdf`,
        'Check-in Template (4x)': `${process.env.NEXT_PUBLIC_URL}/C9F_Checkin_x4.pdf`,
      };
      subject = 'Your Free 4-Day Training Program Pack';
      packageName = 'Your 4-Day Training Program Pack';
    } else if (packageId === 'session-tracker') {
      downloadLinks = {
        'Session Tracker': `${process.env.NEXT_PUBLIC_URL}/C9F_Session_Tracker.pdf`,
      };
      subject = 'Your Free Session Tracker Template';
      packageName = 'Your Session Tracker Template';
    }

    // Send email via Resend
    const downloadLinksHtml = Object.entries(downloadLinks)
      .map(
        ([name, url]) =>
          `<p><a href="${url}" style="color: #C87137; text-decoration: none; font-weight: 600;">${name}</a></p>`
      )
      .join('');

    const emailResult = await resend.emails.send({
      from: 'CODE9 Fitness <downloads@code9fitness.com>',
      to: email,
      subject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #000; margin-bottom: 16px;">Welcome to CODE9 Fitness! 🏋️</h2>

          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for signing up! Here are your free downloads:
          </p>

          <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #000; margin-top: 0;">${packageName}</h3>
            ${downloadLinksHtml}
          </div>

          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            These templates and guides are designed to help you track your progress and stay accountable. Use them consistently for best results.
          </p>

          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Want more? Check out our full program library and personalized coaching options at <a href="${process.env.NEXT_PUBLIC_URL}" style="color: #C87137; text-decoration: none;">CODE9 Fitness</a>.
          </p>

          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 20px; color: #999; font-size: 12px;">
            <p>CODE9 Fitness | Get Stronger, Smarter</p>
          </div>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Check your email for download links!',
        emailId: emailResult.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Free downloads API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
