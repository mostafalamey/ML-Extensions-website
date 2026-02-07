# Deploying ML Extensions Website to Hostinger

## Prerequisites

- Hostinger hosting account with cPanel access
- FTP/SFTP credentials or File Manager access
- Your domain pointed to Hostinger

## Step 1: Prepare Your Files

Your production build is now ready in the `dist` folder. This folder contains:

- `index.html` - Your main HTML file
- `assets/` - Optimized CSS, JavaScript, and other assets
- `.htaccess` - Apache configuration for routing and optimization

## Step 2: Upload to Hostinger

### Option A: Using File Manager (Recommended for beginners)

1. **Log in to hPanel**
   - Go to https://hpanel.hostinger.com
   - Sign in with your credentials

2. **Access File Manager**
   - Go to "Files" → "File Manager"
   - Navigate to `public_html` (or your domain's root directory)

3. **Clear Existing Files** (if any)
   - Delete any existing files in the folder (EXCEPT .htaccess if you have important redirects)
   - Keep the `cgi-bin` folder if it exists

4. **Upload Build Files**
   - Click "Upload" in the top menu
   - Navigate to your local `d:\websites\ML-Extensions-website\dist` folder
   - Select ALL files and folders inside `dist` (not the dist folder itself)
   - Upload them to `public_html`

### Option B: Using FTP/SFTP (Recommended for large files)

1. **Get FTP Credentials**
   - In hPanel, go to "Files" → "FTP Accounts"
   - Use existing account or create new one
   - Note the hostname, username, and password

2. **Connect with FTP Client** (FileZilla recommended)
   - Download FileZilla: https://filezilla-project.org
   - Host: Your FTP hostname (usually ftp.yourdomain.com)
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (or 22 for SFTP)

3. **Upload Files**
   - Navigate to `public_html` in the right panel (remote)
   - Navigate to `d:\websites\ML-Extensions-website\dist` in the left panel (local)
   - Select ALL files inside the dist folder
   - Right-click → Upload
   - Wait for transfer to complete

## Step 3: Verify Your Deployment

1. **Check Your Website**
   - Visit your domain in a browser
   - Test all pages and navigation
   - Verify that React Router works (try refreshing on different pages)

2. **Test Key Features**
   - Click through all menu items
   - Test product pages (ML Kitchens, ML Doors)
   - Verify images load correctly
   - Check Gumroad purchase buttons (if applicable)
   - Test on mobile devices

## Step 4: Configure SSL (HTTPS)

1. **Enable SSL in Hostinger**
   - In hPanel, go to "Security" → "SSL"
   - Install free Let's Encrypt SSL certificate
   - Wait 10-15 minutes for activation

2. **Force HTTPS**
   - The `.htaccess` file already includes HTTPS redirect
   - All HTTP traffic will automatically redirect to HTTPS

## Troubleshooting

### Problem: Blank page or "Cannot GET /" error

**Solution:** Make sure all files from `dist` folder are in the root of `public_html`, not in a subfolder

### Problem: 404 errors on page refresh

**Solution:** Verify the `.htaccess` file is uploaded correctly to `public_html`

### Problem: Images not loading

**Solution:**

- Check that the `assets` folder uploaded completely
- Verify file permissions are set to 644 for files and 755 for folders
- Clear browser cache

### Problem: Website shows old version

**Solution:**

- Clear your browser cache (Ctrl + Shift + Delete)
- Clear Hostinger cache in hPanel → "Website" → "Clear Cache"
- Wait 5-10 minutes for CDN propagation

## Updating Your Website

When you make changes to your website:

1. **Rebuild the project:**

   ```
   npm run build
   ```

2. **Upload new files:**
   - Delete old files from `public_html/assets` folder
   - Upload new files from `dist` folder
   - The new asset files will have different hash names

3. **Clear cache:**
   - Clear browser cache
   - Clear Hostinger cache if available

## Performance Optimization (Already Included)

Your `.htaccess` file includes:
✅ HTTPS redirect
✅ React Router support (all routes redirect to index.html)
✅ Gzip compression
✅ Browser caching for assets (1 year for images, 1 month for CSS/JS)
✅ Security headers

## Support

- **Hostinger Support:** Available 24/7 via live chat in hPanel
- **Documentation:** https://support.hostinger.com
- **Build Issues:** Run `npm run build` and check for errors

## Quick Reference

**Project Structure:**

- Source files: `d:\websites\ML-Extensions-website\src`
- Build output: `d:\websites\ML-Extensions-website\dist`
- Upload destination: `public_html` (Hostinger)

**Important Files:**

- `index.html` - Main entry point
- `.htaccess` - Server configuration
- `assets/` - All optimized resources

**Build Command:**

```powershell
npm run build
```

---

Your website is now ready for production! 🚀
