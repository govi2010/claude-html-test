# 📱 Save Contact Integration Guide

Complete guide to add "Save Contact" functionality to your NFC business cards that works on **both iOS and Android**.

## 🎯 Quick Start

### Option 1: Copy-Paste (Easiest)

Add this code to any of your HTML designs:

```html
<!-- Add before closing </body> tag -->
<script>
function saveContactVCard() {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Vanshika Tilwani
N:Tilwani;Vanshika;;;
ORG:Rise N Sky Immigration
TITLE:Managing Director (RCIC)
TEL;TYPE=CELL,VOICE:+16475002641
TEL;TYPE=WORK,VOICE:+16475598840
TEL;TYPE=CELL,VOICE:+917990979334
EMAIL;TYPE=INTERNET:info@risenskyimmigration.com
URL:https://www.risenskyimmigration.com
ADR;TYPE=WORK:;;18-7001 Steeles Avenue West;Toronto;ON;M9W 0A2;Canada
ADR;TYPE=WORK:;;B-304 Stellar, Sindhu Bhavan Road;Ahmedabad;Gujarat;380054;India
NOTE:"Leaders In Migration Solution" - Regulated Canadian Immigration Consultant
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Vanshika_Tilwani_Contact.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('✅ Contact saved! Check your downloads.');
}
</script>
```

Then update your Save Contact button:

```html
<button onclick="saveContactVCard()" style="...">
    <i class="fas fa-download"></i> Save Contact
</button>
```

---

### Option 2: Use External JavaScript File (Recommended)

1. **Include the script** in your HTML `<head>`:

```html
<script src="save-contact.js"></script>
```

2. **Update your button**:

```html
<!-- Method 1: vCard Download (works everywhere) -->
<button onclick="saveContactVCard()">
    <i class="fas fa-download"></i> Save Contact
</button>

<!-- Method 2: Native Share (mobile only) -->
<button onclick="shareContact()">
    <i class="fas fa-share-alt"></i> Share Contact
</button>

<!-- Method 3: QR Code (requires QR library) -->
<button onclick="generateContactQRCode('qrcode')">
    <i class="fas fa-qrcode"></i> Generate QR Code
</button>
<div id="qrcode"></div>
```

---

## 📖 Complete Integration Examples

### Example 1: Update Design 11 (Blinq Inspired)

**Find this line** (around line 94):

```html
<button class="save-contact-btn" style="width: 100%; padding: 16px; ...">
    <i class="fas fa-download" style="margin-right: 8px;"></i>
    Save Contact
</button>
```

**Replace with**:

```html
<button onclick="saveContactVCard()" class="save-contact-btn" style="width: 100%; padding: 16px; ...">
    <i class="fas fa-download" style="margin-right: 8px;"></i>
    Save Contact
</button>
```

**Then add script before `</body>`**:

```html
<script>
function saveContactVCard() {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Vanshika Tilwani
N:Tilwani;Vanshika;;;
ORG:Rise N Sky Immigration
TITLE:Managing Director (RCIC)
TEL;TYPE=CELL,VOICE:+16475002641
TEL;TYPE=WORK,VOICE:+16475598840
TEL;TYPE=CELL,VOICE:+917990979334
EMAIL;TYPE=INTERNET:info@risenskyimmigration.com
URL:https://www.risenskyimmigration.com
ADR;TYPE=WORK:;;18-7001 Steeles Avenue West;Toronto;ON;M9W 0A2;Canada
ADR;TYPE=WORK:;;B-304 Stellar, Sindhu Bhavan Road;Ahmedabad;Gujarat;380054;India
NOTE:"Leaders In Migration Solution" - Regulated Canadian Immigration Consultant
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Vanshika_Tilwani.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
</script>
</body>
</html>
```

---

### Example 2: Add Multiple Save Options

```html
<!-- In your HTML body -->
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
    <button onclick="saveContactVCard()" style="...">
        <i class="fas fa-download"></i> Save
    </button>
    <button onclick="shareContact()" style="...">
        <i class="fas fa-share-alt"></i> Share
    </button>
</div>

<!-- Before closing </body> -->
<script>
// vCard download function
function saveContactVCard() {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Vanshika Tilwani
N:Tilwani;Vanshika;;;
ORG:Rise N Sky Immigration
TITLE:Managing Director (RCIC)
TEL;TYPE=CELL:+16475002641
TEL;TYPE=WORK:+16475598840
TEL;TYPE=CELL:+917990979334
EMAIL:info@risenskyimmigration.com
URL:https://www.risenskyimmigration.com
ADR;TYPE=WORK:;;18-7001 Steeles Avenue West;Toronto;ON;M9W 0A2;Canada
NOTE:Leaders In Migration Solution
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Vanshika_Tilwani.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Native share function (mobile only)
async function shareContact() {
    if (!navigator.share) {
        saveContactVCard(); // Fallback to download
        return;
    }

    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Vanshika Tilwani
N:Tilwani;Vanshika;;;
ORG:Rise N Sky Immigration
TITLE:Managing Director (RCIC)
TEL;TYPE=CELL:+16475002641
TEL;TYPE=WORK:+16475598840
EMAIL:info@risenskyimmigration.com
URL:https://www.risenskyimmigration.com
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' });
    const file = new File([blob], 'Vanshika_Tilwani.vcf', { type: 'text/vcard' });

    try {
        await navigator.share({
            title: 'Vanshika Tilwani - Contact',
            files: [file]
        });
    } catch (error) {
        if (error.name !== 'AbortError') {
            saveContactVCard(); // Fallback
        }
    }
}
</script>
```

