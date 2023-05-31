import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

export const getStorage = (...args) => {
  const uploadBaseFolder = './uploads';

  let dir,
    fileName,
    prefix = '',
    suffix = '';

  if (!args.length) {
    return null;
  }

  if (typeof args[0] === 'string' && typeof args[1] === 'string') {
    dir = args[0];
    fileName = args[1];
  }

  return diskStorage({
    destination: (req, file, cb) => {
      try {
        if (typeof args[0] === 'function') {
          const data = args[0](req, file) || {};
          dir = data.dir || dir;
          fileName = data.fileName || fileName;
          prefix = data.prefix || prefix;
          suffix = data.suffix || suffix;
        }

        dir = dir.replace(new RegExp('^(?:./)?' + uploadBaseFolder), '');
        dir = './' + uploadBaseFolder + '/' + dir + '/';
        dir = dir.replace(/\/\//g, '/');

        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        return cb(null, dir);
      } catch (error) {
        return cb(error, null);
      }
    },
    filename: (req, file, cb) => {
      try {
        if (!fileName) {
          throw new Error('file name is required');
        }

        const ext = extname(file.originalname);
        const fullname = `${fileName}`
          .replace(new RegExp(ext + '$'), '')
          .replace(/\//g, '_');
        cb(null, prefix + fullname + suffix + ext);
      } catch (error) {
        return cb(error, null);
      }
    },
  });
};
