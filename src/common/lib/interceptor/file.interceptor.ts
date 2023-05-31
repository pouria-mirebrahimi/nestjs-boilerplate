import { InternalServerErrorException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { v4 as uuid } from 'uuid';
// utils
import { getStorage } from '../utils/multer/storage';

export const UploadFileInterceptor = (uploadOptions: any) => {
  const {
    prefix,
    fileName,
    fieldName,
    maxCount = 1,
    folderName,
    subfolder, // i.e: user.tutor.id
    mimeTypes = ['image'], // ['text/csv']
    fileSizeMB = 10, // in megabyte
  } = uploadOptions;

  const multiple = fieldName.indexOf(']') !== -1 || maxCount > 1;

  const multerOptions = {
    storage: getStorage((req) => {
      let dir = folderName;

      if (subfolder) {
        let selectedId = { ...req };
        subfolder
          .replace(/\?/g, '')
          .split('.')
          .forEach((key) => {
            if (selectedId[key]) {
              selectedId = selectedId[key];
            }
          });
        if (typeof selectedId === 'object') {
          throw new InternalServerErrorException('subfolder is not valid.');
        }
        dir = folderName + '/' + selectedId;
      }

      return {
        dir: dir,
        fileName: fileName || uuid(),
        prefix: prefix ? prefix + '-' : '',
      };
    }),
    fileFilter: function (req, file, callback) {
      const { mimetype = '' } = file;
      if (
        mimeTypes.includes(mimetype) ||
        mimeTypes.includes(mimetype.split('/')[0]) ||
        mimeTypes.includes(mimetype.split('/')[1])
      ) {
        return callback(null, true);
      }

      const allowedTypes = mimeTypes
        .map(
          (mimeType) => `${mimeType.split('/')[1] || mimeType.split('/')[0]}`,
        )
        .join(', ');
      return callback(
        new BadRequestException(`Only ${allowedTypes} are allowed`),
        false,
      );
    },
    limits: {
      fileSize: fileSizeMB * 1024 * 1024, //in bytes
    },
  };

  if (multiple) {
    return FilesInterceptor(fieldName, maxCount, multerOptions);
  } else {
    return FileInterceptor(fieldName, multerOptions);
  }
};
