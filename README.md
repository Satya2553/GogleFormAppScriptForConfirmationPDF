# GogleFormAppScriptForConfirmationPDF


This repository contains a script that generates a PDF confirmation document based on form submissions from a Google Form. The PDF is then sent to the form submitter via email as an attachment.

## Getting Started

Follow the steps below to set up the script, create the document template, and add triggers:

1. Replace the following placeholders in the script:
   - `FORM_ID` with your Google Form ID.
   - `PDF_TEMPLATE_ID` with the ID of your PDF template file.
   - `EMAIL_FIELD_ID` with the ID of the email field in your form.
   - `SUBJECT` with the subject of the email.

2. Create the PDF template:
   - Open a new Google Docs document.
   - Design the confirmation template with placeholders for form responses, such as `{Question1}`, `{Question2}`, etc.
   - Save the document and note down its document ID.

3. Replace the placeholders in the PDF template with form responses:
   - In the script, locate the section where placeholders are replaced with form responses using `body.replaceText('{' + question + '}', answer)`.
   - Customize this section based on your form's question titles and desired placeholder format.

4. Set up triggers:
   - In the Script Editor, go to "Edit" > "Current project's triggers".
   - Click on the "Add Trigger" button.
   - Choose the following trigger settings:
     - Choose which function to run: `onFormSubmit`.
     - Choose which deployment should run: `Head`.
     - Select event source: `From form`.
     - Select event type: `On form submit`.
     - Save the trigger.

5. Share the Google Form with respondents and start collecting responses.

## Script Explanation

The script performs the following actions:

1. Retrieves the latest form response.
2. Extracts the email address from the response.
3. Generates a PDF copy of the template file.
4. Replaces placeholders in the PDF template with form responses.
5. Converts the PDF to a Blob.
6. Sends an email to the form submitter with the PDF attachment.
7. Deletes the temporary PDF file.

## Additional Notes

- Make sure the form respondent has access to the PDF template file.
- Ensure that the script has the necessary permissions to access your Google Drive and send emails.

Feel free to modify the script as needed for your specific use case.

For more details, refer to the code comments in the script file.

