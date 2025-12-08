/**
 * Save Contact to Phone - Works on iOS and Android
 *
 * This script provides multiple methods to save contact information:
 * 1. vCard Download - Works on all devices
 * 2. Native Share API - Works on mobile browsers
 * 3. QR Code - Works with camera scanning
 *
 * Usage:
 * <button onclick="saveContactVCard()">Save Contact</button>
 * <button onclick="shareContact()">Share Contact</button>
 */

// ===========================================
// Contact Data - UPDATE THIS WITH YOUR INFO
// ===========================================
const CONTACT_DATA = {
    firstName: 'Vanshika',
    lastName: 'Tilwani',
    fullName: 'Vanshika Tilwani',
    organization: 'Rise N Sky Immigration',
    title: 'Managing Director (RCIC)',

    // Phone numbers
    phones: [
        { type: 'CELL', number: '+16475002641', label: 'WhatsApp' },
        { type: 'WORK', number: '+16475598840', label: 'Work' },
        { type: 'CELL', number: '+917990979334', label: 'India WhatsApp' }
    ],

    // Email
    email: 'info@risenskyimmigration.com',

    // Website
    website: 'https://www.risenskyimmigration.com',

    // Addresses
    addresses: [
        {
            type: 'WORK',
            street: '18-7001 Steeles Avenue West',
            city: 'Toronto',
            state: 'ON',
            zip: 'M9W 0A2',
            country: 'Canada',
            label: 'Canada Head Office'
        },
        {
            type: 'WORK',
            street: 'B-304 Stellar, Sindhu Bhavan Road',
            city: 'Ahmedabad',
            state: 'Gujarat',
            zip: '380054',
            country: 'India',
            label: 'India Branch Office'
        }
    ],

    // Note
    note: '"Leaders In Migration Solution" - Regulated Canadian Immigration Consultant, Commissioner Of Oaths Ontario',

    // Photo URL (optional)
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',

    // Social media (optional)
    social: {
        youtube: 'https://youtube.com/@risenskyimmigration',
        linkedin: 'https://linkedin.com/company/risenskyimmigration',
        facebook: 'https://facebook.com/risenskyimmigration',
        instagram: 'https://instagram.com/risenskyimmigration'
    }
};

// ===========================================
// Generate vCard String
// ===========================================
function generateVCard() {
    let vcard = 'BEGIN:VCARD\n';
    vcard += 'VERSION:3.0\n';

    // Name
    vcard += `FN:${CONTACT_DATA.fullName}\n`;
    vcard += `N:${CONTACT_DATA.lastName};${CONTACT_DATA.firstName};;;\n`;

    // Organization and Title
    if (CONTACT_DATA.organization) {
        vcard += `ORG:${CONTACT_DATA.organization}\n`;
    }
    if (CONTACT_DATA.title) {
        vcard += `TITLE:${CONTACT_DATA.title}\n`;
    }

    // Phone numbers
    CONTACT_DATA.phones.forEach(phone => {
        vcard += `TEL;TYPE=${phone.type},VOICE:${phone.number}\n`;
    });

    // Email
    if (CONTACT_DATA.email) {
        vcard += `EMAIL;TYPE=INTERNET:${CONTACT_DATA.email}\n`;
    }

    // Website
    if (CONTACT_DATA.website) {
        vcard += `URL:${CONTACT_DATA.website}\n`;
    }

    // Addresses
    CONTACT_DATA.addresses.forEach(addr => {
        vcard += `ADR;TYPE=${addr.type}:;;${addr.street};${addr.city};${addr.state};${addr.zip};${addr.country}\n`;
    });

    // Note
    if (CONTACT_DATA.note) {
        vcard += `NOTE:${CONTACT_DATA.note}\n`;
    }

    // Social media in notes (optional)
    if (CONTACT_DATA.social) {
        let socialNote = 'Social Media:\\n';
        if (CONTACT_DATA.social.youtube) socialNote += `YouTube: ${CONTACT_DATA.social.youtube}\\n`;
        if (CONTACT_DATA.social.linkedin) socialNote += `LinkedIn: ${CONTACT_DATA.social.linkedin}\\n`;
        if (CONTACT_DATA.social.facebook) socialNote += `Facebook: ${CONTACT_DATA.social.facebook}\\n`;
        if (CONTACT_DATA.social.instagram) socialNote += `Instagram: ${CONTACT_DATA.social.instagram}\\n`;
        vcard += `NOTE:${socialNote}\n`;
    }

    // Photo (optional - base64 encoded)
    // Note: For better compatibility, we skip photo in vCard
    // Users can add it manually after saving the contact

    vcard += 'END:VCARD';

    return vcard;
}

