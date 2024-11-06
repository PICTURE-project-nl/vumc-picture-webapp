
import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'

export const staticContent = deepFreeze({
  topNavigation: {
    welcomeMessage: 'Hi',
    aboutPicture: 'About PICTURE',
    logOut: 'Log out'
  },

  mobileNavigation: {
    coordinates: 'Coordinates',
    layers: 'Layers',
    filter: 'Filters & Masks',
    info: 'Info'
  },

  formValidation: {
    generic: 'This field is not filled in correctly',
    required: 'Please fill in this field',
    email: 'This is not a valid email address',
    minLength: 'This field must have at least {amount} characters',
    maxLength: 'This field must not have more than {amount} characters',
    sameAsPassword: 'Passwords are not the same',
    isChecked: 'This checkbox needs to be checked',
    allFields: 'Please ensure all required information is filled in correctly.'
  },

  formState: {
    loading: 'The system is thinking for you. Please wait a moment.'
  },

  formErrors: {
    default: 'Something went wrong, please try again',
    login: 'This email and password combination is not valid'
  },

  introBlock: {
    title: 'PICTURE Tool',
    intro: 'Compare with >1400 glioma patients treated in the past.',
    body: `
      <p>This tool allows you to compare your current patient to similar patients treated in the past.</p>
      <ul>
        <li>Upload dicom or nifti files</li>
        <li>Work with anonymized MRI files</li>
        <li>Compute tumor characteristics</li>
        <li>Download quantitative report</li>
        <li>Predict extend of resection</li>
        <li>Personalized Resection Probability Maps</li>
      </ul>
    `,
    buttonCtaText: 'More practical info about PICTURE'
  },

  loginForm: {
    title: 'Log in to PICTURE',
    intro: `Login to the PICTURE tool to upload and access your data.`,
    successMessage: 'Succesfully logged in, taking you to the brain maps...'
  },

  signUpForm: {
    title: 'Sign up for PICTURE',
    intro: ` Get the most out of the PICTURE tool by signing up.`,
    successMessage: 'There’s a confirmation email on it’s way to your mailbox. Please check this email.'
  },

  forgotPasswordForm: {
    title: 'Reset password',
    intro: `
    Forgot your password?  No problem! <br> Enter your email address below and we'll send you a link to reset your password.
    <br> If you don't receive an email within a few minutes, please check your spam folder.
    <br> If you're still having trouble, please contact our support team here: <a href = "https://pictureproject.nl/contact/"> Contact us </a>
       `
  },

  resetPasswordForm: {
    title: 'Reset Password',
    intro: `To reset your password, please follow the instructions sent to your email. Click the link provided to set a new password.<br/>
            If you did not receive an email, check your spam folder or try again.</a>.`,
    tokenFailed: 'This reset token is not valid, please try again.',
    successMessage: 'Your password has been reset. You can now log in.'
  },

  editUserForm: {
    title: 'Account info'
  },

  changePasswordForm: {
    title: 'Change password'
  },

  uploadProcess: {
    classificationConform: 'Choose this file'
  },

  fileTile: {
    complexity: 'Complexity:',
    edit: 'Edit',
    info: 'Info',
    view: 'View'
  },

  brainMapManager: {
    title: 'Brain Map Manager',
    myBrainMaps: 'My Brainmaps',
    existingBrainmaps: 'Existing Brainmaps',
    selectFolder: 'Please select a folder',
    upload: 'Upload new MRI file'
  },

  fileStates: {
    processing: 'Processing High-Resolution NIFTI file at the moment',
    isReady: 'High-Resolution NIFTI file is ready',
    approve: 'Approve',
    notAvailable: 'There’s no High-Resolution NIFTI file available at the moment',
    existingBrainmaps: 'Existing Brainmaps'
  },

  brainMapMRIInfo: {
    title: 'MRI file upload title',
    upload: 'Upload date',
    complexity: 'Surgeon complexity',
    glioma: 'Glioma',
    classification: 'Classification',
    notAvailable: 'There’s no High-Resolution NIFTI file available at the moment',
    saveChanges: 'Save changes',
    deleteFile: 'Delete files'
  },

  brainMapControls: {
    reset: 'reset',
    adjustCoordinates: 'Adjust coordinates',
    axi: 'Axial',
    cor: 'Coronal',
    sag: 'Sagittal',
    filters: 'Filters',
    threshold: 'Threshold',
    adjustThreshold:'Adjust Threshold',
    masking: 'Toggle overlay',
    noMasking: 'no mask',
    line: 'line',
    inverted: 'inverted',
    layers: 'Layers',
    probabilityMap: 'Resection probability map',
    shapeMap: 'shape',
    patientAmount: 'Tumor incidence map',
    brainDefault: 'Atlas space',
    colorOverlay: 'Color overlay',
    probability: 'probability',
    shape: 'shape'
  },

  brainMapViewer: {
    lowRes: 'low res',
    highRes: 'high res'
  },

  errorPage: {
    title: '404 - Not found',
    body: 'Oops, you don\'t have access access to this page or this page doesn\'t exist.',
    button: 'Take me back to civilization'
  },

  uploadAnonymize: {
    title: 'We found some meta data on the files!',
    info: 'We have to delete this data before we continue. So please accept the policies and let us delete the meta data.'
  },

  upload: {
    title: 'Start to upload your Dicom files',
    body: 'Please upload your dicom or nifti files, so we can anonymize, segment and register, before using the tool. This process will take about 5 minutes. ',
    button: 'Upload DICOMS',
    policyHeader: 'GDPR & Privacy policies',
    policyDescription: 'We have to delete this data before we continue. So please accept the policies and let us delete the meta data.',
    policyContent: `
      <h1>Data Upload Policy</h1>

      <p> This Data Upload Policy was last updated on 11 May 2023 and applies to all user uploaded data. </p>
      <br>
      <p>
          This Data Upload Policy governs the types of data that you are permitted to upload when
          using our platform. We prioritize the privacy and security of our users and strive to maintain
          a safe and compliant environment. Please read this policy carefully to understand the
          restrictions on data upload.

      </p>
      <br>

      <p> 1. Data Ownership and Authorization
          You either own the rights to the medical data you upload or have obtained all necessary
          authorizations and consents from the relevant individuals or entities to upload and store their
          anonymized medical data on our platform.</p> <br>

      <p> 2. You are strictly prohibited from uploading non-anonymized DICOM files. Uploaded
          DICOM files should exclude patient identifying data.
          Patient identifying data: Any data that can be used to identify an individual, including names,
          addresses, social security numbers, birth dates, financial information, or any other sensitive
          personal data.</p> <br>

      <p> 3. You are strictly prohibited from uploading illegal content.
          Illegal content: Any data that is illegal, infringing, or violates the rights of others, including
          copyrighted materials, offensive or discriminatory content, or any content that promotes
          illegal activities.</p> <br>

      <p>4. Compliance with Laws and Regulations
          You are responsible for ensuring that any data you upload complies with all applicable laws,
          regulations, and industry standards. This includes but is not limited to data protection laws,
          privacy regulations, and any contractual obligations or agreements that you may have with
          third parties.</p> <br>
      <p>5. Data Security and Confidentiality
          We take appropriate measures to ensure the security and confidentiality of the data
          uploaded to our platform. However, please note that no method of data transmission or
          storage is 100% secure. While we strive to acceptable means to protect your data, we
          cannot guarantee absolute security. By uploading data to our platform, you acknowledge
          and accept this inherent risk.</p> <br>

      <p> 6. Tool purpose and responsibility
        This tool is designed to provide general information, guidance, assistance and research
        purposes. It is not intended to replace professional medical advice, diagnosis or treatment.
        We are not responsible for any clinical decisions based on results presented in this tool.</p><br>

      <p> 7. Data Retention and Deletion
        We will retain data uploaded to our platform for as long as necessary to fulfill the purposes
        for which it was uploaded and to comply with legal obligations. Upon your request or as
        required by law, we will delete data in our possession, subject to any applicable legal
        restrictions. </p>
        <br>
      <p> 8. Compliance Monitoring and Actions
        We reserve the right to monitor and review uploaded data for compliance with this policy. If
        we become aware of any uploaded data that violates this policy or any applicable laws, we
        may take appropriate actions, including but not limited to:  </p>
        <br>
          <ul>
            <li> Removing the offending data from our platform.
            <li> Suspending or terminating your access to our services.
            <li> Reporting the violation to the relevant authorities, if required by law.
            <li> Cooperating with any investigations or legal proceedings related to the violation.
            <li> User Responsibility and Liability
            <li> You are solely responsible for the data you upload and the consequences of
                uploading prohibited data. You agree to indemnify and hold us harmless from any
                claims, damages, or liabilities arising out of or related to the data you upload,
                including any violations of this policy or applicable laws.
            </ul>
        </p>
        <br>
      <p> 9. Changes to this Data Upload Policy
      We reserve the right to modify or update this Data Upload Policy from time to time. We will
notify you of any material changes by posting the revised policy on our website or through
other communication channels. Your continued use of our services after any such
modifications constitute your acceptance of the updated policy. </p>
<br>
<p> 10. Contact Us
If you have any questions, concerns, or need further clarification regarding this Data Upload
Policy, please contact us at info@pictureproject.nl</p>
<br>
<p>By using our services, you acknowledge that you have read and understood this Data
Upload Policy and agree to comply with its provisions.</p>

    `,
    inputLabel: 'I\'ve read the policies & accept them',
    successMessage: 'Successfully uploaded file.',
    successMessageClassify: 'Successfully send classifications.'
  },
  uploadMetaData: {
    title: 'Please add some information about the nifti file and some notes.'
  },
  brainMapClassificationBlock: {
    title: 'For accurate processing, please ensure all four series (T1c, T1w, T2w, FLAIR) are uploaded. Can you please select the correct series below?',
    body: ''
  },
  brainMapInfo: {
    info: 'Info',
    expectedResectabilityIndex: 'Expected resectability index:',
    expectedResidualVolume: 'Expected residual volume:',
    description: 'These results are based on a cohort of (...) low grade glioma cases treated by teams from Montpeiller and Amsterdam, aggregated onto one another (pubmedID ......).',
    successMessage: 'Successfully updated info.'
  },
  brainMapDownload: {
    title: 'Download files'
  },
  brainMapShare: {
    title: 'Share NIFTI',
    copyTitle: 'Copy link',
    copyBody: 'Copy the link below to share NIFTI.',
    emailTitle: 'Email link',
    emailBody: 'Send email to a specific address.',
    sendButton: 'Send email'
  },
  uploadSegmentize: {
    stepOneTitle: '1. Download anonymized files',
    stepOneBody: 'To continue the process you have to segmentize your files in a brainviewer. Follow the next stept.',
    stepTwoTitle: '2. Segmentize files',
    stepTwoBody: 'Use a tool like ITK Snap or Brainlab to segmentize the tumor in MRI file.',
    stepThreeTitle: '3. Download anonymized files',
    stepThreeBody: 'To continue the process you have to segmentize your files in a brainviewer. Follow the next stept.',
    download: 'Download files',
    upload: 'Upload files'
  },
  uploadRegistrate: {
    title: 'We’ve detected a classification on the NIFTI file. Can you please confirm if this the right classification?',
    decline: 'Decline if you doubt the quality of the NIFTI or of you have other questions. You can contact us in the next step.',
    accept: 'By approving the file you will proceed in the process to the brain viewer, where you can adjust the NIFTI.'
  },
  downloadBlock: {
    downloadDocTitle: 'Download Documentation',
    downloadDocBody: 'All NIFTI\'s Full documentation',
    downloadNiftiTitle: 'Download NIFTI\'s',
    downloadNiftiBody: 'All NIFTI\'s Full documentation',
    downloadZipButtonText: 'Download zip',
    downloadPdfButtonText: 'Download PDF'
  },
  uploadActions: {
    abort: 'Abort & delete files',
    next: 'Go to next step'
  },
  uploadConfirmation: {
    titleHeading: 'Ho, Stop!',
    title: 'If you leave the process, all the data will be lost and you have to start all over again.',
    body: 'Do you still want to leave?'
  },
  uploadTool: {
    title: 'All done',
    content: 'We are running the segmentation process this can take a long time. We wil notify you with an email when it is ready.',
    cta: 'Go to Brainmap overview'
  },

  gsiRads:{
    title: 'Tumor Charecteristics(GSI-RADS)',
    noData:'No data available. Please upload a file.',
    tumorNotFound:'No tumor is found'

  }

})
