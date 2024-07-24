'use server';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { cwd } from 'process';

async function saveFile(file: File,dir:string) {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const normalizeName = `${Date.now()}-${file.name.split(' ').join('-')}`;

    const uploadDir = join(cwd(), 'public', 'uploads', dir);
    const filePath = join(uploadDir, normalizeName);

    await fs.mkdir(uploadDir, { recursive: true });

    await fs.writeFile(filePath, buffer);

    const imageUrl = `/uploads/${dir}/${normalizeName}`;
    return {url:imageUrl,dir:dir,fileName:normalizeName};
  } catch (error) {
    console.error('Error saving file:', error);
    throw new Error('File upload failed');
  }
}

export default saveFile;