// ===========================================
// METHOD 1: Download vCard File
// Works on: iOS, Android, Desktop (ALL devices)
// ===========================================
function saveContactVCard() {
    try {
        // Generate vCard
        const vCardContent = generateVCard();

        // Create blob
        const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${CONTACT_DATA.firstName}_${CONTACT_DATA.lastName}_Contact.vcf`;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        setTimeout(() => URL.revokeObjectURL(url), 100);

        // Show success message
        showMessage('✅ Contact downloaded! Open the .vcf file to add to your contacts.', 'success');

        return true;
    } catch (error) {
        console.error('Save contact failed:', error);
        showMessage('❌ Failed to save contact. Please try again.', 'error');
        return false;
    }
}

// ===========================================
// METHOD 2: Native Share API
// Works on: iOS Safari, Android Chrome, Mobile browsers
// ===========================================
async function shareContact() {
    // Check if Web Share API is supported
    if (!navigator.share) {
        showMessage('❌ Share not supported on this browser. Use "Save Contact" instead.', 'error');
        return false;
    }

    try {
        // Generate vCard
        const vCardContent = generateVCard();

        // Create blob and file
        const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
        const fileName = `${CONTACT_DATA.firstName}_${CONTACT_DATA.lastName}.vcf`;
        const file = new File([blob], fileName, { type: 'text/vcard' });

        // Check if files can be shared
        if (navigator.canShare && !navigator.canShare({ files: [file] })) {
            // Fallback to download
            console.log('File sharing not supported, falling back to download');
            return saveContactVCard();
        }

        // Use Web Share API
        await navigator.share({
            title: `${CONTACT_DATA.fullName} - Contact`,
            text: `Save contact for ${CONTACT_DATA.fullName}, ${CONTACT_DATA.title} at ${CONTACT_DATA.organization}`,
            files: [file]
        });

        showMessage('✅ Contact shared successfully!', 'success');
        return true;

    } catch (error) {
        if (error.name === 'AbortError') {
            // User cancelled, don't show error
            console.log('Share cancelled by user');
        } else {
            console.error('Share failed:', error);
            showMessage('❌ Share failed. Use "Save Contact" instead.', 'error');
        }
        return false;
    }
}

// ===========================================
// METHOD 3: Generate QR Code
// Requires: qrcode.js library
// Usage: Include <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
// ===========================================
function generateContactQRCode(elementId = 'qrcode') {
    try {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with id "${elementId}" not found`);
            return false;
        }

        // Clear previous QR code
        element.innerHTML = '';

        // Check if QRCode library is loaded
        if (typeof QRCode === 'undefined') {
            console.error('QRCode library not loaded. Include: https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js');
            showMessage('❌ QR Code library not loaded', 'error');
            return false;
        }

        // Generate vCard content
        const vCardContent = generateVCard();

        // Generate QR code
        new QRCode(element, {
            text: vCardContent,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });

        showMessage('✅ QR Code generated! Scan to save contact.', 'success');
        return true;

    } catch (error) {
        console.error('QR Code generation failed:', error);
        showMessage('❌ Failed to generate QR Code', 'error');
        return false;
    }
}

// ===========================================
// Helper: Show Message
// ===========================================
function showMessage(message, type = 'info') {
    // Check if alert should be used or custom notification
    if (typeof window.showNotification === 'function') {
        // Use custom notification if available
        window.showNotification(message, type);
    } else {
        // Fallback to alert
        alert(message);
    }

    // Also log to console
    console.log(message);
}

// ===========================================
// BONUS: Add Event to Calendar
// ===========================================
function addConsultationToCalendar(appointmentDate, appointmentTime) {
    try {
        // Parse date and time
        const startDate = new Date(appointmentDate + ' ' + appointmentTime);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later

        // Format dates for iCal
        const formatDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        // Create iCal content
        const icalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Rise N Sky Immigration//Contact//EN
BEGIN:VEVENT
UID:${Date.now()}@risenskyimmigration.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:Consultation with ${CONTACT_DATA.fullName}
DESCRIPTION:Immigration consultation at ${CONTACT_DATA.organization}\\n\\nContact: ${CONTACT_DATA.email}\\nPhone: ${CONTACT_DATA.phones[0].number}
LOCATION:${CONTACT_DATA.addresses[0].street}, ${CONTACT_DATA.addresses[0].city}, ${CONTACT_DATA.addresses[0].state} ${CONTACT_DATA.addresses[0].zip}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

        // Create and download iCal file
        const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'consultation_appointment.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showMessage('✅ Appointment added to calendar!', 'success');
        return true;

    } catch (error) {
        console.error('Add to calendar failed:', error);
        showMessage('❌ Failed to add to calendar', 'error');
        return false;
    }
}

// ===========================================
// Export for use in modules (optional)
// ===========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        saveContactVCard,
        shareContact,
        generateContactQRCode,
        addConsultationToCalendar,
        CONTACT_DATA
    };
}
