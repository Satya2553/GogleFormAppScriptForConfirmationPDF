function onFormSubmit(e) {
  try {
    // Replace 'FORM_ID' with your Google Form ID
    var formId = 'FORM_ID';

    // Replace 'PDF_TEMPLATE_ID' with the ID of your PDF template file
    var pdfTemplateId = 'PDF_TEMPLATE_ID';

    // Replace 'EMAIL_FIELD_ID' with the ID of the email field in your form
    var emailFieldId = EMAIL_FIELD_ID;

    // Replace 'SUBJECT' with the subject of the email
    var emailSubject = 'SUBJECT';

    // Get the form response
    var form = FormApp.openById(formId);
    var formResponses = form.getResponses();
    var latestResponse = formResponses[formResponses.length - 1];
    var response = latestResponse.getItemResponses();

    // Get the email address from the form response
    var email = '';
    response.forEach(function (itemResponse) {
      if (itemResponse.getItem().getId() === emailFieldId) {
        email = itemResponse.getResponse();
      }
    });

    // Generate PDF from template
    var pdfFile = DriveApp.getFileById(pdfTemplateId).makeCopy();
    var pdfDoc = DocumentApp.openById(pdfFile.getId());
    var body = pdfDoc.getBody();

    // Replace placeholders in the template with form responses
    response.forEach(function (itemResponse) {
      var question = itemResponse.getItem().getTitle();
      var answer = itemResponse.getResponse();
      body.replaceText('{' + question + '}', answer);
    });

    // Save and close the PDF
    pdfDoc.saveAndClose();

    // Convert the PDF to Blob
    var pdfBlob = pdfFile.getAs('application/pdf');

    // Send email with the PDF attachment
    var emailBody = 'Your form submission is attached.';
    GmailApp.sendEmail(email, emailSubject, emailBody, {
      attachments: [pdfBlob]
    });

    // Delete the temporary PDF file
    pdfFile.setTrashed(true);
  } catch (error) {
    console.log('An error occurred:', error);
  }
}
