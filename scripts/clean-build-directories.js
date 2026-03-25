const { rmSync } = require('fs');

const directories = ['dist', '.build'];

for (const directory of directories) {
  rmSync(directory, {
    force: true,
    recursive: true,
  });
}
