/**
 * ============================================================================
 * INTEGRATION CONFIG — Replace placeholder values below
 * ============================================================================
 *
 * 1) EmailJS (https://www.emailjs.com/)
 *    - Create a service, template, and copy your public key.
 *    - Template variables used: patient_name, phone, email, service, date, time, message, to_email
 *
 * 2) Google Sheets via Google Apps Script
 *    Steps to set up:
 *      a. Go to https://script.google.com and create a new project.
 *      b. Paste the following script:
 *
 *         function doPost(e) {
 *           var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *           var data = JSON.parse(e.postData.contents);
 *           sheet.appendRow([
 *             new Date(),
 *             data.name,
 *             data.phone,
 *             data.email,
 *             data.service,
 *             data.date,
 *             data.time
 *           ]);
 *           return ContentService.createTextOutput("Success");
 *         }
 *
 *      c. Click Deploy → New Deployment → Web App.
 *      d. Set "Who has access" to "Anyone".
 *      e. Copy the Web App URL and paste it into GOOGLE_SHEET_WEBHOOK_URL below.
 *
 * Note: These are public/client-side config values (no secret keys here).
 * ============================================================================
 */

export const EMAILJS_SERVICE_ID = "your_service_id";
export const EMAILJS_TEMPLATE_ID = "your_template_id";
export const EMAILJS_PUBLIC_KEY = "your_public_key";
export const HOSPITAL_EMAIL = "info.swamyhospitals@gmail.com";

export const GOOGLE_SHEET_WEBHOOK_URL = "your_google_apps_script_url";

export const HOSPITAL_INFO = {
  name: "Swamy Hospitals",
  tagline: "Your Health, Our Priority",
  address: "Swamy Hospitals, Hosur Rd, Konappana Agrahara, Electronic City, Konappana Agrahara, Karnataka 560100",
  phone: "+91 86601 88867",
  email: HOSPITAL_EMAIL,
  instagram: "@swamyhospitals",
  // Replace with your real Google Maps embed URL
  mapEmbedUrl:
    "https://www.google.com/maps?q=Swamy+Hospitals+Electronic+City+Bangalore&output=embed",
};
