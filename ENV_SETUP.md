# Environment Variables Setup Guide

## Required for Image Uploads

You need to configure Cloudinary for image uploads to work:

### 1. Create Cloudinary Account
1. Go to https://cloudinary.com and sign up
2. Navigate to Dashboard → Settings → API Keys
3. Copy your credentials

### 2. Create .env.local file
Create a file named `.env.local` in your project root with:

```env
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret_here"
DATABASE_URL="your_database_url"
```

### 3. Vercel Deployment
Add the same environment variables in your Vercel dashboard:
1. Go to your project settings
2. Add Environment Variables
3. Redeploy your application

### 4. Test Upload
After setting up the variables:
1. Try uploading a product image
2. Check browser console for success messages
3. Images should now persist after page refresh

## Error Troubleshooting

If you see "Image upload service not configured":
- Check that all three Cloudinary variables are set
- Verify the values are correct
- Restart your development server
- Redeploy on Vercel after adding variables
