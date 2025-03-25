import fs from 'fs-extra';

try {
  fs.ensureDir('test-result');
  fs.emptyDir('test-result');
} catch (error) {
  console.log('Not created any folder called test-result ' + error);
}