---

## 🔧 Customization

### Change Contact Information

Edit the vCard content:

```javascript
const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Your Full Name                          // Full name
N:LastName;FirstName;;;                    // Structured name
ORG:Your Company Name                       // Organization
TITLE:Your Job Title                        // Job title
TEL;TYPE=CELL,VOICE:+1234567890            // Phone 1
TEL;TYPE=WORK,VOICE:+0987654321            // Phone 2
EMAIL;TYPE=INTERNET:your@email.com          // Email
URL:https://yourwebsite.com                 // Website
ADR;TYPE=WORK:;;Street;City;State;Zip;Country  // Address
NOTE:Your additional notes here             // Notes
END:VCARD`;
```

### Change Download Filename

```javascript
link.download = 'Your_Custom_Filename.vcf';
```

### Add Photo to vCard (Advanced)

```javascript
// Add after URL line in vCard:
PHOTO;ENCODING=b;TYPE=JPEG:${base64ImageString}
```

---

## 📱 Platform Testing

### iOS (iPhone/iPad)
- ✅ Safari: vCard download works
- ✅ Chrome: vCard download works
- ✅ Native share works in Safari
- 📝 How to save: Tap .vcf file → "Add to Contacts"

### Android
- ✅ Chrome: vCard download works
- ✅ Firefox: vCard download works
- ✅ Native share works
- 📝 How to save: Tap .vcf file → Choose "Contacts" app

### Desktop
- ✅ Chrome, Firefox, Safari, Edge: All work
- 📝 How to save: Open .vcf file with default contacts app

---

## 🎨 Styling the Button

### Gradient Button

```html
<button onclick="saveContactVCard()" style="
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #F45A57, #F67B79);
    border: none;
    border-radius: 12px;
    color: white;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(244, 90, 87, 0.3);
">
    <i class="fas fa-download" style="margin-right: 8px;"></i>
    Save Contact
</button>
```

### With Active State

```html
<style>
.save-btn {
    transition: all 0.3s ease;
}
.save-btn:active {
    transform: scale(0.98);
    opacity: 0.9;
}
</style>

<button onclick="saveContactVCard()" class="save-btn" style="...">
    Save Contact
</button>
```

---

## 🚀 Advanced Features

### 1. Add QR Code (Requires QRCode.js)

**Include library in `<head>`:**

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
```

**Add HTML:**

```html
<button onclick="showQRCode()">Generate QR Code</button>
<div id="qrcode" style="text-align: center; margin-top: 20px;"></div>
```

**Add JavaScript:**

```javascript
function showQRCode() {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Vanshika Tilwani
TEL:+16475002641
EMAIL:info@risenskyimmigration.com
END:VCARD`;

    document.getElementById('qrcode').innerHTML = '';
    new QRCode(document.getElementById('qrcode'), {
        text: vCard,
        width: 256,
        height: 256
    });
}
```

### 2. Track Downloads (Google Analytics)

```javascript
function saveContactVCard() {
    // ... vCard code ...

    // Track with Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'save_contact', {
            'event_category': 'engagement',
            'event_label': 'vcard_download'
        });
    }
}
```

### 3. Show Success Toast Notification

```javascript
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function saveContactVCard() {
    // ... vCard code ...
    showToast('✅ Contact saved successfully!');
}
```

---

## ❓ Troubleshooting

### Issue: Button doesn't work

**Solution:** Check browser console for errors. Make sure the onclick function is defined.

### Issue: File downloads but doesn't open

**Solution:** This is normal. Users need to manually open the .vcf file from downloads.

### Issue: Share not working on mobile

**Solution:** Web Share API only works on HTTPS. Test on a live server, not file://.

### Issue: QR Code not generating

**Solution:** Make sure QRCode.js library is included before your script.

---

## 📄 Files Included

1. **`save-contact-example.html`** - Complete working example with all 3 methods
2. **`save-contact.js`** - Reusable JavaScript library
3. **`SAVE-CONTACT-INTEGRATION-GUIDE.md`** - This guide

---

## 🎯 Best Practices

1. ✅ Always provide fallback (vCard download) if share fails
2. ✅ Test on both iOS and Android before deploying
3. ✅ Use HTTPS for native share to work
4. ✅ Keep vCard data up to date
5. ✅ Provide clear instructions to users
6. ✅ Use Font Awesome icons for better UX

---

## 📞 Need Help?

- Check `save-contact-example.html` for working demo
- All code is tested on iOS Safari and Android Chrome
- vCard format is compatible with all contact apps

**Happy coding! 🚀**
