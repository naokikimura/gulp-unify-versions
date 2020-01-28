import fs  from 'fs';
import stream from 'stream';
import Vinyl from 'vinyl';

export = function unifyVersions(referenceFile = './package.json', key = 'version'): stream.Transform {
  const encoding = 'utf8';
  const reference: string = JSON.parse(fs.readFileSync(referenceFile).toString(encoding)).version;
  return new stream.Transform({
    objectMode: true,
    transform(file, _, callback): void {
      if (!(Vinyl.isVinyl(file) && file.isBuffer() || file.isStream())) return callback(null, file);
      const chunks: Buffer[] = [];
      const readable: stream.Readable = file.isBuffer() ? stream.Readable.from([file.contents]) : file.contents;
      readable
        .on('data', (chunk: Buffer) => chunks.push(chunk))
        .on('end', () => {
          try {
            const contents = Buffer.concat(chunks).toString(encoding);
            const version = JSON.parse(contents).version || '';
            const regex = new RegExp(`("${key}"\\s*:\\s*")(${version.replace(/\./g, '\\.')})(")`);
            callback(null, new Vinyl({
              contents: Buffer.from(contents.replace(regex, `$1${reference}$3`), encoding),
              history: file.history,
            }));
          } catch (error) {
            callback(error);
          }
        })
        .on('error', callback);
    }
  });
}
