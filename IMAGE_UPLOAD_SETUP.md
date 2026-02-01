# Image Upload Setup Guide

## Option 1: Cloudinary (Recommended for Production)

1. Create a Cloudinary account at https://cloudinary.com
2. Get your credentials from the Cloudinary dashboard
3. Create a `.env.local` file in your project root:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Other required environment variables
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
DATABASE_URL="your_database_url"
NEXTAUTH_SECRET="your_nextauth_secret"
```

## Option 2: Local File Storage (Automatic Fallback)

If Cloudinary is not configured, images will be automatically saved to:
- `public/uploads/product_images/` for product images
- `public/uploads/profile_images/` for profile images

## Troubleshooting

### Images disappear on refresh:
- Check browser console for upload errors
- Verify environment variables are set
- Ensure uploads directory exists and has write permissions

### Upload errors:
- Check file size (max 8MB)
- Verify file type (JPEG, PNG, GIF, WebP only)
- Check network connection

### Local storage issues:
- Make sure `public/uploads/` directory exists
- Check file system permissions
- Verify NEXT_PUBLIC_BASE_URL is set correctly

## Testing

1. Try uploading a small image (under 1MB)
2. Check browser console for success/error messages
3. Verify image appears in both profile and product pages
