export const uploadStepsModel = {
  uploadStatus: [
    {
      title: 'Upload',
      slug: 'upload',
      //slug:'/',
      component: 'ContainerBrainMapUpload',
      isCompleted: false,
      isInProgress: true,
      id: 0
    },
    {
      title: 'Meta data',
      slug: 'meta-data',
      component: 'ContainerBrainMapMetaData',
      isCompleted: false,
      isInProgress: false,
      id: 1
    },
    {
      title: 'Classify',
      slug: 'classify',
      component: 'ContainerBrainMapClassification',
      isCompleted: false,
      isInProgress: false,
      id: 2
    },
    {
      title: 'Tool',
      slug: 'tool',
      component: 'ContainerBrainMapUploadTool',
      isCompleted: false,
      isInProgress: false,
      id: 3
    }
  ],
  classifyFiles: [],
  uploadId: null
}

export const uploadIdModel = {
  GBM: null,
  age: null,
  anonymizedNiftiFileURL: null,
  brainMapClassification: null,
  brainMapNotes: null,
  folderId: 1,
  folderName: 'test_folder',
  glioma: null,
  isResearch: 0,
  mriDate: null,
  niftiMetadata: null,
  patientAmount: null,
  sharedBrainMap: null,
  surgicalComplexity: null,
  uploadId: '0538ab9e-7c75-4ffd-b1b2-10a6c5f82598'
}

export const classifyWaiting = {
  anonymizedNiftiFileURL: 'null',
  autoSegmentation: 'null',
  niftiMetadata: 'null',
  processState: 'dicom-upload',
  uploadId: '0538ab9e-7c75-4ffd-b1b2-10a6c5f82598'
}

export const classifyResponse = {
  anonymizedNiftiFileURL: '/mock-data/82d4850b-6215-42a2-addc-b16cdb3e94d1.zip',
  niftiMetadata: [
    {
      fileId: 1,
      fileName: 'OPT_AX_T2_FSE_inter_.nii',
      fileSize: 43008.34,
      niftiFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/OPT_AX_T2_FSE_inter_.nii',
      sliceFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/slices/OPT_AX_T2_FSE_inter_.jpg'
    },
    {
      fileId: 2,
      fileName: '3-pl_T2_FGRE_S_.nii',
      fileSize: 640.34,
      niftiFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/3-pl_T2_FGRE_S_.nii',
      sliceFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/slices/3-pl_T2_FGRE_S_.jpg'
    },
    {
      fileId: 3,
      fileName: '3-pl_T2_FGRE_S_a.nii',
      fileSize: 640.34,
      niftiFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/3-pl_T2_FGRE_S_a.nii',
      sliceFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/slices/3-pl_T2_FGRE_S_a.jpg'
    },
    {
      fileId: 4,
      fileName: '3-pl_T2_FGRE_S_b.nii',
      fileSize: 640.34,
      niftiFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/3-pl_T2_FGRE_S_b.nii',
      sliceFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/slices/3-pl_T2_FGRE_S_b.jpg'
    },
    {
      fileId: 5,
      fileName: 'AX_3D_SPGR_+C_.nii',
      fileSize: 108544.34,
      niftiFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/AX_3D_SPGR_+C_.nii',
      sliceFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/slices/AX_3D_SPGR_+C_.jpg'
    },
    {
      fileId: 6,
      fileName: 'AX_3D_SPGR_.nii',
      fileSize: 108544.34,
      niftiFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/AX_3D_SPGR_.nii',
      sliceFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/slices/AX_3D_SPGR_.jpg'
    },
    {
      fileId: 7,
      fileName: 'AX_T1_.nii',
      fileSize: 11776.34,
      niftiFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/AX_T1_.nii',
      sliceFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/slices/AX_T1_.jpg'
    },
    {
      fileId: 8,
      fileName: 'Ax_Flair_irFSE_H_.nii',
      fileSize: 16384.34,
      niftiFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/Ax_Flair_irFSE_H_.nii',
      sliceFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/slices/Ax_Flair_irFSE_H_.jpg'
    },
    {
      fileId: 9,
      fileName: 'COR_GRE_T2_.nii',
      fileSize: 12800.34,
      niftiFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/COR_GRE_T2_.nii',
      sliceFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/slices/COR_GRE_T2_.jpg'
    },
    {
      fileId: 10,
      fileName: 'COR_GRE_T2__e2.nii',
      fileSize: 12800.34,
      niftiFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/COR_GRE_T2__e2.nii',
      sliceFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/slices/COR_GRE_T2__e2.jpg'
    },
    {
      fileId: 11,
      fileName: 'COR_T1+C_.nii',
      fileSize: 11776.34,
      niftiFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/COR_T1+C_.nii',
      sliceFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/slices/COR_T1+C_.jpg'
    },
    {
      fileId: 12,
      fileName: 'DWI_ASSET_.nii',
      fileSize: 8192.34,
      niftiFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/DWI_ASSET_.nii',
      sliceFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/slices/DWI_ASSET_.jpg'
    },
    {
      fileId: 13,
      fileName: 'Prop_T2_TRF_.nii',
      fileSize: 11776.34,
      niftiFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/Prop_T2_TRF_.nii',
      sliceFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/slices/Prop_T2_TRF_.jpg'
    },
    {
      fileId: 14,
      fileName: 'SAG_T1+C_.nii',
      fileSize: 11776.34,
      niftiFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/SAG_T1+C_.nii',
      sliceFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/slices/SAG_T1+C_.jpg'
    },
    {
      fileId: 15,
      fileName: 'SAG_T1_.nii',
      fileSize: 11776.34,
      niftiFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/SAG_T1_.nii',
      sliceFileURL: '/mock-data/96c4daf2-1c37-4e60-9ea9-fd727292aa81/slices/SAG_T1_.jpg'
    }
  ],
  autoSegmentation: 'null',
  uploadId: '0538ab9e-7c75-4ffd-b1b2-10a6c5f82598',
  processState: 'dicom-uploaded'
}

export const classifySend = {
  uploadId: '0538ab9e-7c75-4ffd-b1b2-10a6c5f82598',
  anonymizedNiftiFileURL: 'https://tool.pictureproject.nl/storage/nifti/h38vjwd7db9y02.zip',
  niftiMetadata: [
    {
      fileId: 3,
      fileName: 'AX_3D_SPGR_+C_.nii.gz',
      fileSize: '14.3',
      niftiFileURL: 'https://tool.pictureproject.nl/storage/nifti/h38vjwd7db9y02/AX_3D_SPGR_+C_.nii.gz',
      sliceFileURL: 'https://tool.pictureproject.nl/storage/nifti/h38vjwd7db9y02/AX_3D_SPGR_+C_.nii.jpg'
    }
  ]
}
