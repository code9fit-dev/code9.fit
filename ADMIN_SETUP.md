# Admin Access Setup Guide

## Overview
Admin users have FULL access to the entire site, including all programs (free and paid). This allows admins to:
- View and test all programs without purchase restrictions
- Adjust and verify programs
- Check operational functionality across all features
- Access all site content without tier limitations

## How Admin Access Works

Admin access is managed through the `profiles` table in Supabase:
- When a user is assigned the role `'admin'` in their profile, they get full access
- Admin access takes precedence over all other access checks (Premium, coaching purchases, etc.)
- The system checks for admin status first before checking other tiers

## Setting Up Admin Access

### Option 1: Via Supabase Console (Recommended)

1. **Log into your Supabase project** at https://app.supabase.com
2. **Navigate to SQL Editor** and run this query:

```sql
-- Promote a user to admin by their email
UPDATE profiles 
SET role = 'admin' 
WHERE id = (SELECT id FROM auth.users WHERE email = 'your-email@example.com');
```

Or by user ID:

```sql
-- Promote a user to admin by their user ID
UPDATE profiles 
SET role = 'admin' 
WHERE id = 'user-uuid-here';
```

3. **Verify the change** by running:

```sql
SELECT id, email, role FROM profiles WHERE role = 'admin';
```

### Option 2: Create a New Admin Account

If the user profile doesn't exist yet:

1. **Create auth user** via Supabase Console (Auth → Users → Add user)
2. **Insert profile** with admin role:

```sql
INSERT INTO profiles (id, email, display_name, role)
VALUES ('user-uuid', 'admin@example.com', 'Admin Name', 'admin')
ON CONFLICT DO NOTHING;
```

### Option 3: Programmatically (API)

You can also create an admin promotion API endpoint (secure this with a service key):

```typescript
// POST /api/admin/promote
const response = await supabase
  .from('profiles')
  .update({ role: 'admin' })
  .eq('email', userEmail);
```

## Testing Admin Access

Once promoted to admin:

1. **Log into the site** with your admin account
2. **Navigate to any program page** (free or paid)
3. **Click the program name** to verify you can see all content without "Unlock" prompts
4. **Test the START NOW button** to confirm it routes correctly

## Features Unlocked for Admins

- ✅ View all programs (free and paid) without restrictions
- ✅ No subscription tier requirements
- ✅ Full access to coaching features
- ✅ Can test all checkout flows
- ✅ Can verify program content and structure
- ✅ Can access premium features without purchase

## Removing Admin Access

To remove admin privileges:

```sql
UPDATE profiles 
SET role = 'client'  -- or 'human_coach' if applicable
WHERE id = 'user-uuid';
```

## Important Notes

- Admin access is managed in the `profiles` table (Supabase)
- Changes take effect immediately (no restart needed)
- Always use your Supabase service key when making bulk admin changes
- Keep admin accounts secure - they have unrestricted access
- Consider using a separate admin email for development vs. production

## Troubleshooting

**Admin can't see all programs:**
- Verify the profile role is set to 'admin' (check Supabase)
- Clear browser cache and log out/back in
- Check browser console for any error messages

**Admin changes not taking effect:**
- Refresh the page after updating the profile
- Check the SQL query ran successfully in Supabase
- Verify the correct user ID/email was updated

**Access denied on specific features:**
- Some features may have additional permission checks
- Contact development team if a specific feature doesn't respect admin access
