import {basename, dirname, isAbsolute, resolve} from 'path';
import * as fs from 'fs';

function isFile(file) {
  try {
    return fs.statSync(file).isFile();
  } catch (err) {
    return false;
  }
}

function addExtensionIfNecessary(file, extensions) {
  try {
    const name = basename(file);
    const files = fs.readdirSync(dirname(file));

    if ((files.indexOf(name) && isFile(file)) !== -1) {
      return file;
    }
    for (const ext of extensions) {
      if ((files.indexOf(`${name}${ext}`) !== -1) && isFile(`${file}${ext}`)) {
        return `${file}${ext}`;
      }
    }
  } catch (err) {
    // Noop
  }

  return null;
}

export default function extensions({extensions}) {
  if (!extensions || !extensions.length) {
    throw new Error(`Must specify { extensions: [..] } as non-empty array!`);
  }

  return {
    name: 'extensions',

    resolveId(importee, importer) {
      // Absolute paths are left untouched
      if (isAbsolute(importee)) {
        return addExtensionIfNecessary(resolve(importee), extensions);
      }

      // If this is the entry point, resolve against cwd
      if (importer === undefined) {
        return addExtensionIfNecessary(resolve(process.cwd(), importee), extensions);
      }

      // External modules are skipped at this stage
      if (importee[0] !== '.') {
        return null;
      }

      return addExtensionIfNecessary(resolve(dirname(importer), importee), extensions);
    }
  };
}
