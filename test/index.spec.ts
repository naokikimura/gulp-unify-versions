import { expect } from 'chai';
import stream from 'stream';
import plugin from '../src/index';

describe('Plugin', () => {
  it('should return Transform instance', () => {
    expect(plugin()).to.be.an.instanceof(stream.Stream);
  });
});
